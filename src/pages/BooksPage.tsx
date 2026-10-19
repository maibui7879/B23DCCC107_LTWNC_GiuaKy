import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BookCard from '../components/BookCard'
import CategoryFilter from '../components/CategoryFilter'
import SearchBar from '../components/SearchBar'
import {
  borrowBook,
  clearBooksError,
  fetchBooks,
  returnBook,
} from '../features/books/booksSlice'
import {
  selectBooks,
  selectBorrowedBooks,
  selectBooksError,
  selectBooksStatus,
} from '../features/books/booksSelectors'
import { useFilterStore } from '../features/filters/filterStore'
import { useDebounce } from '../hooks/useDebounce'
import { BOOK_CATEGORIES } from '../types/book.types'

function BooksPage() {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBooks)
  const borrowedBooks = useAppSelector(selectBorrowedBooks)
  const status = useAppSelector(selectBooksStatus)
  const error = useAppSelector(selectBooksError)
  const search = useFilterStore((state) => state.search)
  const category = useFilterStore((state) => state.category)
  const setSearch = useFilterStore((state) => state.setSearch)
  const setCategory = useFilterStore((state) => state.setCategory)
  const debouncedSearch = useDebounce(search, 250)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchBooks())
    }
  }, [dispatch, status])

  const categories = useMemo(() => ['All', ...BOOK_CATEGORIES], [])
  const visibleBooks = books.filter((book) => {
    const matchesCategory = category === 'All' || book.category === category
    const query = debouncedSearch.trim().toLocaleLowerCase()
    const matchesSearch =
      !query ||
      book.title.toLocaleLowerCase().includes(query) ||
      book.author.toLocaleLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <section>
      <div className="page-heading">
        <h1>Find your next read</h1>
        <p>Browse the collection and borrow up to three books at a time.</p>
      </div>
      <div className="filters">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value)
            dispatch(clearBooksError())
          }}
        />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>
      {error && <p role="alert">{error}</p>}
      {status === 'loading' && <p className="message">Loading books…</p>}
      {status === 'succeeded' && visibleBooks.length === 0 && (
        <p className="message">No books match your search.</p>
      )}
      <div className="book-grid">
        {visibleBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            borrowed={borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id)}
            onBorrow={(id) => dispatch(borrowBook(id))}
            onReturn={(id) => dispatch(returnBook(id))}
          />
        ))}
      </div>
    </section>
  )
}

export default BooksPage
