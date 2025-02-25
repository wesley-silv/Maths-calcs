let realizedOperations = []

function getCurrentDate() {
  const data = new Date()
  return data.toLocaleString()
}

function registerOperation(description, value, quantity, result, ticker) {
  const currentDate = getCurrentDate()
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
  const formattedResult = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(result)

  const operation = `
  Data da consulta:  ${currentDate}    Descrição:  ${description}
  Código do ativo:    ${ticker.toUpperCase()}                           Valor:       ${formattedValue}
  Quantidade:          ${quantity}                               Resultado:   ${formattedResult}
  `

  realizedOperations.push(operation)
}

// Referência ao campo de seleção
const downloadOptions = document.getElementById('download-options')

// Evento que dispara automaticamente ao mudar a seleção
downloadOptions.addEventListener('change', function () {
  const selectedOption = downloadOptions.value

  if (!selectedOption) {
    alert('Selecione um formato válido para o download!')
    return
  }

  if (realizedOperations.length === 0) {
    alert(
      'Nenhuma operação realizada! \nRealize operações para obter os registros.'
    )
    return
  }

  // Chama a função correspondente ao formato selecionado
  switch (selectedOption) {
    case 'pdf':
      console.log('Iniciando download em PDF...')
      downloadPDF()
      break
    case 'xlsx':
      console.log('Iniciando download em Excel...')
      downloadXLSX()
      break
    default:
      alert('Formato inválido selecionado!') // Apenas por segurança
  }

  // Reseta o valor do select para o estado inicial
  downloadOptions.value = ''
})

// Função simulada para baixar em PDF
function downloadPDF() {
  alert('Arquivo PDF baixado com sucesso!')
  // Implemente a lógica real para download em PDF aqui
}

// Função simulada para baixar em Excel
function downloadXLSX() {
  alert('Arquivo Excel baixado com sucesso!')
  // Implemente a lógica real para download em Excel aqui
}

function downloadPDF() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF('portrait', 'mm', 'a4') // Retrato (vertical) no formato A4

  const margin = 16 // Margem de 20mm (superior, inferior, esquerda e direita)
  const lineHeight = 10 // Altura entre linhas (em mm)
  const pageHeight = doc.internal.pageSize.height // Altura total da página
  const pageWidth = doc.internal.pageSize.width // Largura total da página
  const contentWidth = pageWidth - 2 * margin // Largura utilizável para o texto
  let cursorY = margin // Posição Y inicial (com margem superior)

  // Adiciona um título centralizado na página
  doc.setFontSize(14) // Define o tamanho da fonte
  const title = 'Relatório de Operações - MathsCalcs'
  const titleWidth = doc.getTextWidth(title) // Largura do texto
  doc.text(title, (pageWidth - titleWidth) / 2, cursorY)
  cursorY += 15 // Adiciona espaçamento após o título

  // Ajusta o conteúdo das operações
  doc.setFontSize(12) // Redefine o tamanho da fonte para o conteúdo
  realizedOperations.forEach(operation => {
    // Divide o texto em linhas que cabem na largura do conteúdo
    const lines = doc.splitTextToSize(operation, contentWidth)

    // Verifica se a próxima linha vai ultrapassar a altura da página
    if (cursorY + lines.length * lineHeight > pageHeight - margin) {
      doc.addPage() // Adiciona uma nova página se necessário
      cursorY = margin // Reseta o cursorY para o topo da nova página

      // Adiciona um cabeçalho na nova página
      doc.setFontSize(14)
      doc.text(title, (pageWidth - titleWidth) / 2, cursorY)
      cursorY += 15 // Espaçamento após o cabeçalho
      doc.setFontSize(12) // Volta para o tamanho padrão do conteúdo
    }

    // Adiciona o texto linha por linha
    lines.forEach(line => {
      doc.text(line, margin, cursorY)
      cursorY += lineHeight // Move o cursor para a próxima linha
    })
  })

  // Salva o arquivo PDF
  doc.save('Operações-MathsCalcs.pdf')
}

function downloadXLSX() {
  const ws = XLSX.utils.aoa_to_sheet(
    realizedOperations.map(operation => [operation])
  )
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Operations')
  XLSX.writeFile(wb, 'Operações-MathsCalcs.xlsx')
}

let totalValue = 0
let totalQuantity = 0

const costValue = document
  .getElementById('result-cost-value')
  .addEventListener('click', function () {
    const ticker = document.getElementById('ticker').value.trim()
    const value = parseFloat(document.getElementById('values').value)
    const quantity = parseFloat(document.getElementById('quantities').value)

    if (!ticker || isNaN(value) || isNaN(quantity) || quantity <= 0) {
      alert('Insira um código de ativo e valores válidos!')
      return
    }

    totalValue += value * quantity
    totalQuantity += quantity
    const mean = totalValue / totalQuantity

    document.getElementById(
      'cost-value-show'
    ).innerText = `Preço Médio: R$ ${mean.toFixed(2)}`
    document.getElementById(
      'cost-value-all'
    ).innerText = `Quantidade Total: ${totalQuantity.toFixed(0)}`

    registerOperation(
      'Preço médio de custo',
      value,
      quantity,
      mean.toFixed(2),
      ticker
    )

    document.getElementById('values').value = ''
    document.getElementById('quantities').value = ''
  })

