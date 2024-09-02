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
    saveToLocalStorage(upvotes, listId, numUpvotes, i)
  }

  // add upvote
  const addUpvote = () => {
    const newCount = numUpvotes + 1
    setNumUpvotes(newCount)
    setSelected(numUpvotes)
    saveToLocalStorage(upvotes, listId, newCount, numUpvotes)
  }

  // refresh upvotes
  const refresh = (count: number, selected: number) => {
    setNumUpvotes(count || 0)
    setSelected(selected || 0)
  }

  // update upvotes
  useEffect(() => {
    if (upvotes[listId] !== undefined) {
      refresh(upvotes[listId]!.count, upvotes[listId]!.selected)
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
