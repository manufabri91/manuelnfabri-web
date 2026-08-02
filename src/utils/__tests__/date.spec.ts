import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getYearsSince } from '../date'

describe('getYearsSince', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 2)) // 2026-08-02
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the full number of elapsed years once the anniversary month has passed', () => {
    expect(getYearsSince(new Date(2014, 8, 1))).toBe(11)
    expect(getYearsSince(new Date(2018, 8, 1))).toBe(7)
  })

  it('does not count the current year until the anniversary month/day arrives', () => {
    expect(getYearsSince(new Date(2020, 8, 1))).toBe(5)
  })
})
