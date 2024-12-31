let realizedOperations = []

function getCurrentDate() {
  const data = new Date()
  return data.toLocaleString()
}

function registerOperation(
  description,
  value,
  quantity,
  result,
  ticker = 'N/A'
) {
  const currentDate = getCurrentDate()
  const operation = `${currentDate} ${description}: Ativo = ${ticker}, Valor = ${value}, Quantidade = ${quantity}, Resultado = ${result}`
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

// Variáveis para armazenar o acumulado de valores e quantidades
let totalValue = 0
let totalQuantity = 0

const consValue = document
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
      'media-show'
    ).innerText = `Preço médio: R$ ${mean.toFixed(2)}`
    document.getElementById(
      'cost-value-all'
    ).innerText = `Quantidade total: ${totalQuantity.toFixed(0)}`

    registerOperation(
      'Preço médio de custo',
      value,
      quantity,
      mean.toFixed(2),
      ticker
    )

    document.getElementById('values').value = ''
    document.getElementById('quantities').value = ''
    document.getElementById('ticker').value = ''
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

const imcCalc = document
  .getElementById('result-imc')
  .addEventListener('click', function () {
    const mass = parseFloat(document.getElementById('mass').value)
    const height = parseFloat(document.getElementById('height').value)

    if (isNaN(mass) || isNaN(height)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const imc = mass / Math.pow(height, 2)
    document.getElementById('imc-show').innerText = `IMC: ${imc.toFixed(2)}`

    registerOperation('IMC', mass, height, imc.toFixed(2))
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

const triangleCalc = document
  .getElementById('result-triangle')
  .addEventListener('click', function () {
    const base = parseFloat(document.getElementById('base-triangle').value)
    const height = parseFloat(document.getElementById('height-triangle').value)

    if (isNaN(base) || isNaN(height)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const area = (base * height) / 2
    document.getElementById('show').innerText = `Área: ${area.toFixed(2)}`

    registerOperation('Área do Triângulo', base, height, area.toFixed(2))
  })

const circleCalc = document
  .getElementById('result-circle')
  .addEventListener('click', function () {
    const pi = parseFloat(document.getElementById('pi-circle').value)
    const radius = parseFloat(document.getElementById('ray-circle').value)

    if (isNaN(pi) || isNaN(radius)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const area = pi * Math.pow(radius, 2)
    document.getElementById('circle-show').innerText = `Área: ${area.toFixed(
      2
    )}`

    registerOperation('Área do Círculo', pi, radius, area.toFixed(2))
  })

const squareCalc = document
  .getElementById('result-square')
  .addEventListener('click', function () {
    const base = parseFloat(document.getElementById('base-square').value)

    if (isNaN(base)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const area = Math.pow(base, 2)
    document.getElementById('square-show').innerText = `Área: ${area.toFixed(
      2
    )}`

    registerOperation('Área do Quadrado', base, base, area.toFixed(2))
  })

// Analysis

const analysis = document
  .getElementById('analysis')
  .addEventListener('click', function () {
    const ticker = parseFloat(document.getElementById('ticker').value)
    const unitValue = parseFloat(document.getElementById('unit-value').value)
    const quanty = parseFloat(document.getElementById('quanty').value)

    if (isNaN(ticker) || isNaN(unitValue) || isNaN(quanty)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const analysis = (amount * (margin / 100)) / units
    document.getElementById(
      'analysis-show'
    ).innerText = `Margem de risco: R$ ${analysis.toFixed(2)}`
    document.getElementById('risk-analysis-total').innerText = `Perda: R$ ${(
      analysis * units
    ).toFixed(2)}`

    registerOperation(
      'Margem de Risco',
      amount,
      margin,
      `R$ ${analysis.toFixed(2)}`
    )
  })
