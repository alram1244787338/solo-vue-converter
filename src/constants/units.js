export const CATEGORIES = [
  { id: 'length', name: '长度', icon: '📏' },
  { id: 'weight', name: '重量', icon: '⚖️' },
  { id: 'temperature', name: '温度', icon: '🌡️' },
  { id: 'currency', name: '货币', icon: '💱' }
]

export const LENGTH_UNITS = [
  { id: 'm', name: '米', symbol: 'm' },
  { id: 'km', name: '千米', symbol: 'km' },
  { id: 'cm', name: '厘米', symbol: 'cm' },
  { id: 'mm', name: '毫米', symbol: 'mm' },
  { id: 'inch', name: '英寸', symbol: 'in' },
  { id: 'foot', name: '英尺', symbol: 'ft' },
  { id: 'yard', name: '码', symbol: 'yd' },
  { id: 'mile', name: '英里', symbol: 'mi' }
]

export const LENGTH_TO_METER = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344
}

export const WEIGHT_UNITS = [
  { id: 'kg', name: '千克', symbol: 'kg' },
  { id: 'g', name: '克', symbol: 'g' },
  { id: 'mg', name: '毫克', symbol: 'mg' },
  { id: 't', name: '吨', symbol: 't' },
  { id: 'lb', name: '磅', symbol: 'lb' },
  { id: 'oz', name: '盎司', symbol: 'oz' }
]

export const WEIGHT_TO_KG = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  t: 1000,
  lb: 0.45359237,
  oz: 0.02834952
}

export const TEMPERATURE_UNITS = [
  { id: 'c', name: '摄氏度', symbol: '°C' },
  { id: 'f', name: '华氏度', symbol: '°F' },
  { id: 'k', name: '开尔文', symbol: 'K' }
]

export const CURRENCY_UNITS = [
  { id: 'cny', name: '人民币', symbol: '¥' },
  { id: 'usd', name: '美元', symbol: '$' },
  { id: 'eur', name: '欧元', symbol: '€' },
  { id: 'jpy', name: '日元', symbol: '¥' },
  { id: 'gbp', name: '英镑', symbol: '£' },
  { id: 'hkd', name: '港币', symbol: 'HK$' }
]
