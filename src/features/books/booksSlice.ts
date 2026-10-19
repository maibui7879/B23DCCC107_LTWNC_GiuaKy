import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getBooks } from '../../api/booksApi'
import { isApiSuccess } from '../../types/api.types'
import { MAX_BORROWED_BOOKS } from '../../types/book.types'
import type {
  Book,
  BorrowedBook,
  CreateBookInput,
  UpdateBookInput,
} from '../../types/book.types'

export interface BooksState {
  items: Book[]
  borrowedBooks: BorrowedBook[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: BooksState = {
  items: [],
  borrowedBooks: [],
  status: 'idle',
  error: null,
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    const response = await getBooks()
    if (!isApiSuccess(response)) {
      return rejectWithValue(response.error)
    }
    return response.data
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<CreateBookInput>) {
      let idIndex = 1
      while (state.items.some((book) => book.id === `book-custom-${idIndex}`)) {
        idIndex += 1
      }
      state.items.push({ ...action.payload, id: `book-custom-${idIndex}` })
    },
    updateBook(
      state,
      action: PayloadAction<{ id: Book['id']; changes: UpdateBookInput }>,
    ) {
      const book = state.items.find((item) => item.id === action.payload.id)
      if (book) {
        Object.assign(book, action.payload.changes)
      }
    },
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload)
      const alreadyBorrowed = state.borrowedBooks.some(
        (item) => item.bookId === action.payload,
      )
      if (book && book.availableCopies > 0 && !alreadyBorrowed) {
        book.availableCopies -= 1
        state.borrowedBooks.push({
          bookId: book.id,
          borrowedAt: new Date().toISOString(),
        })
        state.error = null
      }
    },
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload)
      const borrowedIndex = state.borrowedBooks.findIndex(
        (item) => item.bookId === action.payload,
      )
      if (book && borrowedIndex !== -1) {
        book.availableCopies += 1
        state.borrowedBooks.splice(borrowedIndex, 1)
        state.error = null
      }
    },
    borrowLimitReached(state) {
      state.error = `You can borrow up to ${MAX_BORROWED_BOOKS} books at a time.`
    },
    clearBooksError(state) {
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message ?? 'Unable to load books.'
      })
  },
})

export const {
  addBook,
  updateBook,
  borrowBook,
  returnBook,
  borrowLimitReached,
  clearBooksError,
} = booksSlice.actions

export default booksSlice.reducer
