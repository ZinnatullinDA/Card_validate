import { normalizeCardNumber } from './luhn.js'

export function detectPaymentSystem(value) {
  const num = normalizeCardNumber(value)
  if (num.length === 0)
    return null

  const p1 = Number(num.slice(0, 1))
  const p2 = Number(num.slice(0, 2))
  const p3 = Number(num.slice(0, 3))
  const p4 = Number(num.slice(0, 4))

  if (num.length >= 4 && p4 >= 2200 && p4 <= 2204)
    return 'mir'

  if (p1 === 4)
    return 'visa'

  if (p2 === 34 || p2 === 37)
    return 'amex'

  if ((p2 >= 51 && p2 <= 55) || (num.length >= 4 && p4 >= 2221 && p4 <= 2720)) {
    return 'mastercard'
  }

  if (num.startsWith('6011') || p2 === 65 || (p3 >= 644 && p3 <= 649)) {
    return 'discover'
  }

  if (num.length >= 4 && p4 >= 3528 && p4 <= 3589)
    return 'jcb'

  if ((p3 >= 300 && p3 <= 305) || p2 === 36 || p2 === 38 || p2 === 39) {
    return 'diners'
  }

  return null
}
