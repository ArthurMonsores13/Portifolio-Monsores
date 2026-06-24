document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Header scroll blur ──────────────────────────────────
  const header = document.querySelector('.site-header');

  // ── Hero parallax target (bg has its own keyframe anim — leave it) ──
  const heroPhoto = document.querySelector('.hero-photo-wrap');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);

    if (!reduceMotion && heroPhoto && y < window.innerHeight) {
      heroPhoto.style.transform = `translateY(${y * 0.07}px)`;
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  onScroll();

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
        // promote to GPU layer right before animating
        el.style.willChange = 'opacity, transform';
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('visible');
        observer.unobserve(el);
        // release GPU hint after animation completes
        setTimeout(() => { el.style.willChange = 'auto'; }, 750 + delay * 1000);
      });
    },
    // positive rootMargin triggers elements 60px BEFORE they enter viewport
    { threshold: 0.05, rootMargin: '0px 0px 60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));

  // ── Scrollspy — highlight active nav link ──────────────
  const linkByHash = new Map();
  navLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash?.startsWith('#')) linkByHash.set(hash.slice(1), link);
  });

  const spyTargets = [...linkByHash.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    linkByHash.forEach((link, key) =>
      link.classList.toggle('active', key === id)
    );
  }

  const spy = new IntersectionObserver(
    (entries) => {
      // pick the most visible intersecting section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
  );

  spyTargets.forEach(el => spy.observe(el));

  // ── 3D tilt on project cards (pointer, rAF-throttled) ──
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    const MAX = 6; // deg
    document.querySelectorAll('.proj-card').forEach(card => {
      let raf = null, mx = 0, my = 0;

      card.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const r = card.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width  - 0.5;
        my = (e.clientY - r.top)  / r.height - 0.5;
        card.classList.add('tilting');
        if (!raf) raf = requestAnimationFrame(() => {
          card.style.transform =
            `perspective(900px) rotateX(${(-my * MAX).toFixed(2)}deg) ` +
            `rotateY(${(mx * MAX).toFixed(2)}deg) translateY(-8px) scale(1.012)`;
          raf = null;
        });
      });

      card.addEventListener('pointerleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        card.classList.remove('tilting');
        card.style.transform = '';
      });
    });

    // ── Magnetic pull on hero buttons ──
    document.querySelectorAll('.hero-actions a').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${(y - 3).toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

});
