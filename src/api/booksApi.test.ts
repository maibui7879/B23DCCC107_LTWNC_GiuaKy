import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { getBooks } from './booksApi'
import { isApiSuccess } from '../types/api.types'

describe('getBooks', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns books after 500ms', async () => {
    jest.useFakeTimers()

    const promise = getBooks()
    let completed = false
    void promise.then(() => {
      completed = true
    })

    await jest.advanceTimersByTimeAsync(499)
    expect(completed).toBe(false)

    await jest.advanceTimersByTimeAsync(1)
    const result = await promise

    expect(isApiSuccess(result)).toBe(true)
    if (isApiSuccess(result)) {
      expect(result.data.length).toBeGreaterThan(0)
      expect(result.data[0].id).toBe('book-001')
    }
  })

  it('returns an error when the API fails', async () => {
    jest.useFakeTimers()

    const promise = getBooks(true)
    await jest.advanceTimersByTimeAsync(500)
    const result = await promise

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toContain('Không thể tải')
    }
  })
})
