import { getTotal, getColor } from './index'

describe('getTotal', () => {
  it('returns correct total for int values', () => {
    const integers = [{ amount: 1 }, { amount: 2 }, { amount: 3 }]
    const totalInt = getTotal(integers, false)
    expect(totalInt).toBe(6)
  })
  it('returns correct total for float values', () => {
    const floats = [{ amount: 1.11 }, { amount: 2.22 }, { amount: 3.33 }]
    const totalInt = getTotal(floats, false)
    expect(totalInt).toBe(6.66)
  })
})

describe('getColor', () => {
  it('returns a valid hex value', () => {
    const hexadecimal = /^#[0-9A-F]{6}$/i
    const color = getColor()
    expect(color).toMatch(hexadecimal)
  })
})
