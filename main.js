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
