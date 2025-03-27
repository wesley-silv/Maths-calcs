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

// Função para exibir um modal personalizado
export function showModal(title, message, type) {
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
