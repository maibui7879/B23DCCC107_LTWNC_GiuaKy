import type { RootState } from '../../app/store'

export const selectBooks = (state: RootState) => state.books.items
export const selectBooksStatus = (state: RootState) => state.books.status
export const selectBooksError = (state: RootState) => state.books.error
export const selectBorrowedBooks = (state: RootState) =>
  state.books.borrowedBooks.flatMap(({ bookId }) => {
    const book = state.books.items.find((item) => item.id === bookId)
    return book ? [book] : []
  })
