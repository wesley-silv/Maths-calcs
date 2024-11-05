const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: 0
  })
)

const livereload = require('livereload')
const connectLivereload = require('connect-livereload')

app.use(connectLivereload())

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(path.join(__dirname, 'public'))

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/')
  }, 100)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api/cotacoes', async (req, res) => {
  const { ticker, token } = req.query

  if (!ticker || !token) {
    return res.status(400).json({ message: 'Ticker e token são obrigatórios' })
  }

  try {
    const fetch = await import('node-fetch')
    const response = await fetch.default(
      `https://brapi.dev/api/quote/${ticker}?detail=true`,
      {
        headers: {
          Authorization: token
        }
      }
    )

    const data = await response.json()

    if (data.results && Array.isArray(data.results)) {
      const cotacoes = data.results.map(cotacao => ({
        nome: cotacao.symbol || 'N/A',
        preco: cotacao.regularMarketPrice || 'N/A',
        variacao: cotacao.regularMarketChangePercent || 'N/A',
        abertura: cotacao.regularMarketOpen || 'N/A',
        fechamento: cotacao.regularMarketPreviousClose || 'N/A',
        volume: cotacao.regularMarketVolume || 'N/A'
      }))

      res.json(cotacoes)
    } else {
      console.error('Estrutura de dados inesperada:', data)
      res.status(500).json({
        message: 'Erro ao processar as cotações: estrutura de dados inesperada'
      })
    }
  } catch (error) {
    console.error('Erro ao obter as cotações:', error)
    res.status(500).json({ message: 'Erro ao obter as cotações' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`)
})
