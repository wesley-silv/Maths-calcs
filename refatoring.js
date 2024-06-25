document
  .getElementById('result-triangle')
  .addEventListener('click', function () {
    const base = parseFloat(document.getElementById('base-triangle').value)
    const height = parseFloat(document.getElementById('height-triangle').value)
    const area = (base * height) / 2
    document.getElementById('show').innerText = `Área: ${area}`
  })

document.getElementById('result-circle').addEventListener('click', function () {
  const pi = parseFloat(document.getElementById('pi-circle').value)
  const radius = parseFloat(document.getElementById('ray-circle').value)
  const area = pi * Math.pow(radius, 2)
  document.getElementById('circle-show').innerText = `Área: ${area}`
})

document.getElementById('result-square').addEventListener('click', function () {
  const base = parseFloat(document.getElementById('base-square').value)
  const area = Math.pow(base, 2)
  document.getElementById('square-show').innerText = `Área: ${area}`
})

document.getElementById('result-media').addEventListener('click', function () {
  const values = parseFloat(document.getElementById('values').value)
  const quantities = parseFloat(document.getElementById('quantities').value)
  const mean = values / quantities
  document.getElementById('media-show').innerText = `Média: ${mean}`
})

document.getElementById('result-imc').addEventListener('click', function () {
  const mass = parseFloat(document.getElementById('mass').value)
  const height = parseFloat(document.getElementById('height').value)
  const imc = mass / Math.pow(height, 2)
  document.getElementById('imc-show').innerText = `IMC: ${imc}`
})

document
  .getElementById('result-percent')
  .addEventListener('click', function () {
    const value = parseFloat(document.getElementById('value').value)
    const percentValue = parseFloat(document.getElementById('percent').value)

    if (isNaN(value) || isNaN(percentValue)) {
      alert('Por favor, insira valores numéricos válidos.')
      return
    }
    const percent = (value / 100) * percentValue
    document.getElementById(
      'percent-show'
    ).innerText = `Porcentagem: ${percent}`
  })
