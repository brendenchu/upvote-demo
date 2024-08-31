import { useState } from 'react'
import Upvote from './Upvote'
import UpvoteButton from './UpvoteButton'
import styles from './UpvoteList.module.css'

export default function UpvoteList() {
  const [numUpvotes, setNumUpvotes] = useState<number>(0)
  const [selected, setSelected] = useState<number>(0)

  const toggleSelection = (i: number) => () => {
    setSelected(i)
  }

  const addUpvote = () => {
    setNumUpvotes(numUpvotes + 1)
    setSelected(numUpvotes)
  }

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
