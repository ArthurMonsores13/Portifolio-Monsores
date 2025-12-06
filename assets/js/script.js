document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".sticky-top");


  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function checkHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Adiciona o listener com throttle
  window.addEventListener("scroll", throttle(checkHeaderScroll, 100));
  checkHeaderScroll();


  // 2. Lógica para fechar o menu mobile ao clicar em um link
  const navLinks = document.querySelectorAll("a.nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse?.classList.contains("show")) {
        const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
        bsCollapse?.hide();
      }
    });
  });
});