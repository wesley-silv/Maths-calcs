import { registerOperation } from './operations.js'
import { validateInput } from './utils.js'

export function calculateCostValue(ticker, value, quantity) {
  // Validações básicas
  if (typeof ticker !== 'string' || !ticker.trim()) {
    throw new Error('Código do ativo inválido!')
  }
  if (isNaN(value) || value <= 0) {
    throw new Error('Valor inválido!')
  }
  if (isNaN(quantity) || quantity <= 0) {
    throw new Error('Quantidade inválida!')
  }

  // Inicializa o portfolio se não existir (assumindo que é um objeto global)
  window.portfolio = window.portfolio || {}

  // Se o ticker ainda não está no objeto, inicializamos os valores
  if (!window.portfolio[ticker]) {
    window.portfolio[ticker] = { totalValue: 0, totalQuantity: 0 }
  }

  // Atualiza os valores acumulados
  window.portfolio[ticker].totalValue += value * quantity
  const updateQuantity = (window.portfolio[ticker].totalQuantity += quantity)

  // Calcula o novo preço médio
  const mean =
    window.portfolio[ticker].totalValue / window.portfolio[ticker].totalQuantity

  // Registra a operação (se necessário)
  registerOperation('Preço médio de custo', value, quantity, mean, ticker)

  // Retorna apenas o preço médio (para compatibilidade com o código principal)
  return { mean, updateQuantity }
}

export function calculatePercentage(valuePercentage, percentPercentage) {
  validateInput(valuePercentage, 'Valor inválido!')
  validateInput(percentPercentage, 'Porcentagem inválida!')

  const percent = (valuePercentage / 100) * percentPercentage
  registerOperation('Porcentagem', valuePercentage, percentPercentage, percent)
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
