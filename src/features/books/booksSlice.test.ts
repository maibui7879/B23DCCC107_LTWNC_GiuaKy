import { describe, expect, it } from '@jest/globals'
import reducer, { borrowBook, returnBook } from './booksSlice'
import type { Book } from '../../types/book.types'

const sampleBook: Book = {
  id: 'sample',
  title: 'Sample Book',
  author: 'A. Writer',
  category: 'CNTT',
  publishedYear: 2020,
  availableCopies: 2,
  totalCopies: 2,
}

describe('booksSlice', () => {
  it('borrows an available book and can return it', () => {
    const initialState = {
      items: [sampleBook],
      borrowedBooks: [],
      status: 'succeeded' as const,
      error: null,
    }

    const borrowedState = reducer(initialState, borrowBook(sampleBook.id))
    expect(borrowedState.items[0].availableCopies).toBe(1)
    expect(borrowedState.borrowedBooks[0].bookId).toBe(sampleBook.id)

    const returnedState = reducer(borrowedState, returnBook(sampleBook.id))
    expect(returnedState.items[0].availableCopies).toBe(2)
    expect(returnedState.borrowedBooks).toHaveLength(0)
  })
})
