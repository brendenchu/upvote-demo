export type UpvotesProps = { [key: number]: number | undefined }

export type UpvoteContextType = {
  upvotes: UpvotesProps
  saveToLocalStorage: (object: UpvotesProps, id: number, count: number) => void
}