const percentCalc = document
  .getElementById('result-percent')
  .addEventListener('click', function () {
    const value = parseFloat(document.getElementById('value').value)
    const percentValue = parseFloat(document.getElementById('percent').value)

    if (isNaN(value) || isNaN(percentValue)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const percent = (value / 100) * percentValue
    document.getElementById(
      'percent-show'
    ).innerText = `Porcentagem: ${percent.toFixed(2)}`

    registerOperation('Porcentagem', value, percentValue, percent.toFixed(2))
  })

const percentRatioCalc = document
  .getElementById('result-percent-ratio')
  .addEventListener('click', function () {
    const valueRatio = parseFloat(document.getElementById('value-ratio').value)
    const percentRatio = parseFloat(
      document.getElementById('percent-ratio').value
    )

    if (isNaN(valueRatio) || isNaN(percentRatio)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const percent = (percentRatio / valueRatio) * 100
    document.getElementById(
      'percent-ratio-show'
    ).innerText = `Relação Percentual: ${percent.toFixed(2)}%`

    registerOperation(
      'Relação Percentual',
      valueRatio,
      percentRatio,
      `${percent.toFixed(2)}%`
    )
  })

const riskAnalysisCalc = document
  .getElementById('result-risk-analysis')
  .addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('amount').value)
    const margin = parseFloat(document.getElementById('margin').value)
    const units = parseFloat(document.getElementById('units').value)

    if (isNaN(amount) || isNaN(margin) || isNaN(units)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const riskMargin = (amount * (margin / 100)) / units
    document.getElementById(
      'risk-analysis-show'
    ).innerText = `Margem de Risco: R$ ${riskMargin.toFixed(2)}`
    document.getElementById('risk-analysis-total').innerText = `Prejuízo: R$ ${(
      riskMargin * units
    ).toFixed(2)}`

    registerOperation(
      'Margem de Risco',
      amount,
      margin,
      `R$ ${riskMargin.toFixed(2)}`
    )
  })

const fundProjection = document
  .getElementById('calculate-projection')
  .addEventListener('click', function () {
    const quotaValue = parseFloat(document.getElementById('quota-value').value)
    const monthlyIncome = parseFloat(
      document.getElementById('monthly-income').value
    )
    const quantityQuota = parseInt(
      document.getElementById('quantity-quota').value
    )

    if (!isNaN(quotaValue) && !isNaN(monthlyIncome) && !isNaN(quantityQuota)) {
      const totalInvestment = quotaValue * quantityQuota
      const totalMonthlyEarnings = monthlyIncome * quantityQuota

      document.getElementById(
        'total-investment'
      ).textContent = `Investimento Total: R$ ${totalInvestment.toFixed(2)}`
      document.getElementById(
        'monthly-earnings'
      ).textContent = `Rendimento Mensal: R$ ${totalMonthlyEarnings.toFixed(2)}`
    } else {
      alert('Por favor, preencha todos os campos com valores válidos.')
    }
  })

  // Cálculo do Preço Teto (Décio Bazin)
document
.getElementById('calculate-bazin')
.addEventListener('click', function () {
  const dividendYield = parseFloat(
    document.getElementById('dividend-yield').value
  )
  const averageDividend = parseFloat(
    document.getElementById('average-dividend').value
  )

  if (isNaN(dividendYield) || isNaN(averageDividend)) {
    alert('Por favor, insira valores válidos.')
    return
  }

  // Fórmula de Décio Bazin: Preço Teto = (Média de Dividendos * 100) / Dividend Yield
  const bazinPrice = ((averageDividend * 100) / dividendYield).toFixed(2)

  document.getElementById(
    'bazin-price-show'
  ).innerText = `Preço Teto: R$ ${bazinPrice}`

  // Registrar a operação
  registerOperation(
    'Preço Teto (Décio Bazin)',
    averageDividend,
    dividendYield,
    bazinPrice
  )
})

// Cálculo do Preço Teto (Benjamin Graham)
document
.getElementById('calculate-graham')
.addEventListener('click', function () {
  const earningsPerShare = parseFloat(
    document.getElementById('earnings-per-share').value
  )
  const bookValuePerShare = parseFloat(
    document.getElementById('book-value-per-share').value
  )

  if (isNaN(earningsPerShare) || isNaN(bookValuePerShare)) {
    alert('Por favor, insira valores válidos.')
    return
  }

  // Fórmula de Benjamin Graham: Preço Teto = √(22.5 * LPA * VPA)
  const grahamPrice = Math.sqrt(22.5 * earningsPerShare * bookValuePerShare).toFixed(
    2
  )

  document.getElementById(
    'graham-price-show'
  ).innerText = `Preço Teto: R$ ${grahamPrice}`

  // Registrar a operação
  registerOperation(
    'Preço Teto (Benjamin Graham)',
    earningsPerShare,
    bookValuePerShare,
    grahamPrice
  )
})