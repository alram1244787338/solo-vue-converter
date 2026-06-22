import { describe, it, expect } from 'vitest'
import { formatNumber, roundTo } from '../src/utils/format.js'

describe('format.js - roundTo', () => {
  it('should round positive numbers correctly', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14)
    expect(roundTo(3.14159, 3)).toBe(3.142)
    expect(roundTo(3.14159, 0)).toBe(3)
  })

  it('should round negative numbers correctly', () => {
    expect(roundTo(-3.14159, 2)).toBe(-3.14)
    expect(roundTo(-3.14159, 3)).toBe(-3.142)
    expect(roundTo(-3.14159, 0)).toBe(-3)
  })

  it('should handle zero correctly', () => {
    expect(roundTo(0, 2)).toBe(0)
    expect(roundTo(-0, 2)).toBe(0)
    expect(roundTo(0.0001, 2)).toBe(0)
  })

  it('should handle precision boundaries correctly (round half up)', () => {
    expect(roundTo(1.235, 2)).toBe(1.24)
    expect(roundTo(1.234, 2)).toBe(1.23)
    expect(roundTo(-1.235, 2)).toBe(-1.24)
  })

  it('should use default precision of 2', () => {
    expect(roundTo(1.23456)).toBe(1.23)
  })

  it('should handle integers without breaking', () => {
    expect(roundTo(5, 2)).toBe(5)
    expect(roundTo(5, 0)).toBe(5)
  })

  it('should handle large precision values', () => {
    expect(roundTo(0.123456789, 6)).toBe(0.123457)
    expect(roundTo(0.123456789, 8)).toBe(0.12345679)
  })
})

describe('format.js - formatNumber', () => {
  it('should format positive numbers with default decimals (4)', () => {
    expect(formatNumber(3.1415926)).toBe(3.1416)
    expect(formatNumber(5)).toBe(5)
  })

  it('should format negative numbers', () => {
    expect(formatNumber(-3.14159, 2)).toBe(-3.14)
  })

  it('should handle zero', () => {
    expect(formatNumber(0, 2)).toBe(0)
    expect(formatNumber(0)).toBe(0)
  })

  it('should respect custom decimals parameter', () => {
    expect(formatNumber(1.2345678, 2)).toBe(1.23)
    expect(formatNumber(1.2345678, 6)).toBe(1.234568)
  })

  it('should strip trailing zeros (toFixed returns string, Number removes them)', () => {
    expect(formatNumber(1.5, 4)).toBe(1.5)
    expect(formatNumber(2.0, 2)).toBe(2)
  })
})
