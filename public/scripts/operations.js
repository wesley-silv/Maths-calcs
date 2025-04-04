import { formatCurrency, getCurrentDate } from './utils.js'

export let realizedOperations = []

export function registerOperation(
  description,
  value,
  quantity,
  result,
  ticker = ''
) {
  const operation = {
    date: getCurrentDate(),
    description,
    ticker: ticker.toUpperCase(),
    value: formatCurrency(value),
    quantity,
    result: formatCurrency(result)
  }
  realizedOperations.push(operation)
}
console.log('Coletando as inserções no array:', realizedOperations)

export function getOperations() {
  return realizedOperations
}

export function clearOperations() {
  realizedOperations = []
}
