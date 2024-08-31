import './App.css'
import UpvoteList from './components/UpvoteList'

function App() {
  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="font-bold text-2xl mb-4">Upvote Demo</h1>
        <div className="flex flex-col justify-start items-start gap-4">
          {[1, 2, 3].map((i) => (
            <div className="flex justify-start w-full" key={i}>
              <UpvoteList />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
