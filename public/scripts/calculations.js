import { registerOperation } from './operations.js'
import { validateInput } from './utils.js'

const portfolio = {} // Object to stored the accumulated values of each ticker

export function calculateCostValue(ticker, value, quantity) {
  validateInput(value, 'Valor inválido!')
  validateInput(quantity, 'Quantidade inválida!')

  // If the ticker don't yet in object, We initialized the values
  if (!portfolio[ticker]) {
    portfolio[ticker] = { totalValue: 0, totalQuantity: 0 }
  }

  // Update the accumulated values
  portfolio[ticker].totalValue += value * quantity
  portfolio[ticker].totalQuantity += quantity

  // Calc the new mean cost
  const mean = portfolio[ticker].totalValue / portfolio[ticker].totalQuantity

  // Register the operation (if need's)
  registerOperation('Preço médio de custo', value, quantity, mean, ticker)

  // Return the update values
  return {
    mean,
    totalValue: portfolio[ticker].totalValue,
    quantity: portfolio[ticker].totalQuantity
  }
}

export function calculatePercentage(value, percentValue) {
  validateInput(value, 'Valor inválido!')
  validateInput(percentValue, 'Porcentagem inválida!')

  const percent = (value / 100) * percentValue
  registerOperation('Porcentagem', value, percentValue, percent)
  return percent
}

export function calculatePercentageRatio(valueRatio, percentRatio) {
  validateInput(valueRatio, 'Valor base inválido!')
  validateInput(percentRatio, 'Porcentagem inválida!')

  const percent = (percentRatio / valueRatio) * 100
  registerOperation(
    'Relação Percentual',
    valueRatio,
    percentRatio,
    `${percent.toFixed(2)}%`
  )
  return percent
}

export function calculateRiskAnalysis(amount, margin, units) {
  validateInput(amount, 'Valor inválido!')
  validateInput(margin, 'Margem inválida!')
  validateInput(units, 'Unidades inválidas!')

  const riskMargin = (amount * (margin / 100)) / units
  registerOperation('Margem de Risco', amount, margin, riskMargin)
  return { riskMargin, totalLoss: riskMargin * units }
}

export function calculateFundProjection(
  quotaValue,
  monthlyIncome,
  quantityQuota
) {
  validateInput(quotaValue, 'Valor da cota inválido!')
  validateInput(monthlyIncome, 'Rendimento mensal inválido!')
  validateInput(quantityQuota, 'Quantidade de cotas inválida!')

  const totalInvestment = quotaValue * quantityQuota
  const totalMonthlyEarnings = monthlyIncome * quantityQuota
  registerOperation(
    'Projeção de Fundos',
    quotaValue,
    quantityQuota,
    totalMonthlyEarnings
  )
  return { totalInvestment, totalMonthlyEarnings }
}

export function calculateBazinPrice(dividendYield, averageDividend) {
  validateInput(dividendYield, 'Dividend Yield inválido!')
  validateInput(averageDividend, 'Média de dividendos inválida!')

  const bazinPrice = ((averageDividend * 100) / dividendYield).toFixed(2)
  registerOperation(
    'Preço Teto (Décio Bazin)',
    averageDividend,
    dividendYield,
    bazinPrice
  )
  return bazinPrice
}

export function calculateGrahamPrice(earningsPerShare, bookValuePerShare) {
  validateInput(earningsPerShare, 'LPA inválido!')
  validateInput(bookValuePerShare, 'VPA inválido!')

  const grahamPrice = Math.sqrt(
    22.5 * earningsPerShare * bookValuePerShare
  ).toFixed(2)
  registerOperation(
    'Preço Teto (Benjamin Graham)',
    earningsPerShare,
    bookValuePerShare,
    grahamPrice
  )
  return grahamPrice
}
