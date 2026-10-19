import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the latest value after the delay', () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } },
    )

    rerender({ value: 'second' })
    expect(result.current).toBe('first')

    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(result.current).toBe('second')
  })
})
