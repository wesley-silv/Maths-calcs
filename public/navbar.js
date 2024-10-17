function toggleNavbar() {
  const nav = document.querySelector('nav')
  nav.classList.toggle('nav-open')
}

window.addEventListener('resize', function () {
  const nav = document.querySelector('nav')
  if (window.innerWidth >= 768) {
    nav.classList.remove('nav-open')
  }
})
