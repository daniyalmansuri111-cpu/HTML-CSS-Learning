# 🌌 CosmoExplorer

A cinematic, interactive single-page space explorer built from the supplied landing-page recreation template.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Instrument Serif

## Features

- Exact liquid-glass visual language from the supplied template
- Full-screen cinematic hero with the supplied video and custom crossfade loop
- Responsive navigation
- Interactive universe atlas
- Search across planets, stars, galaxies, moons, phenomena and missions
- Category filters
- Clickable cards with animated detail modal and facts
- Scroll-based Framer Motion animations
- Featured space video
- Missions and deep-space sections
- Responsive mobile layout

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The project uses the supplied CloudFront videos as remote media.


## 🛰️ Real imagery & motion

The atlas now uses remote real-world astronomy imagery from NASA/mission archives and Wikimedia Commons file redirects. Planet, moon and star cards use real images rather than CSS-only illustrations. The Sun uses the NASA Solar Dynamics Observatory's current HMI image endpoint.

The solar-system showcase adds lightweight CSS animation: planetary drift, solar pulsing, image motion and interactive inspection. These are visual animations, not physically accurate orbital simulations.
## 3D Space Lab

The Explore section now includes a dependency-free interactive 3D-style canvas environment that keeps the liquid-glass visual language while adding:

- Drag-to-orbit camera controls
- Scroll-to-zoom navigation
- Animated solar orbits and axial rotation motion
- Clickable planets and moons (Earth's Moon, Europa, Titan)
- Live NASA SDO Sun imagery
- Animated procedural star field
- Galaxy Viewer mode using the real Andromeda image
- Pause/play animation, speed control, and scene reset
- Click-to-open object detail cards with the existing real imagery and facts
- Responsive canvas sizing and reduced-motion-friendly page animations

The scene is intentionally cinematic rather than physically to scale so all major planets remain visible and interactive. NASA's own solar-system resources likewise note that visual solar-system diagrams commonly exaggerate spacing and size for visibility.



## Final 3D Space Lab Polish

The Explore section now includes a cinematic interactive space lab with: 
- draggable orbit camera and smooth zoom
- animated planetary orbits, axial rotation, moon paths and an asteroid belt
- Saturn ring treatment and a moving comet trail
- layered procedural stars with parallax/twinkle
- clickable worlds that focus the camera and open the existing object detail panel
- Solar System and Galaxy Viewer modes
- optional NASA cinematic video backgrounds
- play/pause, speed, reset and cinematic-background controls
- keyboard shortcuts: Space, R, S and G
- reduced-motion support

### NASA video sources
The cinematic background layer uses NASA Scientific Visualization Studio material. NASA states that its visualizations are public domain unless otherwise noted; individual media should still be credited appropriately.

- Solar System orbit visualization: NASA Scientific Visualization Studio, “Orbit Views of our Solar System” — https://svs.gsfc.nasa.gov/4790
- Milky Way / heliosphere conceptual animation: NASA Scientific Visualization Studio, “The Heliosphere Within The Milky Way Galaxy” — https://svs.gsfc.nasa.gov/20406
- SDO imagery: NASA Solar Dynamics Observatory — https://sdo.gsfc.nasa.gov/

The interactive scene remains intentionally cinematic rather than physically to scale so that objects remain visible and clickable.
