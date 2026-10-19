import { describe, expect, it, jest } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { fireEvent, render, screen } from '@testing-library/react'
import BookCard from './BookCard'
import type { Book } from '../types/book.types'

const book: Book = {
  id: 'sample',
  title: 'Sample Book',
  author: 'A. Writer',
  category: 'CNTT',
  publishedYear: 2020,
  availableCopies: 1,
  totalCopies: 1,
}

describe('BookCard', () => {
  it('shows book details and calls the borrow handler', () => {
    const onBorrow = jest.fn<(id: string) => void>()
    render(
      <BookCard
        book={book}
        borrowed={false}
        onBorrow={onBorrow}
        onReturn={jest.fn()}
      />,
    )

    expect(screen.getByText('Sample Book')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Borrow book' }))
    expect(onBorrow).toHaveBeenCalledWith('sample')
  })

  it('disables borrowing when no copies are available', () => {
    render(
      <BookCard
        book={{ ...book, availableCopies: 0 }}
        borrowed={false}
        onBorrow={jest.fn()}
        onReturn={jest.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled()
  })
})
