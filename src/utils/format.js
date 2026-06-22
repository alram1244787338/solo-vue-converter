export function formatNumber(num, decimals = 4) {
  return Number(num.toFixed(decimals))
}

export function roundTo(num, precision = 2) {
  const factor = Math.pow(10, precision)
  const result = Math.round(num * factor) / factor
  return Object.is(result, -0) ? 0 : result
}
