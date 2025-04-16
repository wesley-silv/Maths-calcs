import {
  calculateCostValue,
  calculatePercentage,
  calculatePercentageRatio,
  calculateRiskAnalysis,
  calculateFundProjection,
  calculateBazinPrice,
  calculateGrahamPrice
} from './calculations.js'
import { showModal, validateInput } from './utils.js'
import { downloadPDF, downloadXLSX } from './download.js'

document
  .getElementById('result-cost-value')
  .addEventListener('click', event => {
    event.preventDefault()
    const tickerInput = document.getElementById('ticker')
    const valueInput = document.getElementById('values')
    const quantityInput = document.getElementById('quantities')

    const ticker = tickerInput.value.trim()
    const valueCost = parseFloat(valueInput.value)
    const quantityCost = parseFloat(quantityInput.value)

    // Limpa estilos de erros anteriores
    tickerInput.classList.remove('error')
    valueInput.classList.remove('error')
    quantityInput.classList.remove('error')

    try {
      if (!ticker || isNaN(valueCost) || isNaN(quantityCost)) {
        throw new Error(
          'Por favor, preencha o código do ativo e os campos com valores numéricos.'
        )
      }

      const result = calculateCostValue(ticker, valueCost, quantityCost)

      document.getElementById(
        'cost-value-show'
      ).innerText = `Preço Médio: ${result.mean.toFixed(2)}`
      document.getElementById(
        'cost-value-all'
      ).innerText = `Quantidade Total: ${result.updateQuantity}`

      showModal('Sucesso', 'Cálculo realizado com sucesso.', 'success')
    } catch (error) {
      if (!ticker) tickerInput.classList.add('error')
      if (isNaN(valueCost)) valueInput.classList.add('error')
      if (isNaN(quantityCost)) quantityInput.classList.add('error')

      showModal('Erro', error.message, 'error')
      console.error('Erro:', error.message)
    }
  })

document
  .getElementById('result-percent-ratio')
  .addEventListener('click', event => {
    event.preventDefault()
    const valueInput = document.getElementById('value-ratio')
    const percentInput = document.getElementById('percent-ratio')
    const valueRatio = parseFloat(valueInput.value)
    const percentRatio = parseFloat(percentInput.value)

    // Limpa estilos de erro anteriores
    valueInput.classList.remove('error')
    percentInput.classList.remove('error')

    try {
      // Validação dos campos
      if (isNaN(valueRatio) || isNaN(percentRatio)) {
        throw new Error(
          'Por favor, preencha todos os campos com valores numéricos e/ou caracteres.'
        )
      }

      // Cálculo da relação percentual
      const percentageRatio = calculatePercentageRatio(valueRatio, percentRatio)

      // Exibe o resultado
      document.getElementById(
        'percent-ratio-show'
      ).innerText = `Relação Percentual: ${percentageRatio.toFixed(2)}%`

      // Exibe um modal de sucesso
      showModal('Sucesso', 'Cálculo realizado com sucesso.', 'success')
    } catch (error) {
      // Destaca os campos inválidos
      if (isNaN(valueRatio)) valueInput.classList.add('error')
      if (isNaN(percentRatio)) percentInput.classList.add('error')

      // Exibe um modal de erro
      showModal('Erro', error.message, 'error')
      console.error('Erro:', error.message)
    }
  })

document.getElementById('result-percent').addEventListener('click', event => {
  event.preventDefault()
  const valueInput = document.getElementById('value')
  const percentInput = document.getElementById('percent')
  const valuePercentage = parseFloat(valueInput.value)
  const percentPercentage = parseFloat(percentInput.value)

  valueInput.classList.remove('error')
  percentInput.classList.remove('error')

  try {
    if (isNaN(valuePercentage) || isNaN(percentPercentage)) {
      throw new Error(
        'Por favor, preencha todos os campos com valores numéricos e/ou caracteres.'
      )
    }

    const percentage = calculatePercentage(valuePercentage, percentPercentage)

    document.getElementById(
      'percent-show'
    ).innerText = `Porcentagem: ${percentage.toFixed(2)}`

    showModal('Sucesso', 'Cálculo realizado com sucesso.', 'success')
  } catch (error) {
    if (isNaN(valuePercentage)) valueInput.classList.add('error')
    if (isNaN(percentPercentage)) percentInput.classList.add('error')

    showModal('Erro', error.message, 'error')
    console.error('Erro:', error.message)
  }
})

// Configs of others click event's...

document
  .getElementById('download-options')
  .addEventListener('change', function () {
    const selectedOption = this.value

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
