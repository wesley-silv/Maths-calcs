import {
  calculateCostValue,
  calculatePercentage,
  calculatePercentageRatio,
  calculateRiskAnalysis,
  calculateFundProjection,
  calculateBazinPrice,
  calculateGrahamPrice
} from './calculations.js'
import { downloadPDF, downloadXLSX } from './download.js'

document.getElementById('result-cost-value').addEventListener('click', () => {
  const ticker = document.getElementById('ticker').value.trim()
  const value = parseFloat(document.getElementById('values').value)
  const quantity = parseFloat(document.getElementById('quantities').value)

  try {
    const {
      mean,
      totalValue,
      quantity: totalQuantity
    } = calculateCostValue(ticker, value, quantity)
    document.getElementById(
      'cost-value-show'
    ).innerText = `Preço Médio: R$ ${mean.toFixed(2)}`
    document.getElementById(
      'cost-value-all'
    ).innerText = `Quantidade Total: ${totalQuantity.toFixed(0)}`
  } catch (error) {
    alert(error.message)
    console.log('Há campos no formulário não preenchidos!')
  }
})

document.getElementById('result-percent').addEventListener('click', () => {
  const value = parseFloat(document.getElementById('value').value)
  const percentValue = parseFloat(document.getElementById('percent').value)

  try {
    const percent = calculatePercentage(value, percentValue)
    document.getElementById(
      'percent-show'
    ).innerText = `Porcentagem: ${percent.toFixed(2)}`
  } catch (error) {
    alert(error.message)
    console.log('Há campos no formulário não preenchidos!')
  }
})

// Configs of others click event's...

document
  .getElementById('result-percent-ratio')
  .addEventListener('click', () => {
    const valueRatio = parseFloat(document.getElementById('value').value)
    const percentRatio = parseFloat(document.getElementById('percent').value)

    try {
      const percentageRatio = (calculatePercentageRatio(
        valueRatio,
        percentRatio
      ).document.getElementById(
        'percent-ratio-show'
      ).innerText = `Relação Percentual: ${percentageRatio.toFixed(2)}`)
    } catch (error) {
      alert(error.message)
      console.log('Há campos no formulário não preenchidos!')
    }
  })

document
  .getElementById('download-options')
  .addEventListener('change', function () {
    const selectedOption = this.value

    if (!selectedOption) {
      alert('Selecione um formato válido para o download!')
      return
    }

    switch (selectedOption) {
      case 'pdf':
        downloadPDF()
        break
      case 'xlsx':
        downloadXLSX()
        break
      default:
        alert('Formato inválido selecionado!')
    }

    this.value = ''
  })
