import { formatter } from './formater'

export const getTotal = (payments = [], formated) => {
  const total = payments.reduce((a, b) => a + b.amount, 0)
  if (formated) {
    return formatter.format(total)
  }
  return total
}
