export type UpvotesProps = {
  [key: number]:
    | {
        count: number
        selected: number
      }
    | undefined
}

export type UpvoteContextType = {
  upvotes: UpvotesProps
  saveToLocalStorage: (
    object: UpvotesProps,
    id: number,
    count: number,
    selected: number
  ) => void
}
