import { ref, computed, watch } from 'vue'
import {
  LENGTH_UNITS,
  LENGTH_TO_METER,
  WEIGHT_UNITS,
  WEIGHT_TO_KG,
  TEMPERATURE_UNITS,
  CURRENCY_UNITS,
  CURRENCY_TO_USD
} from '../constants/units.js'
import { roundTo } from '../utils/format.js'

export function isValidNumber(value) {
  if (value === '' || value === null || value === undefined) return false
  const num = parseFloat(value)
  return !isNaN(num) && isFinite(num)
}

export function convertByBase(value, fromUnit, toUnit, rates, precision = 6) {
  if (!isValidNumber(value)) return ''
  const num = parseFloat(value)
  if (fromUnit === toUnit) return roundTo(num, precision)
  const baseValue = num * rates[fromUnit]
  const result = baseValue / rates[toUnit]
  return roundTo(result, precision)
}

export function convertTemperature(value, fromUnit, toUnit) {
  if (!isValidNumber(value)) return ''
  const num = parseFloat(value)
  if (fromUnit === toUnit) return roundTo(num, 4)

  let celsius
  switch (fromUnit) {
    case 'c':
      celsius = num
      break
    case 'f':
      celsius = (num - 32) * (5 / 9)
      break
    case 'k':
      celsius = num - 273.15
      break
    default:
      celsius = num
  }

  let result
  switch (toUnit) {
    case 'c':
      result = celsius
      break
    case 'f':
      result = celsius * (9 / 5) + 32
      break
    case 'k':
      result = celsius + 273.15
      break
    default:
      result = celsius
  }

  return roundTo(result, 4)
}

function convertWeight(value, fromUnit, toUnit) {
  return convertByBase(value, fromUnit, toUnit, WEIGHT_TO_KG, 6)
}

function convertLength(value, fromUnit, toUnit) {
  return convertByBase(value, fromUnit, toUnit, LENGTH_TO_METER, 6)
}

function convertCurrency(value, fromUnit, toUnit) {
  return convertByBase(value, fromUnit, toUnit, CURRENCY_TO_USD, 4)
}

function getUnits(categoryId) {
  switch (categoryId) {
    case 'length':
      return LENGTH_UNITS
    case 'weight':
      return WEIGHT_UNITS
    case 'temperature':
      return TEMPERATURE_UNITS
    case 'currency':
      return CURRENCY_UNITS
    default:
      return []
  }
}

export function useConverter(categoryId) {
  const units = computed(() => getUnits(categoryId))
  const fromUnit = ref(units.value[0]?.id || '')
  const toUnit = ref(units.value[1]?.id || '')
  const fromValue = ref('')
  const toValue = ref('')
  let isUpdating = false

  function convert(value, from, to) {
    switch (categoryId) {
      case 'length':
        return convertLength(value, from, to)
      case 'weight':
        return convertWeight(value, from, to)
      case 'temperature':
        return convertTemperature(value, from, to)
      case 'currency':
        return convertCurrency(value, from, to)
      default:
        return ''
    }
  }

  function swapUnits() {
    const tempUnit = fromUnit.value
    const tempValue = fromValue.value
    fromUnit.value = toUnit.value
    toUnit.value = tempUnit
    fromValue.value = toValue.value
    toValue.value = tempValue
  }

  function reset() {
    fromValue.value = ''
    toValue.value = ''
  }

  watch(
    [fromValue, fromUnit, toUnit],
    ([newFromValue, newFromUnit, newToUnit]) => {
      if (isUpdating) return
      isUpdating = true
      toValue.value = convert(newFromValue, newFromUnit, newToUnit)
      isUpdating = false
    },
    { immediate: true }
  )

  watch(
    [toValue, toUnit, fromUnit],
    ([newToValue, newToUnit, newFromUnit]) => {
      if (isUpdating) return
      isUpdating = true
      fromValue.value = convert(newToValue, newToUnit, newFromUnit)
      isUpdating = false
    }
  )

  return {
    units,
    fromUnit,
    toUnit,
    fromValue,
    toValue,
    swapUnits,
    reset
  }
}
