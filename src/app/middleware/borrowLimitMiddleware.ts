import type { Middleware } from '@reduxjs/toolkit'
import {
  borrowBook,
  borrowLimitReached,
  type BooksState,
} from '../../features/books/booksSlice'
import { MAX_BORROWED_BOOKS } from '../../types/book.types'

export const BORROW_LIMIT = MAX_BORROWED_BOOKS

type BooksRootState = { books: BooksState }

export const borrowLimitMiddleware: Middleware<{}, BooksRootState> =
  (api) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const borrowedCount = api.getState().books.borrowedBooks.length

      if (borrowedCount >= BORROW_LIMIT) {
        return api.dispatch(borrowLimitReached())
      }
    }

    return next(action)
  }
