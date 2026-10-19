export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ'

export interface Book {
  id: string
  title: string
  author: string
  category: BookCategory
  publishedYear: number
  totalCopies: number
  availableCopies: number
}

export interface BorrowedBook {
  bookId: Book['id']
  borrowedAt: string
}

export type CreateBookInput = Omit<Book, 'id'>

export type UpdateBookInput = Partial<
  Pick<Book, 'title' | 'author' | 'category' | 'publishedYear'>
>

export const BOOK_CATEGORIES: BookCategory[] = [
  'CNTT',
  'Kinh tế',
  'Ngoại ngữ',
]

export const MAX_BORROWED_BOOKS = 3
