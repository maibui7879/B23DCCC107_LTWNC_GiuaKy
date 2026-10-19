import { useAppSelector } from '../app/hooks'
import { selectBooks, selectBorrowedBooks } from '../features/books/booksSelectors'

function StatsPage() {
  const books = useAppSelector(selectBooks)
  const borrowedBooks = useAppSelector(selectBorrowedBooks)
  const totalCopies = books.reduce((total, book) => total + book.totalCopies, 0)
  const availableCopies = books.reduce(
    (total, book) => total + book.availableCopies,
    0,
  )

  return (
    <section>
      <div className="page-heading">
        <h1>Library statistics</h1>
        <p>A quick overview of this collection and your loans.</p>
      </div>
      <div className="stats-grid">
        <article className="stats-card">
          <h2>Titles</h2>
          <strong>{books.length}</strong>
        </article>
        <article className="stats-card">
          <h2>Copies available</h2>
          <strong>{availableCopies} / {totalCopies}</strong>
        </article>
        <article className="stats-card">
          <h2>Your borrowed books</h2>
          <strong>{borrowedBooks.length}</strong>
          <p>
            {borrowedBooks.map((book) => book.title).join(', ') ||
              'No books borrowed yet.'}
          </p>
        </article>
      </div>
    </section>
  )
}

export default StatsPage
