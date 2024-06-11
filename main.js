let triagleArea = document.getElementById('result-triangle')
triagleArea.addEventListener('click', triangle)

function triangle() {
  let base = document.getElementById('base-triangle').value
  let height = document.getElementById('height-triangle').value
  let area = (base * height) / 2
  if (area <= 0) {
    let showArea = (document.getElementById(
      'show'
    ).innerHTML = `Preencha os campos para obter o valor da área em m²`)
  } else {
    let showArea = (document.getElementById(
      'show'
    ).innerHTML = `A área do triângulo é igual: ${area} m²`)
  }
}

let circleArea = document.getElementById('result-circle')
circleArea.addEventListener('click', circle)

function circle() {
  let pi = document.getElementById('pi-circle').value
  let ray = document.getElementById('ray-circle').value
  let area = pi * (ray * ray)
  if (area <= 0) {
    let showArea = (document.getElementById(
      'circle-show'
    ).innerHTML = `Preencha os campos para obter o valor da área em m²`)
  } else {
    let showArea = (document.getElementById(
      'circle-show'
    ).innerHTML = `A área do circule é igual: ${area} m²`)
  }
}

let squareArea = document.getElementById('result-square')
squareArea.addEventListener('click', square)

function square() {
  let base = document.getElementById('base-square').value
  let area = base * base
  if (area <= 0) {
    let showArea = (document.getElementById(
      'square-show'
    ).innerHTML = `Preencha os campos para obter o valor da área em m²`)
  } else {
    let showArea = (document.getElementById(
      'square-show'
    ).innerHTML = `A área do quadrado é igual: ${area} m²`)
  }
}

let mediaArea = document.getElementById('result-media')
mediaArea.addEventListener('click', media)

function media() {
  let totalValues = document.getElementById('values').value
  let quantities = document.getElementById('quantities').value
  let media = totalValues / quantities
  if (media <= 0) {
    let showArea = (document.getElementById(
      'media-show'
    ).innerHTML = `Preencha os campos para obter o valor da média`)
  } else {
    let showArea = (document.getElementById(
      'media-show'
    ).innerHTML = `O valor da Média é igual: ${media}`)
  }
}

let imcArea = document.getElementById('result-imc')
imcArea.addEventListener('click', imc)

function imc() {
  let mass = document.getElementById('mass').value
  let height = document.getElementById('height').value
  let imc = mass / (height * height)
  if (imc <= 0) {
    let showArea = (document.getElementById(
      'imc-show'
    ).innerHTML = `Preencha os campos para obter o valor do índice de massa corporal`)
  } else {
    let showArea = (document.getElementById(
      'imc-show'
    ).innerHTML = `O valor do IMC é igual: ${parseInt(imc)}`)
  }
}
