# LIFOS — Personal Decision Simulator

> An interactive frontend experience for exploring how different choices can change a projected financial future.

## Live Demo

**GitHub Pages:** https://daniyalmansuri111-cpu.github.io/HTML-CSS-Learning/LIFOS/

## What it is

LIFOS is a frontend-only decision simulator. Instead of presenting another static landing page, it turns a set of user inputs into an interactive scenario dashboard with charts, projected outcomes, sensitivity metrics, and two side-by-side future paths.

## Highlights

- Interactive 12–24 month cash-flow simulation
- Live recalculation while inputs change
- Two scenario paths with side-by-side comparison
- Animated gradient visuals, orbital hero graphic, hover motion and micro-interactions
- Dynamic canvas chart with hover inspection
- Light/dark visual mode
- Sample scenario loader
- Insight layer with rotating explanations
- Responsive dashboard layout for desktop, tablet and mobile
- Accessible labels, semantic sections and keyboard-friendly controls
- No backend or API key required

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- Google Fonts
- GitHub Pages

## Project Structure

```text
LIFOS/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Run locally

Open `index.html` directly in a modern browser, or use any static web server.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/LIFOS/`.

## UX / visual direction

LIFOS uses a futuristic editorial dashboard system: layered glass surfaces, neon gradients, soft ambient glows, animated orbit geometry, live metrics, progressive disclosure and responsive cards. The visual treatment is intentionally more like a product interface than a marketing landing page.

## Model assumptions

The simulator uses a simple deterministic projection:

`ending cash = starting cash - one-time option cost + (monthly income - monthly expenses) × months`

The goal is to make the assumptions visible and interactive rather than pretend the result is financial advice.

## Author

Daniyal Mansuri
