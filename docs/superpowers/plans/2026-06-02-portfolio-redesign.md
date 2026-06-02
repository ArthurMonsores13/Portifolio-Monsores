# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Arthur Monsores' portfolio with dark premium aesthetics — glassmorphism, animated mesh gradient, Playfair Display typography, and IntersectionObserver scroll animations.

**Architecture:** Single-page HTML/CSS/JS. Full rewrite of all three files. No frameworks, no build tools. CSS custom properties for the design system. JS handles scroll header + IntersectionObserver for entrance animations.

**Tech Stack:** HTML5, CSS3 (custom properties, @keyframes, backdrop-filter), Vanilla JS (IntersectionObserver), Bootstrap 5.3.2, Bootstrap Icons, Google Fonts (Playfair Display + DM Sans)

**Spec:** `docs/superpowers/specs/2026-06-02-portfolio-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Full rewrite | Page structure, all sections |
| `assets/css/styles.css` | Full rewrite | Design system, layout, animations |
| `assets/js/script.js` | Full rewrite | Scroll header, IntersectionObserver |

> **Image note:** Several project images are missing from the repo (`calc.png`, `dash.png`, `image.png`, `foto_doc.jpeg`, `conversor.jpg`, `flappy.jpg`). In each project card, use `assets/images/code.jpg` as fallback for missing images.

---

### Task 1: CSS Foundation — Variables, Fonts, Reset, Body

**Files:**
- Modify: `assets/css/styles.css` (replace entire file)

- [ ] **Step 1: Write the CSS foundation**

Replace `assets/css/styles.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ─── Design System ─── */
:root {
  --bg-deep:       #020617;
  --bg-glass:      rgba(15, 23, 42, 0.6);
  --accent:        #38bdf8;
  --accent-glow:   rgba(56, 189, 248, 0.15);
  --accent-strong: rgba(56, 189, 248, 0.55);
  --text-primary:  #f1f5f9;
  --text-muted:    #94a3b8;
  --border:        rgba(56, 189, 248, 0.12);
  --border-hover:  rgba(56, 189, 248, 0.45);
  --radius:        14px;
  --transition:    0.25s ease;
}

/* ─── Reset ─── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  overflow-x: hidden;
  padding-top: 70px;
}

a { text-decoration: none; color: inherit; }

/* ─── Typography helpers ─── */
.display { font-family: 'Playfair Display', serif; }
```

- [ ] **Step 2: Open index.html in browser, verify page loads without errors**

Expected: page visible, no 404 on CSS file.

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "style: CSS design system foundation — variables, reset, fonts"
```

---

### Task 2: Header / Navbar

**Files:**
- Modify: `assets/css/styles.css` (append)
- Modify: `index.html` — header section

- [ ] **Step 1: Update navbar HTML in index.html**

Replace the `<header>` block:

```html
<header class="site-header sticky-top">
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand nav-brand" href="#sobre">Arthur Monsores</a>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto gap-1">
          <li class="nav-item"><a class="nav-link nav-lnk" href="#sobre">Sobre</a></li>
          <li class="nav-item"><a class="nav-link nav-lnk" href="#projetos">Projetos</a></li>
          <li class="nav-item"><a class="nav-link nav-lnk" href="#contato">Contato</a></li>
        </ul>
      </div>
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Append navbar CSS to styles.css**

```css
/* ─── Header ─── */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: box-shadow var(--transition), backdrop-filter var(--transition);
}

