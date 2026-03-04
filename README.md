# Anish Wagh — Portfolio

Personal portfolio built from scratch — every pixel, animation, and line of
code written by hand. No frameworks, no templates.

**Live:** [anishwagh.github.io/AnishWaghPortfolio](https://anishwagh.github.io/AnishWaghPortfolio)

---

## What's Inside

A single-page portfolio for a Senior Software Engineer specialising in
connected appliance software, Android HMI development, and embedded systems.
Built with a "Pop Art Mechatronics" aesthetic — monospace typography, olive and
cyan on near-black, and deliberate motion design.

---

## Built With

| Layer | Choice |
|---|---|
| Structure | HTML5 — semantic, accessible |
| Styling | CSS3 — custom properties, grid, flexbox. Zero frameworks. |
| Interactivity | Vanilla JavaScript — IntersectionObserver, scroll-driven animations |
| Motion | GSAP 3 + ScrollTrigger for character-split and entrance effects |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions — auto-deploys on push to `main` |

---

## Running Locally

Zero build step. Clone and open.
```bash
git clone https://github.com/anishwagh/AnishWaghPortfolio.git
cd AnishWaghPortfolio
open index.html
```

---

## Project Structure
AnishWaghPortfolio/
├── index.html              ← Everything lives here
├── blog.html               ← Writing & articles
├── assets/
│   ├── css/                ← Modular stylesheets
│   ├── js/                 ← Scroll animations, nav, contact
│   └── images/             ← Optimised assets
└── .github/
└── workflows/          ← Deploy pipeline

---

## Updating Content

| Section | Where to edit |
|---|---|
| Hero & About | `index.html` — find the `<section id="hero">` and `<section id="about">` tags |
| Projects | `.project-card` elements in `index.html` |
| Experience | `.timeline-entry` blocks in `index.html` |
| Skills | `assets/js/skills-ring.js` — edit the `skillsData` object |
| Contact | Update the `action` attribute on the `<form>` tag with your endpoint |

---

## License

MIT — use freely, credit appreciated.
