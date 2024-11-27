import Decimal from 'decimal.js'

export const shakeValueDecimal = (value: number | string | undefined, decimals?: number): string | number | undefined => {
  // Return early if value is undefined
  if (!value) {
    return value
  }

  // Don't modify if string ends with decimal point
  if (String(value).endsWith('.')) {
    return value
  }

  // Return original if decimals not specified
  if (decimals == null) {
    return value
  }

  const decimal = new Decimal(value)

  // Only modify if current decimal places exceed target
  if (decimal.decimalPlaces() > decimals) {
    return decimal.toDecimalPlaces(decimals, Decimal.ROUND_DOWN).toString()
  }

  return value
}
