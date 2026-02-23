import { isValidLuhn } from '../js/luhn'

test('валидный номер проходит Luhn', () => {
  // классический валидный тестовый номер (Visa)
  expect(isValidLuhn('4111 1111 1111 1111')).toBe(true)
})

test('невалидный номер не проходит Luhn', () => {
  expect(isValidLuhn('4111 1111 1111 1112')).toBe(false)
})

test('мусор и пустые значения -> false', () => {
  expect(isValidLuhn('')).toBe(false)
  expect(isValidLuhn('abcd')).toBe(false)
  expect(isValidLuhn('12')).toBe(false)
})
