import type { ApiResponse } from '../types/api.types'
import type { Book } from '../types/book.types'

const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'CNTT',
    publishedYear: 2008,
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: 'book-002',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    category: 'CNTT',
    publishedYear: 1994,
    totalCopies: 4,
    availableCopies: 2,
  },
  {
    id: 'book-003',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'CNTT',
    publishedYear: 2022,
    totalCopies: 3,
    availableCopies: 3,
  },
  {
    id: 'book-004',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    category: 'Kinh tế',
    publishedYear: 2021,
    totalCopies: 4,
    availableCopies: 1,
  },
  {
    id: 'book-005',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    category: 'Kinh tế',
    publishedYear: 1997,
    totalCopies: 5,
    availableCopies: 0,
  },
  {
    id: 'book-006',
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    category: 'Ngoại ngữ',
    publishedYear: 2019,
    totalCopies: 6,
    availableCopies: 4,
  },
  {
    id: 'book-007',
    title: 'Oxford Word Skills',
    author: 'Ruth Gairns',
    category: 'Ngoại ngữ',
    publishedYear: 2020,
    totalCopies: 3,
    availableCopies: 2,
  },
  {
    id: 'book-008',
    title: 'Refactoring',
    author: 'Martin Fowler',
    category: 'CNTT',
    publishedYear: 2018,
    totalCopies: 2,
    availableCopies: 0,
  },
]

export function getBooks(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          ok: false,
          error: 'Không thể tải danh sách sách. Vui lòng thử lại.',
        })
        return
      }

      resolve({
        ok: true,
        data: mockBooks.map((book) => ({ ...book })),
      })
    }, 500)
  })
}
