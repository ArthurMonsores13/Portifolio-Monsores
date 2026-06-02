# Portfolio Redesign — Design Spec
Date: 2026-06-02

## Goal

Rebuild Arthur Monsores' portfolio with a "dark premium" aesthetic — identity-first, with glassmorphism cards, scroll-triggered animations, and a refined typographic system. Single-page HTML/CSS/JS, no frameworks.

## Aesthetic Direction

**Glass & Depth** — deep dark background with subtle animated mesh gradient, glassmorphism cards with backdrop-blur, photo in hero with glowing ring, staggered scroll-triggered fade-in animations.

## Color System

```css
--bg-deep:      #020617
--bg-glass:     rgba(15, 23, 42, 0.6)
--accent:       #38bdf8
--accent-glow:  rgba(56, 189, 248, 0.15)
--text-primary: #f1f5f9
--text-muted:   #94a3b8
--border:       rgba(56, 189, 248, 0.12)
```

Mesh gradient in hero: deep blue → dark purple → black, animated with CSS `@keyframes` at 8s loop.

## Typography

- **Display** (name, section titles): Playfair Display — elegant, high contrast with dark theme
- **Body**: DM Sans — clean, modern, readable
- Both via Google Fonts

## Page Structure

```
Header (sticky, glassmorphism, blur increases on scroll)
Hero (#sobre)
About Me (#sobre-mim)
Main Projects (#projetos)
Other Projects (#outros-projetos)
Contact (#contato)
Footer
```

## Sections

### Header
Sticky navbar with `backdrop-filter: blur(12px)` + glassmorphism border. Blur intensity increases on scroll (JS adds `.scrolled` class with stronger blur). Mobile hamburger kept. Links: Sobre · Projetos · Contato.

### Hero (#sobre)
Full viewport height (`100vh`). Background: animated CSS mesh gradient (deep blue/purple/black). 20 low-opacity floating particles via CSS animation.

Layout (two columns):
- Left: staggered fade-in text
  - Name: Playfair Display, 3.5rem, `--text-primary`
  - Role: DM Sans, 1.1rem, `--accent`
  - Divider line
  - Areas: "AI Agents · Automação · Business Intelligence", `--text-muted`
  - CTA button: "Ver Projetos ↓" — ghost style, border `--accent`, hover fills with accent
- Right: circular photo (260px), 4px ring `--accent`, pulsing glow animation on ring

Entrance: each element fades in with `opacity 0→1` + `translateY(20px→0)`, 0.3s delay between items.

### About Me (#sobre-mim)
Two-column layout. Left: short paragraph (2-3 sentences). Right: 3 vertical glass cards:
- AI Agents — agentes autônomos e LLMs
- Automação — pipelines e scripts
- Business Intelligence — SQL, PostgreSQL, Power BI

Glass cards: `backdrop-filter: blur(8px)`, background `--bg-glass`, border `--border`, glow on hover.

### Main Projects (#projetos)
Section title: "Projetos Principais" — Playfair Display.

3-column grid. Each card:
- Image (4:3 ratio, `object-fit: cover`)
- Always-visible title + tech tag below image (not just on hover)
- Hover: border glow `--accent`, overlay description on image, `scale(1.02)`
- Glass card container

Projects: Calculator C#, Dashboard Investimentos, Flask Festival, SQL Documentation.

Entrance: `IntersectionObserver` — cards fade in with staggered delay (0.1s per card).

### Other Projects (#outros-projetos)
Same card pattern, tighter grid (can show 4-5 per row on desktop).

Projects: Solo Leveling, Arctic Monkeys, Medical Clinic, Conversor, Flappy Bird Java.

### Contact (#contato)
Single large glass card centered on page. Title: "Vamos conversar?" in Playfair Display. Social icons in a row — no text labels (icon speaks for itself). Hover: icon button fills with `--accent` + glow.

Icons: Instagram, LinkedIn, GitHub, CV (PDF).

### Footer
Single line: `© 2026 Arthur Monsores` — `--text-muted`, centered.

## Animations

| Element | Animation | Trigger |
|---|---|---|
| Hero elements | fade-in + translateY, staggered 0.3s | page load |
| Photo ring | pulsing glow | continuous CSS |
| Mesh gradient | slow color shift | continuous CSS |
| Sections/cards | fade-in + translateY | IntersectionObserver scroll |
| Card hover | scale(1.02) + border glow | hover |
| CTA button | fill + glow | hover |
| Social icons | fill + box-shadow | hover |
| Header | blur increase | scroll (JS) |

## Responsiveness

- Mobile breakpoint: 768px — single column layout
- Small mobile: 500px — title text size reduced, centered
- Hamburger menu kept from current implementation

## Files Modified

- `index.html` — full rewrite
- `assets/css/styles.css` — full rewrite
- `assets/js/script.js` — extend with IntersectionObserver + scroll header logic

## Out of Scope

- Backend or contact form
- CMS or dynamic content
- Framework migration
- Missing project images (keep existing ones, no new images added)
