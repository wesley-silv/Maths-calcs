// utils.js
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function getCurrentDate() {
  return new Date().toLocaleString()
}

export function validateInput(value, errorMessage) {
  if (isNaN(value) || value <= 0) {
    throw new Error(errorMessage)
  }
}
