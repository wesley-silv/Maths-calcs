let realizedOperations = []

function getCurrentDate() {
  const data = new Date()
  return data.toLocaleString()
}

function registerOperation(description, value, quantity, result) {
  const currentDate = getCurrentDate()
  const operation = `${currentDate} ${description}: Valor = ${value}, Quantidade = ${quantity}, Resultado = ${result}`
  realizedOperations.push(operation)
}

// Função para realizar download conforme o formato selecionado
document
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

// Função de download TXT
function downloadTXT() {
  const blob = new Blob([realizedOperations.join('\n')], {
    type: 'text/plain'
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'Operations-file.txt'
  link.click()
}

// Função de download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  realizedOperations.forEach((operation, index) => {
    doc.text(operation, 10, 10 + index * 10)
  })

  doc.save('Operations-file.pdf')
}

// Função de download XLSX
function downloadXLSX() {
  const ws = XLSX.utils.aoa_to_sheet(
    realizedOperations.map(operation => [operation])
  )
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Operations')
  XLSX.writeFile(wb, 'Operations-file.xlsx')
}

document.getElementById('result-media').addEventListener('click', function () {
  const values = parseFloat(document.getElementById('values').value)
  const quantities = parseFloat(document.getElementById('quantities').value)

  if (isNaN(values) || isNaN(quantities)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const mean = values / quantities
  document.getElementById('media-show').innerText = `Média: ${mean.toFixed(2)}`

  registerOperation('Média Aritmética', values, quantities, mean.toFixed(2))
})

document
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

document
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

document.getElementById('result-imc').addEventListener('click', function () {
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

document
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

document
  .getElementById('result-triangle')
  .addEventListener('click', function () {
    const base = parseFloat(document.getElementById('base-triangle').value)
    const height = parseFloat(document.getElementById('height-triangle').value)

    if (isNaN(base) || isNaN(height)) {
      alert('Insira valores numéricos válidos!')
      return
    }

    const area = (base * height) / 2
    document.getElementById('show').innerText = `Área: ${area}`

    registerOperation('Área do Triângulo', base, height, area.toFixed(2))
  })

document.getElementById('result-circle').addEventListener('click', function () {
  const pi = parseFloat(document.getElementById('pi-circle').value)
  const radius = parseFloat(document.getElementById('ray-circle').value)

  if (isNaN(pi) || isNaN(radius)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const area = pi * Math.pow(radius, 2)
  document.getElementById('circle-show').innerText = `Área: ${area}`

  registerOperation('Área do Círculo', pi, radius, area.toFixed(2))
})

document.getElementById('result-square').addEventListener('click', function () {
  const base = parseFloat(document.getElementById('base-square').value)

  if (isNaN(base)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const area = Math.pow(base, 2)
  document.getElementById('square-show').innerText = `Área: ${area}`

  registerOperation('Área do Quadrado', base, base, area.toFixed(2))
})
