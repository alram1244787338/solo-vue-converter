import { describe, it, expect } from 'vitest'
import {
  LENGTH_UNITS,
  LENGTH_TO_METER,
  WEIGHT_UNITS,
  WEIGHT_TO_KG,
  TEMPERATURE_UNITS,
  CURRENCY_UNITS,
  CURRENCY_TO_USD
} from '../src/constants/units.js'

describe('constants/units.js - LENGTH', () => {
  it('should expose LENGTH_UNITS as a non-empty array', () => {
    expect(Array.isArray(LENGTH_UNITS)).toBe(true)
    expect(LENGTH_UNITS.length).toBeGreaterThan(0)
  })

  it('should have id/name/symbol for every length unit', () => {
    for (const unit of LENGTH_UNITS) {
      expect(typeof unit.id).toBe('string')
      expect(unit.id.length).toBeGreaterThan(0)
      expect(typeof unit.name).toBe('string')
      expect(typeof unit.symbol).toBe('string')
    }
  })

  it('should have unique ids across length units', () => {
    const ids = LENGTH_UNITS.map((u) => u.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should provide a rate for every defined length unit', () => {
    expect(typeof LENGTH_TO_METER).toBe('object')
    expect(LENGTH_TO_METER).not.toBeNull()
    for (const unit of LENGTH_UNITS) {
      expect(LENGTH_TO_METER).toHaveProperty(unit.id)
      expect(typeof LENGTH_TO_METER[unit.id]).toBe('number')
      expect(Number.isFinite(LENGTH_TO_METER[unit.id])).toBe(true)
      expect(LENGTH_TO_METER[unit.id]).toBeGreaterThan(0)
    }
  })

  it('should use meter as base unit (rate = 1)', () => {
    expect(LENGTH_TO_METER.m).toBe(1)
  })
})

describe('constants/units.js - WEIGHT', () => {
  it('should expose WEIGHT_UNITS as a non-empty array', () => {
    expect(Array.isArray(WEIGHT_UNITS)).toBe(true)
    expect(WEIGHT_UNITS.length).toBeGreaterThan(0)
  })

  it('should have id/name/symbol for every weight unit', () => {
    for (const unit of WEIGHT_UNITS) {
      expect(typeof unit.id).toBe('string')
      expect(unit.id.length).toBeGreaterThan(0)
      expect(typeof unit.name).toBe('string')
      expect(typeof unit.symbol).toBe('string')
    }
  })

  it('should have unique ids across weight units', () => {
    const ids = WEIGHT_UNITS.map((u) => u.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should provide a rate for every defined weight unit', () => {
    expect(typeof WEIGHT_TO_KG).toBe('object')
    expect(WEIGHT_TO_KG).not.toBeNull()
    for (const unit of WEIGHT_UNITS) {
      expect(WEIGHT_TO_KG).toHaveProperty(unit.id)
      expect(typeof WEIGHT_TO_KG[unit.id]).toBe('number')
      expect(Number.isFinite(WEIGHT_TO_KG[unit.id])).toBe(true)
      expect(WEIGHT_TO_KG[unit.id]).toBeGreaterThan(0)
    }
  })

  it('should use kilogram as base unit (rate = 1)', () => {
    expect(WEIGHT_TO_KG.kg).toBe(1)
  })

  it('should include milligram and pound among weight units', () => {
    const ids = WEIGHT_UNITS.map((u) => u.id)
    expect(ids).toContain('mg')
    expect(ids).toContain('lb')
  })
})

describe('constants/units.js - TEMPERATURE', () => {
  it('should expose TEMPERATURE_UNITS as a non-empty array', () => {
    expect(Array.isArray(TEMPERATURE_UNITS)).toBe(true)
    expect(TEMPERATURE_UNITS.length).toBeGreaterThan(0)
  })

  it('should include Celsius, Fahrenheit, and Kelvin', () => {
    const ids = TEMPERATURE_UNITS.map((u) => u.id)
    expect(ids).toEqual(expect.arrayContaining(['c', 'f', 'k']))
  })

  it('should have unique ids across temperature units', () => {
    const ids = TEMPERATURE_UNITS.map((u) => u.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('constants/units.js - CURRENCY', () => {
  it('should expose CURRENCY_UNITS as a non-empty array', () => {
    expect(Array.isArray(CURRENCY_UNITS)).toBe(true)
    expect(CURRENCY_UNITS.length).toBeGreaterThan(0)
  })

  it('should have id/name/symbol for every currency unit', () => {
    for (const unit of CURRENCY_UNITS) {
      expect(typeof unit.id).toBe('string')
      expect(unit.id.length).toBeGreaterThan(0)
      expect(typeof unit.name).toBe('string')
      expect(typeof unit.symbol).toBe('string')
    }
  })

  it('should include major currencies', () => {
    const ids = CURRENCY_UNITS.map((u) => u.id)
    expect(ids).toEqual(expect.arrayContaining(['usd', 'eur', 'gbp', 'jpy', 'cny', 'hkd']))
  })

  it('should provide a rate for every defined currency unit', () => {
    expect(typeof CURRENCY_TO_USD).toBe('object')
    expect(CURRENCY_TO_USD).not.toBeNull()
    for (const unit of CURRENCY_UNITS) {
      expect(CURRENCY_TO_USD).toHaveProperty(unit.id)
      expect(typeof CURRENCY_TO_USD[unit.id]).toBe('number')
      expect(Number.isFinite(CURRENCY_TO_USD[unit.id])).toBe(true)
      expect(CURRENCY_TO_USD[unit.id]).toBeGreaterThan(0)
    }
  })

  it('should use USD as base unit (rate = 1)', () => {
    expect(CURRENCY_TO_USD.usd).toBe(1)
  })
})
