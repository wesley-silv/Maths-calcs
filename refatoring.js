// Variável para armazenar as operações realizadas
let operacoesRealizadas = []

// Função para obter a data atual formatada
function obterDataAtual() {
  const data = new Date()
  return data.toLocaleString() // Formato de data e hora local
}

// Função para registrar uma operação
function registrarOperacao(descricao, resultado) {
  const dataAtual = obterDataAtual()
  const operacao = `${dataAtual}: ${descricao} = ${resultado}`
  operacoesRealizadas.push(operacao)
}

// Função para gerar o arquivo .txt e permitir download
document.getElementById('download-txt').addEventListener('click', function () {
  if (operacoesRealizadas.length > 0) {
    const blob = new Blob([operacoesRealizadas.join('\n')], {
      type: 'text/plain'
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'operacoes_realizadas.txt'
    link.click()
  } else {
    alert('Nenhuma operação realizada ainda.')
  }
})

// Função para calcular e mostrar a média aritmética
document.getElementById('result-media').addEventListener('click', function () {
  const values = parseFloat(document.getElementById('values').value)
  const quantities = parseFloat(document.getElementById('quantities').value)

  if (isNaN(values) || isNaN(quantities)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const mean = values / quantities
  document.getElementById('media-show').innerText = `Média: ${mean.toFixed(2)}`

  // Registra a operação
  registrarOperacao('Média Aritmética', mean.toFixed(2))
})

// Função para calcular a porcentagem
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

    // Registra a operação
    registrarOperacao('Porcentagem', percent.toFixed(2))
  })

// Função para calcular a relação percentual
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

    // Registra a operação
    registrarOperacao('Relação Percentual', `${percent.toFixed(2)}%`)
  })

// Função para calcular o IMC
document.getElementById('result-imc').addEventListener('click', function () {
  const mass = parseFloat(document.getElementById('mass').value)
  const height = parseFloat(document.getElementById('height').value)

  if (isNaN(mass) || isNaN(height)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const imc = mass / Math.pow(height, 2)
  document.getElementById('imc-show').innerText = `IMC: ${imc.toFixed(2)}`

  // Registra a operação
  registrarOperacao('IMC', imc.toFixed(2))
})

// Função para calcular a margem de risco
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

    // Registra a operação
    registrarOperacao('Margem de Risco', `R$ ${riskMargin.toFixed(2)}`)
  })

// Função para calcular a área do triângulo
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

    // Registra a operação
    registrarOperacao('Área do Triângulo', area.toFixed(2))
  })

// Função para calcular a área do círculo
document.getElementById('result-circle').addEventListener('click', function () {
  const pi = parseFloat(document.getElementById('pi-circle').value)
  const radius = parseFloat(document.getElementById('ray-circle').value)

  if (isNaN(pi) || isNaN(radius)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const area = pi * Math.pow(radius, 2)
  document.getElementById('circle-show').innerText = `Área: ${area}`

  // Registra a operação
  registrarOperacao('Área do Círculo', area.toFixed(2))
})

// Função para calcular a área do quadrado
document.getElementById('result-square').addEventListener('click', function () {
  const base = parseFloat(document.getElementById('base-square').value)

  if (isNaN(base)) {
    alert('Insira valores numéricos válidos!')
    return
  }

  const area = Math.pow(base, 2)
  document.getElementById('square-show').innerText = `Área: ${area}`

  // Registra a operação
  registrarOperacao('Área do Quadrado', area.toFixed(2))
})
