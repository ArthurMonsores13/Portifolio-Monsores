const header = document.querySelector(".sticky-top");

// Variáveis de controle de rolagem
let scrollPosition = window.scrollY;
let targetScroll = window.scrollY;
const ease = 0.15; // Ajustado para maior fluidez
let isScrolling = false;

// Função de throttle para limitar chamadas
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Verifica a posição do scroll para o cabeçalho
function checkScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Função de rolagem suave
function smoothScroll() {
  const distance = targetScroll - scrollPosition;
  // Para a animação se a distância for muito pequena
  if (Math.abs(distance) < 1) {
    scrollPosition = targetScroll;
    window.scrollTo({ top: scrollPosition, behavior: "instant" });
    isScrolling = false;
    return;
  }
  scrollPosition += distance * ease;
  window.scrollTo({ top: scrollPosition, behavior: "instant" });
  requestAnimationFrame(smoothScroll);
}

// Evento de scroll com throttle
window.addEventListener("scroll", throttle(checkScroll, 100));

// Evento de roda do mouse
window.addEventListener(
  "wheel",
  (e) => {
    targetScroll += e.deltaY * 2; // Ajustado para maior responsividade
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  },
  { passive: true } // Removido preventDefault para fluidez
);

// Suporte a eventos de toque
let lastTouchY = 0;
window.addEventListener(
  "touchmove",
  (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = (lastTouchY - touchY) * 2; // Simula deltaY do wheel
    lastTouchY = touchY;
    targetScroll += deltaY;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  },
  { passive: true }
);

window.addEventListener("touchstart", (e) => {
  lastTouchY = e.touches[0].clientY;
});

// Navegação suave para links de âncora
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        targetScroll = target.getBoundingClientRect().top + window.scrollY;
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(smoothScroll);
        }
      }

      // Fecha o menu do Bootstrap, se aplicável
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse?.classList.contains("show")) {
        const bsCollapse =
          window.bootstrap?.Collapse?.getInstance(navbarCollapse);
        bsCollapse?.hide();
      }
    }
  });
});

// Inicialização no carregamento da página
window.addEventListener("load", () => {
  scrollPosition = window.scrollY;
  targetScroll = window.scrollY;
  checkScroll();
});

// Monitoramento de desempenho
const start = performance.now();
requestAnimationFrame(() => {
  const end = performance.now();
  console.log(`Primeiro frame de rolagem levou ${end - start}ms`);
});
