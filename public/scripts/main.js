let realizedOperations = []

function getCurrentDate() {
  const data = new Date()
  return data.toLocaleString()
}

function registerOperation(description, value, quantity, result, ticker) {
  const currentDate = getCurrentDate()
  const operation = `${currentDate} ${description}: Ativo = ${ticker.toUpperCase()}, Valor = ${value}, Quantidade = ${quantity}, Resultado = ${result}`
  realizedOperations.push(operation)
}

const downloadOptions = document
  .getElementById('download-options')
  .addEventListener('change', function () {
    const selectedOption = this.value

    if (realizedOperations.length === 0) {
      alert(
        'Nenhuma operação realizada! \nRealize operações para obter os registros.'
      )
      return
    }

    switch (selectedOption) {
      case 'txt':
        downloadTXT()
        break
      case 'pdf':
        downloadPDF()
        break
      case 'xlsx':
        downloadXLSX()
        break
    }
  })

function downloadTXT() {
  const blob = new Blob([realizedOperations.join('\n')], {
    type: 'text/plain'
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'Operations-file.txt'
  link.click()
}

function downloadPDF() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF('landscape') // Muda para o formato paisagem (horizontal)

  const margin = 12 // Margem de 1em (aproximadamente 10-12px)
  const lineHeight = 10 // Altura entre linhas
  const pageHeight = doc.internal.pageSize.height // Altura total da página
  let cursorY = margin // Posição Y inicial (com margem superior)

  realizedOperations.forEach((operation, index) => {
    // Verifica se a próxima linha vai ultrapassar a altura da página
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage() // Adiciona uma nova página se necessário
      cursorY = margin // Reseta o cursorY para o topo da nova página
    }

    doc.text(operation, margin, cursorY) // Adiciona o texto com margem à esquerda
    cursorY += lineHeight // Move o cursor para a próxima linha
  })

  doc.save('Operations-file.pdf')
}

function downloadXLSX() {
  const ws = XLSX.utils.aoa_to_sheet(
    realizedOperations.map(operation => [operation])
  )
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Operations')
  XLSX.writeFile(wb, 'Operations-file.xlsx')
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
    ).innerText = `Preço médio: R$ ${mean.toFixed(2)}`
    document.getElementById(
      'cost-value-all'
    ).innerText = `Quantidade: ${totalQuantity.toFixed(0)}`

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
    ).innerText = `Relação percentual: ${percent.toFixed(2)}%`

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
    ).innerText = `Margem de risco: R$ ${riskMargin.toFixed(2)}`
    document.getElementById('risk-analysis-total').innerText = `Perda: R$ ${(
      riskMargin * units
    ).toFixed(2)}`

    registerOperation(
      'Margem de Risco',
      amount,
      margin,
      `R$ ${riskMargin.toFixed(2)}`
    )
  })
