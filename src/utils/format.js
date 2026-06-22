export function formatNumber(num, decimals = 4) {
  return Number(num.toFixed(decimals))
}

export function roundTo(num, precision = 2) {
  const factor = Math.pow(10, precision)
  return Math.round(num * factor) / factor
}
