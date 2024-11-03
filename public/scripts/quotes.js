document.addEventListener('DOMContentLoaded', () => {
  const quotesDiv = document.getElementById('quotes')
  const form = document.getElementById('cotacao-form')

  form.addEventListener('submit', async event => {
    event.preventDefault()
    const ticker = document.getElementById('ticker').value
    const token = document.getElementById('token').value
    fetchQuotes(ticker, token)
  })

  async function fetchQuotes(ticker = 'MXRF11', token = 'seuTokenAqui') {
    try {
      const response = await fetch(
        `/api/cotacoes?ticker=${ticker}&token=${token}`
      )
      const data = await response.json()

      // Limpa os cards existentes antes de adicionar novos
      quotesDiv.innerHTML = ''

      // Verifica se há dados válidos
      if (!Array.isArray(data) || data.length === 0) {
        quotesDiv.innerHTML = '<p>Não foram encontradas cotações.</p>'
        return
      }

      // Renderiza os cards respeitando o layout CSS
      data.forEach(cotacao => {
        const card = document.createElement('div')
        card.className = 'cotacao-card'
        card.innerHTML = `
          <h2>${cotacao.nome}</h2>
          <p>Preço Atual: R$ ${cotacao.preco}</p>
          <p>Variação: ${cotacao.variacao}%</p>
        `
        quotesDiv.appendChild(card)
      })
    } catch (error) {
      quotesDiv.innerHTML = '<p>Erro ao carregar as cotações.</p>'
      console.error('Erro ao buscar cotações:', error)
    }
  }
})
