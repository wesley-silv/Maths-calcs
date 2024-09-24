// Função para abrir e fechar a navbar
function toggleNavbar() {
  const nav = document.querySelector('nav')
  nav.classList.toggle('nav-open')
}

// Verifica se a largura da tela mudou para maior que 768px e reseta o estado do menu
window.addEventListener('resize', function () {
  const nav = document.querySelector('nav')
  if (window.innerWidth >= 768) {
    nav.classList.remove('nav-open')
  }
})
