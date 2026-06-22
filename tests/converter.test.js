import { describe, it, expect } from 'vitest'
import {
  convertTemperature,
  convertByBase,
  isValidNumber
} from '../src/composables/useConverter.js'
import {
  LENGTH_TO_METER,
  WEIGHT_TO_KG,
  CURRENCY_TO_USD
} from '../src/constants/units.js'

describe('isValidNumber', () => {
  it('should return false for empty string', () => {
    expect(isValidNumber('')).toBe(false)
  })

  it('should return false for null and undefined', () => {
    expect(isValidNumber(null)).toBe(false)
    expect(isValidNumber(undefined)).toBe(false)
  })

  it('should return false for non-numeric strings', () => {
    expect(isValidNumber('abc')).toBe(false)
    expect(isValidNumber('NaN')).toBe(false)
    expect(isValidNumber('Infinity')).toBe(false)
  })

  it('should return false for NaN and Infinity', () => {
    expect(isValidNumber(NaN)).toBe(false)
    expect(isValidNumber(Infinity)).toBe(false)
    expect(isValidNumber(-Infinity)).toBe(false)
  })

  it('should return true for valid numeric strings', () => {
    expect(isValidNumber('0')).toBe(true)
    expect(isValidNumber('123')).toBe(true)
    expect(isValidNumber('-40.5')).toBe(true)
    expect(isValidNumber('3.14')).toBe(true)
  })

  it('should return true for actual numbers', () => {
    expect(isValidNumber(0)).toBe(true)
    expect(isValidNumber(123)).toBe(true)
    expect(isValidNumber(-40.5)).toBe(true)
  })
})

describe('convertTemperature', () => {
  describe('same unit conversion', () => {
    it('should return the same value when from = to (Celsius)', () => {
      expect(convertTemperature(25, 'c', 'c')).toBe(25)
    })
    it('should return the same value when from = to (Fahrenheit)', () => {
      expect(convertTemperature(77, 'f', 'f')).toBe(77)
    })
    it('should return the same value when from = to (Kelvin)', () => {
      expect(convertTemperature(300, 'k', 'k')).toBe(300)
    })
  })

  describe('Celsius → Fahrenheit', () => {
    it('0°C should be 32°F (water freezing point)', () => {
      expect(convertTemperature(0, 'c', 'f')).toBe(32)
    })

    it('100°C should be 212°F (water boiling point)', () => {
      expect(convertTemperature(100, 'c', 'f')).toBe(212)
    })

    it('-40°C should be -40°F (the intersection point)', () => {
      expect(convertTemperature(-40, 'c', 'f')).toBe(-40)
    })

    it('25°C should be 77°F', () => {
      expect(convertTemperature(25, 'c', 'f')).toBe(77)
    })
  })

  describe('Fahrenheit → Celsius', () => {
    it('32°F should be 0°C', () => {
      expect(convertTemperature(32, 'f', 'c')).toBe(0)
    })

    it('212°F should be 100°C', () => {
      expect(convertTemperature(212, 'f', 'c')).toBe(100)
    })

    it('-40°F should be -40°C', () => {
      expect(convertTemperature(-40, 'f', 'c')).toBe(-40)
    })
  })

  describe('Celsius → Kelvin', () => {
    it('0°C should be 273.15 K (absolute zero offset)', () => {
      expect(convertTemperature(0, 'c', 'k')).toBe(273.15)
    })

    it('100°C should be 373.15 K', () => {
      expect(convertTemperature(100, 'c', 'k')).toBe(373.15)
    })

    it('-273.15°C should be 0 K (absolute zero)', () => {
      expect(convertTemperature(-273.15, 'c', 'k')).toBe(0)
    })
  })

  describe('Kelvin → Celsius', () => {
    it('273.15 K should be 0°C', () => {
      expect(convertTemperature(273.15, 'k', 'c')).toBe(0)
    })

    it('0 K should be -273.15°C', () => {
      expect(convertTemperature(0, 'k', 'c')).toBe(-273.15)
    })
  })

  describe('Fahrenheit ↔ Kelvin (cross-conversion)', () => {
    it('32°F (0°C) should be 273.15 K', () => {
      expect(convertTemperature(32, 'f', 'k')).toBe(273.15)
    })

    it('273.15 K should be 32°F', () => {
      expect(convertTemperature(273.15, 'k', 'f')).toBe(32)
    })

    it('212°F should be 373.15 K', () => {
      expect(convertTemperature(212, 'f', 'k')).toBe(373.15)
    })
  })

  describe('round-trip stability (precision)', () => {
    it('C → F → C should return approximately the original value', () => {
      const original = 25
      const f = convertTemperature(original, 'c', 'f')
      const back = convertTemperature(f, 'f', 'c')
      expect(back).toBe(original)
    })

    it('K → C → F → C → K should return approximately the original value', () => {
      const original = 300
      const c = convertTemperature(original, 'k', 'c')
      const f = convertTemperature(c, 'c', 'f')
      const c2 = convertTemperature(f, 'f', 'c')
      const k = convertTemperature(c2, 'c', 'k')
      expect(k).toBeCloseTo(original, 3)
    })
  })

  describe('invalid input handling', () => {
    it('should return empty string for empty input', () => {
      expect(convertTemperature('', 'c', 'f')).toBe('')
    })

    it('should return empty string for null input', () => {
      expect(convertTemperature(null, 'c', 'f')).toBe('')
    })

    it('should return empty string for non-numeric input', () => {
      expect(convertTemperature('abc', 'c', 'f')).toBe('')
    })
  })
})

describe('convertByBase (generic base-unit conversion)', () => {
  it('should convert length: 1 km → 1000 m', () => {
    expect(convertByBase(1, 'km', 'm', LENGTH_TO_METER)).toBe(1000)
  })

  it('should convert length: 1000 m → 1 km', () => {
    expect(convertByBase(1000, 'm', 'km', LENGTH_TO_METER)).toBe(1)
  })

  it('should convert length: 1 inch → 0.0254 m (exact)', () => {
    expect(convertByBase(1, 'inch', 'm', LENGTH_TO_METER)).toBe(0.0254)
  })

  it('should convert weight: 1 kg → 1000 g', () => {
    expect(convertByBase(1, 'kg', 'g', WEIGHT_TO_KG)).toBe(1000)
  })

  it('should convert weight: 2 jin → 1 kg', () => {
    expect(convertByBase(2, 'jin', 'kg', WEIGHT_TO_KG)).toBe(1)
  })

  it('should convert weight: 1 lb ≈ 0.453592 kg', () => {
    expect(convertByBase(1, 'lb', 'kg', WEIGHT_TO_KG)).toBe(0.453592)
  })

  it('should convert currency: 1 usd → ~7.246 cny (via 0.138 usd/cny)', () => {
    expect(convertByBase(1, 'usd', 'cny', CURRENCY_TO_USD, 4)).toBeCloseTo(7.2464, 2)
  })

  it('should return empty string for invalid input', () => {
    expect(convertByBase('', 'm', 'km', LENGTH_TO_METER)).toBe('')
    expect(convertByBase('abc', 'm', 'km', LENGTH_TO_METER)).toBe('')
  })
})
