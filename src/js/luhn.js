export function normalizeCardNumber(value) {
  return String(value).replace(/\D/g, '')
}

export function isValidLuhn(value) {
  const num = normalizeCardNumber(value)

  if (num.length < 12)
    return false
  if (!/^\d+$/.test(num))
    return false

  let sum = 0
  let shouldDouble = false

  for (let i = num.length - 1; i >= 0; i -= 1) {
    let digit = Number(num[i])

    if (shouldDouble) {
      digit *= 2
      if (digit > 9)
        digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}