.navbar {
  background: rgba(2, 6, 23, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.site-header.scrolled .navbar {
  background: rgba(2, 6, 23, 0.92);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.3px;
  transition: opacity var(--transition);
}
.nav-brand:hover { opacity: 0.8; }

.nav-lnk {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: color var(--transition), background var(--transition);
}
.nav-lnk:hover {
  color: var(--text-primary);
  background: rgba(56, 189, 248, 0.08);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%2338bdf8' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
```

- [ ] **Step 3: Verify in browser — navbar visible, blurred, brand in Playfair Display**

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "style: glassmorphism navbar with Playfair Display brand"
```

---

### Task 3: Hero Section HTML

**Files:**
- Modify: `index.html` — replace `#sobre` section

- [ ] **Step 1: Replace the hero section in index.html**

Remove both old `<section id="sobre">` and `<section id="descricao">` blocks. Replace with:

```html
<!-- Hero -->
<section id="sobre" class="hero">
  <!-- Mesh gradient background -->
  <div class="hero-bg" aria-hidden="true"></div>

  <!-- Floating particles -->
  <div class="particles" aria-hidden="true">
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
    <span class="particle"></span><span class="particle"></span>
  </div>

  <div class="container hero-content">
    <div class="row align-items-center justify-content-between g-5">

      <!-- Text -->
      <div class="col-lg-6 hero-text">
        <p class="hero-eyebrow fade-up" style="--delay: 0s">Software Developer</p>
        <h1 class="hero-name display fade-up" style="--delay: 0.15s">Arthur<br>Monsores</h1>
        <div class="hero-divider fade-up" style="--delay: 0.3s"></div>
        <p class="hero-areas fade-up" style="--delay: 0.45s">
          AI Agents &nbsp;·&nbsp; Automação &nbsp;·&nbsp; Business Intelligence
        </p>
        <a href="#projetos" class="btn-cta fade-up" style="--delay: 0.6s">Ver Projetos ↓</a>
      </div>

      <!-- Photo -->
      <div class="col-lg-5 text-center fade-up" style="--delay: 0.3s">
        <div class="hero-photo-wrap">
          <img
            src="assets/images/foto.jpeg"
            alt="Arthur Monsores"
            class="hero-photo"
          />
        </div>
      </div>

    </div>
  </div>
</section>

<!-- About Me -->
<section id="sobre-mim" class="about-section">
  <div class="container">
    <div class="row align-items-center g-5">

      <div class="col-lg-6">
        <h2 class="section-title display">Sobre mim</h2>
        <p class="about-text">
          Sou Arthur Monsores, estudante de Engenharia de Software na Universidade de Vassouras.
          Apaixonado por tecnologia e construção de soluções que fazem diferença.
          Atualmente concentro meus estudos em agentes de IA, automações inteligentes e Business Intelligence —
          explorando como sistemas autônomos podem transformar fluxos de trabalho e gerar valor com dados.
        </p>
      </div>

      <div class="col-lg-6">
        <div class="areas-grid">
          <div class="area-card">
            <span class="area-icon">🤖</span>
            <div>
              <h3 class="area-title">AI Agents</h3>
              <p class="area-desc">Agentes autônomos, LLMs e sistemas inteligentes</p>
            </div>
          </div>
          <div class="area-card">
            <span class="area-icon">⚙️</span>
            <div>
              <h3 class="area-title">Automação</h3>
              <p class="area-desc">Pipelines, scripts e fluxos automatizados</p>
            </div>
          </div>
          <div class="area-card">
            <span class="area-icon">📊</span>
            <div>
              <h3 class="area-title">Business Intelligence</h3>
              <p class="area-desc">SQL, PostgreSQL, Power BI e análise de dados</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify HTML structure in browser — sections render (unstyled is OK)**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: hero + about me HTML structure"
```

---

### Task 4: Hero CSS — Layout, Gradient, Photo, Particles

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append hero CSS**

```css
/* ─── Hero ─── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Animated mesh gradient */
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 40%, rgba(14, 165, 233, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 50% 90%, rgba(15, 23, 42, 0.9) 0%, transparent 70%),
    var(--bg-deep);
  animation: meshShift 10s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes meshShift {
  0%   { filter: hue-rotate(0deg) brightness(1); }
  50%  { filter: hue-rotate(15deg) brightness(1.05); }
  100% { filter: hue-rotate(-10deg) brightness(0.97); }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: float var(--dur, 8s) var(--delay2, 0s) ease-in-out infinite;
}

/* Distribute particles */
.particle:nth-child(1)  { left: 8%;  top: 15%; --dur: 9s;  --delay2: 0s; }
.particle:nth-child(2)  { left: 20%; top: 70%; --dur: 11s; --delay2: 1s; }
.particle:nth-child(3)  { left: 35%; top: 30%; --dur: 8s;  --delay2: 2s; }
.particle:nth-child(4)  { left: 55%; top: 80%; --dur: 13s; --delay2: 0.5s; }
.particle:nth-child(5)  { left: 70%; top: 20%; --dur: 10s; --delay2: 1.5s; }
.particle:nth-child(6)  { left: 85%; top: 55%; --dur: 9s;  --delay2: 3s; }
.particle:nth-child(7)  { left: 12%; top: 85%; --dur: 12s; --delay2: 2.5s; }
.particle:nth-child(8)  { left: 45%; top: 10%; --dur: 7s;  --delay2: 1s; }
.particle:nth-child(9)  { left: 78%; top: 75%; --dur: 11s; --delay2: 4s; }
.particle:nth-child(10) { left: 92%; top: 30%; --dur: 8s;  --delay2: 0s; }
.particle:nth-child(11) { left: 5%;  top: 50%; --dur: 14s; --delay2: 2s; }
.particle:nth-child(12) { left: 60%; top: 45%; --dur: 9s;  --delay2: 1.5s; }
.particle:nth-child(13) { left: 30%; top: 90%; --dur: 10s; --delay2: 3s; }
.particle:nth-child(14) { left: 75%; top: 8%;  --dur: 12s; --delay2: 0.5s; }
.particle:nth-child(15) { left: 48%; top: 60%; --dur: 8s;  --delay2: 4s; }
.particle:nth-child(16) { left: 88%; top: 88%; --dur: 11s; --delay2: 2s; }
.particle:nth-child(17) { left: 22%; top: 40%; --dur: 9s;  --delay2: 1s; }
.particle:nth-child(18) { left: 65%; top: 65%; --dur: 13s; --delay2: 3.5s; }
.particle:nth-child(19) { left: 40%; top: 5%;  --dur: 7s;  --delay2: 0s; }
.particle:nth-child(20) { left: 15%; top: 25%; --dur: 10s; --delay2: 2.5s; }

@keyframes float {
  0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
  20%       { opacity: 0.4; }
  50%       { opacity: 0.15; transform: translateY(-30px) scale(1.5); }
  80%       { opacity: 0.3; }
}

/* Hero content above bg */
.hero-content { position: relative; z-index: 1; }

/* Text */
.hero-eyebrow {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.hero-name {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.hero-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, var(--accent), transparent);
  margin-bottom: 1.5rem;
}

.hero-areas {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  letter-spacing: 0.5px;
}

/* CTA Button */
.btn-cta {
  display: inline-block;
  padding: 0.8rem 2rem;
  border: 1.5px solid var(--accent);
  border-radius: 8px;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: background var(--transition), color var(--transition), box-shadow var(--transition);
}
.btn-cta:hover {
  background: var(--accent);
  color: var(--bg-deep);
  box-shadow: 0 0 24px var(--accent-strong);
}

/* Photo */
.hero-photo-wrap {
  position: relative;
  display: inline-block;
}

.hero-photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
  padding: 4px;
  background: var(--bg-deep);
  box-shadow: 0 0 0 0 var(--accent-strong);
  animation: ringPulse 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes ringPulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent-strong), 0 20px 60px rgba(0,0,0,0.8); }
  50%       { box-shadow: 0 0 0 12px rgba(56,189,248,0), 0 20px 60px rgba(0,0,0,0.8); }
}
```

- [ ] **Step 2: Verify in browser — hero shows gradient background, photo with pulsing ring, particles floating**

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "style: hero section — mesh gradient, particles, photo ring pulse"
```

---

### Task 5: Hero Entrance Animations + About Me CSS

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append fade-up animation + about section CSS**

```css
/* ─── Entrance animation ─── */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeUp 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Scroll-triggered reveal (JS adds .visible) ─── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── About Me ─── */
.about-section {
  padding: 6rem 1.5rem;
  background: linear-gradient(180deg, var(--bg-deep) 0%, #050a1a 100%);
  border-top: 1px solid var(--border);
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.about-text {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-muted);
}

/* Area cards */
.areas-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.area-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.area-card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 8px 32px var(--accent-glow);
  transform: translateX(4px);
}

.area-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 2px; }

.area-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.area-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}
```

- [ ] **Step 2: Verify in browser — hero text animates on load, about section glass cards visible**

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "style: fade-up entrance animation, about section glass cards"
```

---

### Task 6: Projects HTML — Both Sections

**Files:**
- Modify: `index.html` — replace `#projetos` and `#outros-projetos` sections

- [ ] **Step 1: Replace both project sections in index.html**

```html
<!-- Main Projects -->
<section id="projetos" class="projects-section">
  <div class="container">
    <h2 class="section-title display reveal">Projetos Principais</h2>
    <div class="projects-grid">

      <a href="https://github.com/ArthurMonsores13/Calculadora-em-CSharp"
         target="_blank" class="proj-card reveal" style="--delay: 0.05s">
        <div class="proj-img-wrap">
          <img src="assets/images/code.jpg" alt="Calculator C#" class="proj-img"/>
          <div class="proj-overlay">Student project built in C# focusing on logic and structure.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Calculator C#</span>
          <span class="proj-tag">C# · .NET</span>
        </div>
      </a>

      <a href="https://github.com/ArthurMonsores13/Dashboard_Investimentos"
         target="_blank" class="proj-card reveal" style="--delay: 0.1s">
        <div class="proj-img-wrap">
          <img src="assets/images/mesa.jpg" alt="Dashboard Investimentos" class="proj-img"/>
          <div class="proj-overlay">Investment dashboard on PostgreSQL analytical views consumed by Power BI.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Dashboard Investimentos</span>
          <span class="proj-tag">PostgreSQL · Power BI</span>
        </div>
      </a>

      <a href="https://github.com/ArthurMonsores13/Project-Flask-Festival"
         target="_blank" class="proj-card reveal" style="--delay: 0.15s">
        <div class="proj-img-wrap">
          <img src="assets/images/fun.jpg" alt="Flask Festival" class="proj-img"/>
          <div class="proj-overlay">Web app built with Flask showcasing routes, templates, and clean structure.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Flask Festival</span>
          <span class="proj-tag">Python · Flask</span>
        </div>
      </a>

      <a href="https://github.com/ArthurMonsores13/Documenta-o-SQL"
         target="_blank" class="proj-card reveal" style="--delay: 0.2s">
        <div class="proj-img-wrap">
          <img src="assets/images/s.jpg" alt="SQL Documentation" class="proj-img"/>
          <div class="proj-overlay">Complete study of SQL and PostgreSQL with practical examples.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">SQL Documentation</span>
          <span class="proj-tag">SQL · PostgreSQL</span>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- Other Projects -->
<section id="outros-projetos" class="projects-section projects-section--other">
  <div class="container">
    <h2 class="section-title display reveal">Outros Projetos</h2>
    <div class="projects-grid projects-grid--other">

      <a href="https://arthurmonsores13.github.io/SoloLeveling/"
         target="_blank" class="proj-card reveal" style="--delay: 0.05s">
        <div class="proj-img-wrap">
          <img src="assets/images/leveling.jpg" alt="Solo Leveling" class="proj-img"/>
          <div class="proj-overlay">Interactive anime-themed page with layout design and visual styling.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Solo Leveling</span>
          <span class="proj-tag">HTML · CSS · JS</span>
        </div>
      </a>

      <a href="https://arthurmonsores13.github.io/Site-Banda/"
         target="_blank" class="proj-card reveal" style="--delay: 0.1s">
        <div class="proj-img-wrap">
          <img src="assets/images/banda.jpg" alt="Arctic Monkeys" class="proj-img"/>
          <div class="proj-overlay">Responsive band website with albums, members, and clean UI.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Arctic Monkeys</span>
          <span class="proj-tag">HTML · CSS · JS</span>
        </div>
      </a>

      <a href="https://arthurmonsores13.github.io/Praticas-Extensionistas-Site/"
         target="_blank" class="proj-card reveal" style="--delay: 0.15s">
        <div class="proj-img-wrap">
          <img src="assets/images/clinic.jpg" alt="Medical Clinic" class="proj-img"/>
          <div class="proj-overlay">Informational website for a medical clinic with services and scheduling.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Medical Clinic</span>
          <span class="proj-tag">HTML · CSS · JS</span>
        </div>
      </a>

      <a href="https://arthurmonsores13.github.io/Conversor/"
         target="_blank" class="proj-card reveal" style="--delay: 0.2s">
        <div class="proj-img-wrap">
          <img src="assets/images/a.jpg" alt="Conversor" class="proj-img"/>
          <div class="proj-overlay">Simple and functional unit converter built with HTML, CSS, and JavaScript.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Conversor</span>
          <span class="proj-tag">HTML · CSS · JS</span>
        </div>
      </a>

      <a href="https://github.com/ArthurMonsores13/Flappy-Bird-Game-Java"
         target="_blank" class="proj-card reveal" style="--delay: 0.25s">
        <div class="proj-img-wrap">
          <img src="assets/images/funn.jpg" alt="Flappy Bird Java" class="proj-img"/>
          <div class="proj-overlay">Java-based game inspired by Flappy Bird with collision logic.</div>
        </div>
        <div class="proj-info">
          <span class="proj-title">Flappy Bird</span>
          <span class="proj-tag">Java</span>
        </div>
      </a>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify HTML renders both project sections with images and titles visible**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: projects HTML — both sections with always-visible titles and tags"
```

---

### Task 7: Projects CSS

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append projects CSS**

```css
/* ─── Projects ─── */
.projects-section {
  padding: 6rem 1.5rem;
  background: linear-gradient(180deg, #050a1a 0%, var(--bg-deep) 100%);
  border-top: 1px solid var(--border);
}
.projects-section--other {
  background: linear-gradient(180deg, var(--bg-deep) 0%, #050a1a 100%);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
}
.projects-grid--other {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

/* Project card */
.proj-card {
  display: block;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
  color: inherit;
}
.proj-card:hover {
  transform: translateY(-6px) scale(1.01);
  border-color: var(--border-hover);
  box-shadow: 0 16px 48px var(--accent-glow);
}

.proj-img-wrap {
  position: relative;
  overflow: hidden;
}
.proj-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.proj-card:hover .proj-img {
  transform: scale(1.05);
  opacity: 0.85;
}

/* Overlay description */
.proj-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(2,6,23,0.92) 40%, rgba(2,6,23,0.1) 100%);
  color: var(--text-primary);
  font-size: 0.875rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.proj-card:hover .proj-overlay { opacity: 1; }

/* Always-visible title + tag */
.proj-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.1rem;
  gap: 0.5rem;
}
.proj-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
}
.proj-tag {
  font-size: 0.75rem;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0.2rem 0.65rem;
  white-space: nowrap;
}
```

- [ ] **Step 2: Verify — project cards render in 3-column grid, titles and tags visible, hover shows overlay**

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "style: project cards — glass, hover overlay, always-visible title/tag"
```

---

### Task 8: Contact + Footer HTML and CSS

**Files:**
- Modify: `index.html` — replace `#contato` and `<footer>`
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Replace contact section and footer in index.html**

```html
<!-- Contact -->
<section id="contato" class="contact-section">
  <div class="container">
    <div class="contact-card reveal">
      <h2 class="section-title display">Vamos conversar?</h2>
      <p class="contact-sub">Disponível para oportunidades, colaborações e projetos.</p>
      <div class="social-row">
        <a href="https://www.instagram.com/monsoresarthur/?hl=en"
           target="_blank" class="social-btn" aria-label="Instagram" title="Instagram">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/arthur-monsores-5883061a1/"
           target="_blank" class="social-btn" aria-label="LinkedIn" title="LinkedIn">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com/ArthurMonsores13"
           target="_blank" class="social-btn" aria-label="GitHub" title="GitHub">
          <i class="bi bi-github"></i>
        </a>
        <a href="assets/css/curriculoAMs.pdf"
           target="_blank" class="social-btn" aria-label="Currículo" title="Currículo">
          <i class="bi bi-file-earmark-person"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="container">
    <p>&copy; 2026 Arthur Monsores</p>
  </div>
</footer>
```

- [ ] **Step 2: Append contact + footer CSS to styles.css**

```css
/* ─── Contact ─── */
.contact-section {
  padding: 6rem 1.5rem;
  background: linear-gradient(180deg, #050a1a 0%, var(--bg-deep) 100%);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-card {
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 3.5rem 4rem;
  text-align: center;
  max-width: 540px;
  width: 100%;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
}

.contact-sub {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 2.5rem;
}

.social-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  font-size: 1.4rem;
  color: var(--text-muted);
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: background var(--transition), color var(--transition),
              border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.social-btn:hover {
  background: var(--accent);
  color: var(--bg-deep);
  border-color: var(--accent);
  box-shadow: 0 8px 32px var(--accent-strong);
  transform: translateY(-3px);
}

/* ─── Footer ─── */
.site-footer {
  background: var(--bg-deep);
  border-top: 1px solid var(--border);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
}
```

- [ ] **Step 3: Verify — contact glass card centered, social icons in a row, no text labels, footer shows 2026**

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: contact glass card, social icons, footer 2026"
```

---

### Task 9: JavaScript — Scroll Header + IntersectionObserver

**Files:**
- Modify: `assets/js/script.js` (replace entire file)

- [ ] **Step 1: Replace script.js**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // ── Header scroll ──────────────────────────────────────
  const header = document.querySelector('.site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  });
  onScroll();

  // ── Close mobile menu on nav link click ───────────────
  const navLinks = document.querySelectorAll('a.nav-lnk');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse?.classList.contains('show')) {
        window.bootstrap?.Collapse?.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  // ── IntersectionObserver — reveal on scroll ────────────
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const baseDelay = parseFloat(el.style.getPropertyValue('--delay') || '0');
          el.style.transitionDelay = `${baseDelay}s`;
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
});
```

- [ ] **Step 2: Verify — scroll down the page, section titles and cards fade in. Header gets `.scrolled` class on scroll (check in DevTools)**

- [ ] **Step 3: Commit**

```bash
git add assets/js/script.js
git commit -m "feat: JS scroll header + IntersectionObserver reveal animations"
```

---

### Task 10: Mobile Responsiveness

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append responsive CSS**

```css
/* ─── Responsive ─── */
@media (max-width: 991px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  body { padding-top: 64px; }

  .hero { min-height: auto; padding: 4rem 1.2rem 3rem; }
  .hero-name { font-size: clamp(2.5rem, 10vw, 3.5rem); }
  .hero-photo { width: 200px; height: 200px; }

  .about-section,
  .projects-section,
  .contact-section { padding: 4rem 1.2rem; }

  .projects-grid { grid-template-columns: 1fr; }
  .projects-grid--other { grid-template-columns: repeat(2, 1fr); }

  .contact-card { padding: 2.5rem 1.5rem; }
}

@media (max-width: 500px) {
  .hero-name { font-size: 2.4rem; }
  .hero-areas { font-size: 0.875rem; }

  .projects-grid--other { grid-template-columns: 1fr; }

  .contact-card { padding: 2rem 1.2rem; }

  .social-btn { width: 52px; height: 52px; font-size: 1.25rem; }
}
```

- [ ] **Step 2: Resize browser to 375px width. Verify — single column layout, photo smaller, cards stack, contact card fits**

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "style: mobile responsiveness — 991px, 768px, 500px breakpoints"
```

---

### Task 11: Final HTML Head + Bootstrap import update

**Files:**
- Modify: `index.html` — update `<head>` to remove old Google Fonts link (now in CSS), verify all scripts present

- [ ] **Step 1: Update `<head>` in index.html**

Replace the current `<head>` block with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Arthur Monsores | Software Developer</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="./assets/css/styles.css" />
</head>
```

(Google Fonts are now imported inside `styles.css` via `@import`.)

- [ ] **Step 2: Verify `<body>` closing tags — Bootstrap JS and script.js present**

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.js"></script>
```

- [ ] **Step 3: Full browser walkthrough**

Check:
- Hero loads with gradient + particles + staggered text + pulsing photo ring
- Scroll: About Me cards reveal, section titles reveal
- Projects: 3-column grid, titles/tags visible, hover shows overlay
- Other Projects: auto-fill grid
- Contact: glass card centered, icon hover turns blue
- Mobile (375px): all sections single column, no overflow
- Nav links scroll to correct sections, mobile menu closes after click

- [ ] **Step 4: Final commit**

```bash
git add index.html
git commit -m "feat: complete portfolio redesign — dark premium, glassmorphism, scroll animations"
```

---

## Self-Review

**Spec coverage check:**
| Spec requirement | Covered by task |
|---|---|
| Dark premium aesthetic | Task 4 (gradient), Task 7 (glass cards) |
| Animated mesh gradient | Task 4 |
| Floating particles | Task 4 |
| Playfair Display + DM Sans | Task 1 |
| CSS custom properties | Task 1 |
| Glassmorphism cards | Task 5, 7, 8 |
| Hero: photo + name + areas | Task 3 |
| Pulsing photo ring | Task 4 |
| Staggered fade-in on load | Task 5 |
| About Me glass area cards | Task 5 |
| Projects: always-visible title | Task 6, 7 |
| IntersectionObserver scroll reveal | Task 9 |
| Header scroll behavior (.scrolled) | Task 9 |
| Contact: glass card, no text labels | Task 8 |
| Footer 2026 | Task 8 |
| Mobile responsiveness | Task 10 |
| Missing images → fallbacks | Task 6 |

All spec requirements covered. No placeholders or TODOs.
