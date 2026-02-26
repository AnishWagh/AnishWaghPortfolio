# Anish Wagh — Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-anishwagh.github.io-A4D65E?style=for-the-badge)](https://anishwagh.github.io)

Pop Art Mechatronics themed personal portfolio built for GitHub Pages.

## Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Custom variables, animations, grid/flexbox (no framework) |
| **Vanilla JS** | Core interactivity, Intersection Observers, Formspree API |
| **GSAP 3** | ScrollTrigger animations, character split effects |
| **GitHub Actions** | Automated CI/CD pipeline |
| **GitHub Pages** | Static hosting |

## Local Development

This is a static site with zero build step.

1. Clone the repository
2. Open `index.html` in your browser.

No `npm install`, no `build` required.

## Folder Structure

```
portfolio-website/
├── index.html           # Main portfolio page
├── blog.html            # Deep dives / articles index
├── assets/
│   ├── css/             # Modular CSS architecture
│   ├── js/              # Modular JavaScript (GSAP, Contact, Nav)
│   └── images/          # WebP optimized assets
└── .github/workflows/   # GitHub Actions deploy script
```

## How to Update Content

- **Hero & About**: Edit `index.html` directly in the respective `<section>` tags.
- **Projects**: Edit the `.project-card` elements in `index.html`. Add thumbnails to `assets/images/projects/`.
- **Skills Ring**: Edit the `skillsData` object in `assets/js/skills-ring.js`.
- **Experience**: Edit the `.experience-entry` blocks in `index.html`.
- **Contact Form**: Update the `action` attribute on the `<form>` in `index.html` with your Formspree ID.

## Formspree Setup

1. Sign up for a free account at [Formspree](https://formspree.io/).
2. Create a new form and copy its endpoint ID.
3. In `index.html`, replace `YOUR_FORM_ID` in `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">` with your actual ID.

## GitHub Pages Deployment

The site uses a GitHub Actions workflow to deploy automatically to GitHub Pages.

1. Go to your repository **Settings**.
2. Navigate to **Pages** on the left sidebar.
3. Under **Source**, select **GitHub Actions**.
4. Push any changes to the `main` branch. The action will run and deploy your site within a few minutes.

## Design System

The site adheres to a strict "Pop Art Mechatronics" design system. For rules regarding typography, colors, animations, and components, consult the internal `.gemini/skills/web-developer/SKILLS.md` document.

## License

MIT License.
