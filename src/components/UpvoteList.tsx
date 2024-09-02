import { useContext, useEffect, useState } from 'react'
import Upvote from './Upvote'
import UpvoteButton from './UpvoteButton'
import { UpvoteContext } from '../App'
import styles from './UpvoteList.module.css'
import { UpvoteContextType } from '../types/upvote'

export default function UpvoteList({ listId }: { listId: number }) {
  // use UpvoteContext
  const { upvotes, saveToLocalStorage } = useContext(
    UpvoteContext
  ) as UpvoteContextType

  // current number of upvotes and selected upvote
  const [numUpvotes, setNumUpvotes] = useState<number>(0)
  const [selected, setSelected] = useState<number>(0)

  // toggle selection
  const toggleSelection = (i: number) => () => {
    setSelected(i)
  }

  // add upvote
  const addUpvote = () => {
    const newCount = numUpvotes + 1
    setNumUpvotes(newCount)
    setSelected(numUpvotes)
    saveToLocalStorage(upvotes, listId, newCount)
  }

  // refresh upvotes
  const refresh = (value: number) => {
    setNumUpvotes(value || 0)
    setSelected(value - 1 || 0)
  }

  // update upvotes
  useEffect(() => {
    if (upvotes[listId] !== undefined) {
      refresh(upvotes[listId]!)
    }
  }, [upvotes, listId])

  return (
    <>
      <ul className={styles.list}>
        {[...Array(numUpvotes)].map((_, i) => (
          <li key={i}>
            <Upvote selected={selected === i} handler={toggleSelection(i)} />
          </li>
        ))}
      </ul>
      <div className={styles.button}>
        <UpvoteButton handler={addUpvote} />
      </div>
    </>
  )
}
