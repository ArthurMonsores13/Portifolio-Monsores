document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll blur ──────────────────────────────────
  const header = document.querySelector('.site-header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateHeader(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  updateHeader();

  // ── Close mobile menu on nav link click ────────────────
  const navLinks       = document.querySelectorAll('a.nav-lnk');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse?.classList.contains('show')) {
        window.bootstrap?.Collapse?.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  // ── IntersectionObserver — scroll reveal ───────────────
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('visible');
        observer.unobserve(el);
        // release GPU hint after animation completes
        setTimeout(() => { el.style.willChange = 'auto'; }, 700 + delay * 1000);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  reveals.forEach(el => observer.observe(el));

});
