import type { Book } from '../types/book.types'

interface BookCardProps {
  book: Book
  borrowed: boolean
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

function BookCard({ book, borrowed, onBorrow, onReturn }: BookCardProps) {
  return (
    <article className="book-card" aria-label={book.title}>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>Published {book.publishedYear}</p>
      <p>
        {book.category} · {book.availableCopies} of {book.totalCopies} available
      </p>
      {borrowed ? (
        <button type="button" onClick={() => onReturn(book.id)}>
          Return book
        </button>
      ) : (
        <button
          type="button"
          disabled={book.availableCopies === 0}
          onClick={() => onBorrow(book.id)}
        >
          {book.availableCopies === 0 ? 'Unavailable' : 'Borrow book'}
        </button>
      )}
    </article>
  )
}

export default BookCard
