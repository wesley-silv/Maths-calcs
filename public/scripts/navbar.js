function toggleNavbar(event) {
  event.stopPropagation() // Impede a propagação do evento para o documento
  const nav = document.querySelector('nav')
  const isOpen = nav.classList.toggle('nav-open')
  document
    .querySelector('.navbar-toggler')
    .setAttribute('aria-expanded', isOpen)
}

// Fechar a navbar ao clicar fora
document.addEventListener('click', event => {
  const nav = document.querySelector('nav')
  const isClickInside = nav.contains(event.target)
  if (!isClickInside) {
    nav.classList.remove('nav-open')
    document
      .querySelector('.navbar-toggler')
      .setAttribute('aria-expanded', 'false')
  }
})

// Fechar a navbar ao redimensionar a janela
window.addEventListener('resize', () => {
  const nav = document.querySelector('nav')
  if (window.innerWidth >= 768) {
    nav.classList.remove('nav-open')
    document
      .querySelector('.navbar-toggler')
      .setAttribute('aria-expanded', 'false')
  }
})
