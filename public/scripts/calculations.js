// calculations.js
import { registerOperation } from './operations.js'
import { validateInput } from './utils.js'

// export function calculateCostValue(ticker, value, quantity) {
//   validateInput(value, 'Valor inválido!')
//   validateInput(quantity, 'Quantidade inválida!')

//   const totalValue = value * quantity
//   const mean = totalValue / quantity

//   registerOperation('Preço médio de custo', value, quantity, mean, ticker)
//   return { mean, totalValue, quantity }
// }

const portfolio = {} // Objeto para armazenar os valores acumulados de cada ticker

export function calculateCostValue(ticker, value, quantity) {
  validateInput(value, 'Valor inválido!')
  validateInput(quantity, 'Quantidade inválida!')

  // Se o ticker ainda não estiver no objeto, inicializamos os valores
  if (!portfolio[ticker]) {
    portfolio[ticker] = { totalValue: 0, totalQuantity: 0 }
  }

  // Atualiza os valores acumulados
  portfolio[ticker].totalValue += value * quantity
  portfolio[ticker].totalQuantity += quantity

  // Calcula o novo preço médio
  const mean = portfolio[ticker].totalValue / portfolio[ticker].totalQuantity

  // Registra a operação (se necessário)
  registerOperation('Preço médio de custo', value, quantity, mean, ticker)

  // Retorna os valores atualizados
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
