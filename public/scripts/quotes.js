document.addEventListener('DOMContentLoaded', () => {
  const quotesDiv = document.getElementById('quotes') // Corrigido o ID para "quotes"

  async function fetchQuotes() {
    try {
      const response = await fetch('/api/cotacoes') // Endpoint da API para cotações
      const data = await response.json()

      // Verifica se a estrutura de dados está correta
      if (!Array.isArray(data) || data.length === 0) {
        quotesDiv.innerHTML = '<p>Não foram encontradas cotações.</p>'
        return
      }

      // Mapeia os dados para criar cards
      quotesDiv.innerHTML = data
        .map(
          cotacao => `
              <div class="cotacao-card">
                  <h2>${cotacao.nome}</h2>
                  <p>Preço Atual: R$ ${cotacao.preco}</p>
                  <p>Variação: ${cotacao.variacao}%</p>
              </div>
          `
        )
        .join('')
    } catch (error) {
      quotesDiv.innerHTML = '<p>Erro ao carregar as cotações.</p>'
      console.error('Erro ao buscar cotações:', error)
    }
  }

  fetchQuotes()
})
