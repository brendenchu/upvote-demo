import './App.css'
import UpvoteList from './components/UpvoteList'
import { createContext, useEffect, useState } from 'react'
import { UpvoteContextType, UpvotesProps } from './types/upvote'

export const UpvoteContext = createContext<UpvoteContextType | undefined>(
  undefined
)

export default function App() {
  // upvotes state
  const [upvotes, setUpvotes] = useState<UpvotesProps>({})

  // save to local storage
  const saveToLocalStorage = (
    object: UpvotesProps,
    id: number,
    count: number,
    selected: number
  ) => {
    object[id] = { count, selected }
    localStorage.setItem('upvotes', JSON.stringify(object))
  }

  // get local storage
  const getLocalStorage = () => {
    const localData = localStorage.getItem('upvotes')
    if (localData) {
      setUpvotes(JSON.parse(localData))
    }
  }

  // get local storage on mount
  useEffect(() => {
    getLocalStorage()
  }, [])

  return (
    <>
      <UpvoteContext.Provider value={{ upvotes, saveToLocalStorage }}>
        <div className="container mx-auto p-8">
          <h1 className="font-bold text-2xl mb-4">Upvote Demo</h1>
          <div className="flex flex-col justify-start items-start gap-4">
            {[1, 2, 3].map((i) => (
              <div className="upvote-list flex justify-start w-full" key={i}>
                <UpvoteList listId={i} />
              </div>
            ))}
          </div>
        </div>
      </UpvoteContext.Provider>
    </>
  )
}
