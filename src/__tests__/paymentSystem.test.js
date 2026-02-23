import { detectPaymentSystem } from '../js/paymentSystem'

test('detect Visa', () => {
  expect(detectPaymentSystem('4111 1111 1111 1111')).toBe('visa')
})

test('detect Mastercard 51-55', () => {
  expect(detectPaymentSystem('5500 0000 0000 0004')).toBe('mastercard')
})

test('detect Mastercard 2221-2720', () => {
  expect(detectPaymentSystem('2221 0000 0000 0009')).toBe('mastercard')
})

test('detect AmEx', () => {
  expect(detectPaymentSystem('3400 0000 0000 009')).toBe('amex')
  expect(detectPaymentSystem('3700 0000 0000 002')).toBe('amex')
})

test('detect Discover', () => {
  expect(detectPaymentSystem('6011 0000 0000 0004')).toBe('discover')
  expect(detectPaymentSystem('6500 0000 0000 0002')).toBe('discover')
  expect(detectPaymentSystem('6440 0000 0000 0000')).toBe('discover')
})

test('detect JCB', () => {
  expect(detectPaymentSystem('3528 0000 0000 0007')).toBe('jcb')
})

test('detect Diners', () => {
  expect(detectPaymentSystem('3000 0000 0000 04')).toBe('diners')
  expect(detectPaymentSystem('3600 0000 0000 08')).toBe('diners')
})

test('detect Мир', () => {
  expect(detectPaymentSystem('2200 0000 0000 0000')).toBe('mir')
  expect(detectPaymentSystem('2204 1234 5678 9012')).toBe('mir')
})

test('unknown -> null', () => {
  expect(detectPaymentSystem('9000 0000 0000 0000')).toBe(null)
})
