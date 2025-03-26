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

document
  .getElementById('result-cost-value')
  .addEventListener('click', event => {
    event.preventDefault()
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
      ).innerText = `Relação Percentual: ${percentageRatio.toFixed(2)}`

      // Exibe um modal de sucesso
      showModal('Sucesso!', 'O cálculo foi realizado com sucesso.', 'success')
    } catch (error) {
      // Destaca os campos inválidos
      if (isNaN(valueRatio)) valueInput.classList.add('error')
      if (isNaN(percentRatio)) percentInput.classList.add('error')

      // Exibe um modal de erro
      showModal('Erro', error.message, 'error')
      console.error('Erro:', error.message)
    }
  })

// Função para exibir um modal personalizado
function showModal(title, message, type) {
  // Cria o modal
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.innerHTML = `
    <div class="modal-content ${type}">
      <h2>${title}</h2>
      <p>${message}</p>
     ${
       type === 'error' ? '<button id="close-modal-button">Fechar</button>' : ''
     }
    </div>
  `

  // Adiciona o modal ao body
  document.body.appendChild(modal)

  // Adiciona uma classe para exibir o modal
  setTimeout(() => {
    modal.classList.add('show')
  }, 10)

  // Configura o fechamento baseado no tipo
  if (type === 'success') {
    // Fecha automaticamente após 10 segundos (10000 milisegundos)
    setTimeout(() => {
      closeModal(modal)
    }, 1000)
  } else {
    // Adiciona um event listener ao botão "Fechar"
    const closeButton = modal.querySelector('#close-modal-button')
    closeButton.addEventListener('click', () => closeModal(modal))
  }
}

// Função para fechar o modal
function closeModal(modal) {
  if (modal) {
    modal.classList.remove('show')
    setTimeout(() => {
      modal.remove()
    }, 300) // Tempo para a animação de fadeOut
  }
}

document.getElementById('result-percent').addEventListener('click', event => {
  event.preventDefault()
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
