import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Search, X, Orbit, Star, CircleDot, Sparkles, Rocket, Moon,
  Telescope, Maximize2, RotateCcw, Play, Pause, ZoomIn,
  MousePointer2
} from "lucide-react";

type Category = "all" | "planet" | "star" | "galaxy" | "moon" | "phenomenon" | "mission";
type ExplorerMode = "solar" | "galaxy";

type SpaceObject = {
  name: string;
  category: Exclude<Category, "all">;
  kicker: string;
  description: string;
  facts: [string, string][];
  image: string;
  credit: string;
  live?: boolean;
};

type Body3D = {
  name: string;
  image: string;
  orbit: number;
  size: number;
  speed: number;
  phase: number;
  tilt: number;
  category: "planet" | "moon";
  parent?: string;
  axial: number;
};

type ProjectedBody = Body3D & {
  x: number;
  y: number;
  z: number;
  radius: number;
  worldX: number;
  worldY: number;
  worldZ: number;
};

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const images = {
  mercury: commons("Mercury - MESSENGER (44202813010).png"),
  venus: commons("Venus.jpg"),
  earth: commons("Earth Eastern Hemisphere.jpg"),
  mars: commons("Nasa curiosity first images mars.jpg"),
  jupiter: commons("Jupiter.jpg"),
  saturn: commons("Full Disk of Saturn.jpg"),
  uranus: commons("Uranus - Voyager 2.jpg"),
  neptune: commons("Neptune (Voyager 2) (2020-12-4633-Image).png"),
  sun: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIIF.jpg",
  sirius: commons("Sirius star.jpg"),
  betelgeuse: commons("Betelgeuse (star).jpg"),
  pleiades: commons("Pleiades Cluster.jpg"),
  andromeda: commons("Andromeda galaxy.jpg"),
  milkyway: commons("Milky Way galaxy.jpg"),
  tri: commons("Andromeda Galaxy Composite.jpg"),
  europa: commons("Europa-moon.jpg"),
  titan: commons("Glowing Titan.jpg"),
  moon: commons("AS08-18-2903 - Apollo 8 - Apollo 8 Mission image, Entire Moon and terminator - NARA - 16672031.jpg"),
  blackhole: commons("Black hole (NASA).jpg"),
  nebula: commons("Orion nebula.jpg"),
  webb: commons("James Webb Space Telescope (2017-28-4051-Image).png"),
  voyager: commons("MESSENGER.jpg"),
};

const objects: SpaceObject[] = [
  { name: "Mercury", category: "planet", kicker: "Planet", description: "The smallest planet and the closest world to the Sun. Its heavily cratered surface experiences some of the solar system's most extreme temperature swings.", facts: [["Type", "Rocky planet"], ["Distance", "57.9 million km"], ["Day", "58.6 Earth days"]], image: images.mercury, credit: "NASA / MESSENGER" },
  { name: "Venus", category: "planet", kicker: "Planet", description: "A cloud-covered world with a crushing atmosphere and the hottest surface of any planet in our solar system.", facts: [["Type", "Rocky planet"], ["Distance", "108.2 million km"], ["Day", "243 Earth days"]], image: images.venus, credit: "NASA" },
  { name: "Earth", category: "planet", kicker: "Planet", description: "Our home world: a water-rich rocky planet with a protective atmosphere and the only world currently known to host life.", facts: [["Type", "Rocky planet"], ["Distance", "149.6 million km"], ["Moons", "1"]], image: images.earth, credit: "NASA Blue Marble" },
  { name: "Mars", category: "planet", kicker: "Planet", description: "The Red Planet has giant volcanoes, deep canyons and ancient landscapes that preserve clues about its watery past.", facts: [["Type", "Rocky planet"], ["Distance", "227.9 million km"], ["Year", "687 Earth days"]], image: images.mars, credit: "NASA / JPL-Caltech" },
  { name: "Jupiter", category: "planet", kicker: "Planet", description: "The solar system's largest planet, a massive gas giant surrounded by dozens of moons and powered by a turbulent atmosphere.", facts: [["Type", "Gas giant"], ["Distance", "778.5 million km"], ["Day", "9.9 hours"]], image: images.jupiter, credit: "NASA / JPL / USGS" },
  { name: "Saturn", category: "planet", kicker: "Planet", description: "A giant world famous for its spectacular ring system made from countless particles of ice and rock.", facts: [["Type", "Gas giant"], ["Distance", "1.43 billion km"], ["Rings", "Thousands of ringlets"]], image: images.saturn, credit: "NASA / JPL" },
  { name: "Uranus", category: "planet", kicker: "Planet", description: "An ice giant that rotates almost on its side. Methane in its atmosphere gives the planet its pale blue color.", facts: [["Type", "Ice giant"], ["Distance", "2.87 billion km"], ["Year", "84 Earth years"]], image: images.uranus, credit: "NASA / Voyager 2" },
  { name: "Neptune", category: "planet", kicker: "Planet", description: "The most distant major planet, a deep-blue ice giant with some of the fastest winds known in the solar system.", facts: [["Type", "Ice giant"], ["Distance", "4.50 billion km"], ["Year", "164.8 years"]], image: images.neptune, credit: "NASA / Voyager 2" },
  { name: "The Sun", category: "star", kicker: "Star", description: "The star at the center of our solar system. Its magnetic activity, radiation and energy shape the environment around every planet.", facts: [["Type", "G-type star"], ["Age", "4.6 billion years"], ["Diameter", "1.39 million km"]], image: images.sun, credit: "NASA / SDO", live: true },
  { name: "Sirius", category: "star", kicker: "Star", description: "The brightest star in Earth's night sky, a nearby binary system containing Sirius A and its compact companion Sirius B.", facts: [["System", "Binary"], ["Distance", "8.6 light-years"], ["Constellation", "Canis Major"]], image: images.sirius, credit: "Astronomical image" },
  { name: "Betelgeuse", category: "star", kicker: "Star", description: "A huge red supergiant in Orion. Its enormous size and advanced age make it a dramatic stellar laboratory.", facts: [["Type", "Red supergiant"], ["Distance", "≈640 light-years"], ["Constellation", "Orion"]], image: images.betelgeuse, credit: "Steward Observatory / University of Arizona" },
  { name: "Pleiades", category: "star", kicker: "Star Cluster", description: "The Seven Sisters, a brilliant open star cluster wrapped in clouds of dust and located more than 400 light-years away.", facts: [["Type", "Open cluster"], ["Distance", "≈440 light-years"], ["Constellation", "Taurus"]], image: images.pleiades, credit: "NASA / Spitzer" },
  { name: "Andromeda", category: "galaxy", kicker: "Galaxy", description: "The nearest large galaxy to the Milky Way, a vast spiral system about 2.5 million light-years away.", facts: [["Type", "Spiral galaxy"], ["Distance", "≈2.5 million ly"], ["Catalog", "M31"]], image: images.andromeda, credit: "NASA / GALEX" },
  { name: "Milky Way", category: "galaxy", kicker: "Galaxy", description: "Our home galaxy: a barred spiral containing hundreds of billions of stars, gas, dust and a central supermassive black hole.", facts: [["Type", "Barred spiral"], ["Diameter", "≈100,000 ly"], ["Home", "Solar System"]], image: images.milkyway, credit: "NASA / GSFC" },
  { name: "Galactic Neighbour", category: "galaxy", kicker: "Galaxy", description: "A composite view of Andromeda across multiple wavelengths, revealing young hot stars, older populations and dusty star-forming regions.", facts: [["Type", "Spiral galaxy"], ["Object", "M31"], ["View", "Multi-wavelength"]], image: images.tri, credit: "NASA / JPL-Caltech / GALEX" },
  { name: "Europa", category: "moon", kicker: "Moon", description: "An icy moon of Jupiter with a global subsurface ocean that makes it one of the solar system's most intriguing places to search for habitable environments.", facts: [["Parent", "Jupiter"], ["Type", "Icy moon"], ["Ocean", "Likely subsurface"]], image: images.europa, credit: "NASA / JPL / Galileo" },
  { name: "Titan", category: "moon", kicker: "Moon", description: "Saturn's largest moon and the only moon known to have a dense atmosphere and stable lakes and seas on its surface.", facts: [["Parent", "Saturn"], ["Type", "Icy moon"], ["Atmosphere", "Nitrogen-rich"]], image: images.titan, credit: "NASA / JPL-Caltech / Cassini" },
  { name: "Earth's Moon", category: "moon", kicker: "Moon", description: "Our natural satellite, shaped by ancient impacts and billions of years of geological history.", facts: [["Parent", "Earth"], ["Distance", "384,400 km"], ["Day", "≈27.3 Earth days"]], image: images.moon, credit: "NASA / Apollo 8" },
  { name: "Black Hole", category: "phenomenon", kicker: "Cosmic Phenomenon", description: "A region where gravity is so strong that, beyond its event horizon, nothing — not even light — can escape.", facts: [["Core", "Singularity"], ["Boundary", "Event horizon"], ["Light", "Cannot escape"]], image: images.blackhole, credit: "NASA / D. Berry" },
  { name: "Orion Nebula", category: "phenomenon", kicker: "Nebula", description: "A bright stellar nursery where clouds of gas and dust collapse into new stars. It is one of the most studied star-forming regions.", facts: [["Type", "Emission nebula"], ["Distance", "≈1,300 ly"], ["Constellation", "Orion"]], image: images.nebula, credit: "NASA / Hubble" },
  { name: "James Webb Space Telescope", category: "mission", kicker: "Mission", description: "A powerful infrared observatory studying early galaxies, star formation, exoplanets and atmospheres across cosmic time.", facts: [["Launch", "2021"], ["Orbit", "Sun–Earth L2"], ["Light", "Infrared"]], image: images.webb, credit: "NASA / ESA / CSA" },
  { name: "MESSENGER", category: "mission", kicker: "Mission", description: "NASA's mission that became the first spacecraft to orbit Mercury, transforming our understanding of the innermost planet.", facts: [["Destination", "Mercury"], ["Agency", "NASA"], ["Era", "2011–2015"]], image: images.voyager, credit: "NASA" },
];

const filters: { id: Category; label: string; icon: typeof Orbit }[] = [
  { id: "all", label: "Everything", icon: Sparkles },
  { id: "planet", label: "Planets", icon: Orbit },
  { id: "star", label: "Stars", icon: Star },
  { id: "galaxy", label: "Galaxies", icon: Telescope },
  { id: "moon", label: "Moons", icon: Moon },
  { id: "phenomenon", label: "Phenomena", icon: CircleDot },
  { id: "mission", label: "Missions", icon: Rocket },
];

const bodies: Body3D[] = [
  { name: "Mercury", image: images.mercury, orbit: 2.3, size: .18, speed: 1.6, phase: .2, tilt: .01, category: "planet", axial: 1.2 },
  { name: "Venus", image: images.venus, orbit: 3.3, size: .26, speed: 1.15, phase: 2.1, tilt: .02, category: "planet", axial: -.7 },
  { name: "Earth", image: images.earth, orbit: 4.5, size: .3, speed: .9, phase: 4.3, tilt: .04, category: "planet", axial: 2.2 },
  { name: "Mars", image: images.mars, orbit: 5.7, size: .23, speed: .72, phase: 1.3, tilt: .03, category: "planet", axial: 1.8 },
  { name: "Jupiter", image: images.jupiter, orbit: 7.3, size: .7, speed: .42, phase: 3.7, tilt: .02, category: "planet", axial: 4.8 },
  { name: "Saturn", image: images.saturn, orbit: 9.1, size: .6, speed: .33, phase: 5.1, tilt: .05, category: "planet", axial: 4.1 },
  { name: "Uranus", image: images.uranus, orbit: 11.1, size: .43, speed: .24, phase: 2.7, tilt: .18, category: "planet", axial: 3.1 },
  { name: "Neptune", image: images.neptune, orbit: 13, size: .42, speed: .19, phase: .7, tilt: .04, category: "planet", axial: 2.7 },
  { name: "Earth's Moon", image: images.moon, orbit: .7, size: .1, speed: 4.2, phase: .7, tilt: .1, category: "moon", parent: "Earth", axial: 3 },
  { name: "Europa", image: images.europa, orbit: .95, size: .11, speed: 3.2, phase: 2.4, tilt: .08, category: "moon", parent: "Jupiter", axial: 2.3 },
  { name: "Titan", image: images.titan, orbit: 1.15, size: .13, speed: 2.6, phase: 4.5, tilt: .06, category: "moon", parent: "Saturn", axial: 1.8 },
];

export default function UniverseExplorer() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SpaceObject | null>(null);
  const [mode, setMode] = useState<ExplorerMode>("solar");

  const handleSelect = useCallback((name: string) => {
    setSelected(objects.find((item) => item.name === name) ?? null);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return objects.filter((item) =>
      (category === "all" || item.category === category) &&
      (!q || `${item.name} ${item.kicker} ${item.description}`.toLowerCase().includes(q))
    );
  }, [category, query]);

  return (
    <section id="explore" className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
          <p className="text-sm uppercase tracking-[.28em] text-white/40">The Cosmo Atlas · 3D Lab</p>
          <h2 className="mt-4 text-4xl tracking-tight text-white md:text-6xl">Enter the universe <em className="instrument italic text-white/50">in three dimensions.</em></h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
            Drag to orbit the scene, scroll to travel through space, click a world to focus it, and switch to galaxy mode for a deep-space view. The scale is intentionally cinematic rather than physically proportional so every world stays visible.
          </p>
        </motion.div>

        <InteractiveSpaceLab mode={mode} setMode={setMode} onSelect={handleSelect} />

        <div className="mt-20 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[.28em] text-white/40">Explore by category</p>
            <h3 className="mt-3 text-3xl tracking-tight text-white md:text-4xl">Find your next world.</h3>
          </div>
          <div className="liquid-glass flex w-full max-w-sm items-center gap-3 rounded-full px-4 py-3">
            <Search size={17} className="text-white/40" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search planets, stars, galaxies..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30" />
          </div>
        </div>

        <div className="hide-scrollbar mb-10 mt-7 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const active = category === filter.id;
            return <button key={filter.id} onClick={() => setCategory(filter.id)} className={`liquid-glass flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium transition ${active ? "bg-white/10 text-white" : "text-white/45 hover:bg-white/5 hover:text-white"}`}><Icon size={14} /> {filter.label}</button>;
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <motion.button key={item.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: .5, delay: Math.min(index * .04, .3) }} onClick={() => setSelected(item)} className="liquid-glass group overflow-hidden rounded-3xl text-left">
              <div className="relative h-56 overflow-hidden bg-black">
                <img src={item.image} alt={`${item.name} — ${item.kicker}`} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${item.category === "planet" || item.category === "moon" || item.category === "star" ? "p-10 object-contain animate-cosmic-spin" : ""}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                {item.live && <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[.18em] text-white/75 backdrop-blur"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live</span>}
                <div className="absolute bottom-4 left-5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[.22em] text-white/55 backdrop-blur">{item.kicker}</div>
                <span className="liquid-glass absolute bottom-4 right-4 rounded-full p-2 text-white/60 transition group-hover:text-white"><ArrowUpRight size={17} /></span>
              </div>
              <div className="p-6"><h3 className="text-xl tracking-tight text-white">{item.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/40">{item.description}</p><p className="mt-4 text-[10px] uppercase tracking-[.18em] text-white/25">{item.credit}</p></div>
            </motion.button>
          ))}
        </div>

        {!visible.length && <div className="liquid-glass rounded-3xl p-16 text-center text-sm text-white/40">Nothing found. Try another cosmic search.</div>}
      </div>

      <AnimatePresence>
        {selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md" onClick={() => setSelected(null)}>
          <motion.article initial={{ scale: .96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: 20 }} onClick={(e) => e.stopPropagation()} className="liquid-glass relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-black/80">
            <button onClick={() => setSelected(null)} aria-label="Close" className="liquid-glass absolute right-4 top-4 z-10 rounded-full p-2 text-white/70 hover:text-white"><X size={18} /></button>
            <div className="grid md:grid-cols-[.9fr_1.1fr]">
              <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden bg-black p-8"><div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.09),transparent_65%)]" /><img src={selected.image} alt={selected.name} className={`relative max-h-[280px] max-w-full object-contain ${selected.category === "planet" || selected.category === "moon" || selected.category === "star" ? "animate-cosmic-spin" : ""}`} /></div>
              <div className="p-7 md:p-10"><p className="text-xs uppercase tracking-[.25em] text-white/40">{selected.kicker}</p><h3 className="instrument mt-3 text-5xl leading-none text-white">{selected.name}</h3><p className="mt-6 text-sm leading-relaxed text-white/60">{selected.description}</p><div className="mt-7 grid grid-cols-2 gap-3">{selected.facts.map(([label, value]) => <div key={label} className="liquid-glass rounded-xl p-4"><p className="text-[10px] uppercase tracking-[.18em] text-white/30">{label}</p><p className="mt-1 text-sm text-white/80">{value}</p></div>)}</div><p className="mt-6 text-[10px] uppercase tracking-[.18em] text-white/25">Image: {selected.credit}</p></div>
            </div>
          </motion.article>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

function InteractiveSpaceLab({ mode, setMode, onSelect }: { mode: ExplorerMode; setMode: (mode: ExplorerMode) => void; onSelect: (name: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [focused, setFocused] = useState("The Sun");
  const [cinematic, setCinematic] = useState(true);
  const [hint, setHint] = useState("Drag to orbit · Scroll to zoom · Click any world to focus");
  const [resetToken, setResetToken] = useState(0);
  const runningRef = useRef(running);
  const speedRef = useRef(speed);
  const focusedRef = useRef(focused);

  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { focusedRef.current = focused; }, [focused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let elapsed = 0;
    let last = performance.now();
    let yaw = -0.72;
    let pitch = 0.31;
    let distance = mode === "galaxy" ? 8.5 : 17;
    let targetDistance = distance;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const loaded = new Map<string, HTMLImageElement>();
    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const starLayers = [
      Array.from({ length: 170 }, (_, i) => ({ x: (Math.sin(i * 12.31) * 43758.5) % 1, y: (Math.sin(i * 4.71) * 17345.2) % 1, r: .35 + (i % 4) * .22, tw: .7 + (i % 6) * .14 })),
      Array.from({ length: 100 }, (_, i) => ({ x: (Math.sin(i * 8.73) * 9182.4) % 1, y: (Math.sin(i * 3.17) * 7312.6) % 1, r: .65 + (i % 4) * .3, tw: .4 + (i % 5) * .12 })),
    ];

    const asteroidSeed = Array.from({ length: 115 }, (_, i) => ({
      a: i * 2.39996,
      r: 4.55 + (i % 17) * .055 + Math.sin(i * 7.1) * .12,
      y: (Math.sin(i * 5.7) * .035),
      size: .7 + (i % 4) * .35,
    }));

    const load = (url: string) => {
      if (loaded.has(url)) return loaded.get(url)!;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      loaded.set(url, img);
      return img;
    };
    [...bodies.map((b) => b.image), images.sun, images.andromeda, images.milkyway].forEach(load);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(420, Math.min(680, rect.height));
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const project = (x: number, y: number, z: number) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y1 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      const depth = Math.max(2, distance - z2);
      const scale = Math.min(width, height) * .72 / depth;
      return { x: width / 2 + x1 * scale, y: height / 2 - y1 * scale, z: z2, scale };
    };

    const planetPosition = (body: Body3D, time: number): { x: number; y: number; z: number } => {
      if (body.parent) {
        const parent = bodies.find((b) => b.name === body.parent);
        const p = parent ? planetPosition(parent, time) : { x: 0, y: 0, z: 0 };
        const a = body.phase + time * body.speed * .00042;
        return { x: p.x + Math.cos(a) * body.orbit, y: p.y + Math.sin(a * .7) * body.orbit * body.tilt, z: p.z + Math.sin(a) * body.orbit };
      }
      const a = body.phase + time * body.speed * .00012;
      return { x: Math.cos(a) * body.orbit, y: Math.sin(a) * body.orbit * body.tilt, z: Math.sin(a) * body.orbit };
    };

    const drawImageSphere = (img: HTMLImageElement | undefined, x: number, y: number, r: number, rotation: number, warm = false) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const shadow = ctx.createRadialGradient(-r * .35, -r * .4, r * .03, 0, 0, r * 1.15);
      shadow.addColorStop(0, warm ? "rgba(255,230,145,.82)" : "rgba(255,255,255,.22)");
      shadow.addColorStop(.5, "rgba(0,0,0,0)");
      shadow.addColorStop(1, "rgba(0,0,0,.78)");
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();
      if (img?.complete && img.naturalWidth) {
        const ratio = Math.max((r * 2) / img.naturalWidth, (r * 2) / img.naturalHeight);
        const iw = img.naturalWidth * ratio;
        const ih = img.naturalHeight * ratio;
        ctx.drawImage(img, -iw / 2, -ih / 2, iw, ih);
      } else {
        const fallback = ctx.createRadialGradient(-r * .35, -r * .35, 2, 0, 0, r);
        fallback.addColorStop(0, warm ? "#ffe09a" : "#888");
        fallback.addColorStop(1, "#050505");
        ctx.fillStyle = fallback;
        ctx.fillRect(-r, -r, r * 2, r * 2);
      }
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = shadow;
      ctx.fillRect(-r, -r, r * 2, r * 2);
      ctx.restore();
    };

    const drawStars = (time: number) => {
      starLayers.forEach((layer, layerIndex) => {
        const drift = reducedMotion ? 0 : time * (layerIndex ? .000003 : .0000012);
        layer.forEach((s) => {
          const twinkle = reducedMotion ? .72 : .38 + .62 * (.5 + .5 * Math.sin(time * .001 * s.tw + s.x * 31));
          const parallaxX = ((s.x + drift * (layerIndex + 1) + 1) % 1) * width;
          const parallaxY = ((s.y + drift * .25 * (layerIndex + 1) + 1) % 1) * height;
          ctx.globalAlpha = twinkle * (layerIndex ? .55 : .82);
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(parallaxX, parallaxY, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      ctx.globalAlpha = 1;
    };

    const drawOrbit = (radius: number, alpha = .1) => {
      ctx.beginPath();
      for (let i = 0; i <= 120; i += 1) {
        const a = i / 120 * Math.PI * 2;
        const p = project(Math.cos(a) * radius, 0, Math.sin(a) * radius);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawAsteroidBelt = (time: number) => {
      asteroidSeed.forEach((a, i) => {
        const angle = a.a + time * .000025 * (i % 3 + 1);
        const p = project(Math.cos(angle) * a.r, a.y, Math.sin(angle) * a.r);
        const size = Math.max(.6, a.size * p.scale * .008);
        ctx.globalAlpha = .35 + ((i % 5) * .08);
        ctx.fillStyle = "rgba(190,180,170,.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const drawSaturnRings = (x: number, y: number, r: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(1, .33);
      ctx.strokeStyle = "rgba(210,205,190,.42)";
      ctx.lineWidth = Math.max(2, r * .16);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.85, r * .78, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.16)";
      ctx.lineWidth = Math.max(1, r * .055);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.55, r * .63, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const renderSolar = (time: number) => {
      const sun = project(0, 0, 0);
      const glow = ctx.createRadialGradient(sun.x, sun.y, 2, sun.x, sun.y, 145);
      glow.addColorStop(0, "rgba(255,205,105,.34)");
      glow.addColorStop(.35, "rgba(255,140,35,.14)");
      glow.addColorStop(1, "rgba(255,90,20,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(sun.x - 150, sun.y - 150, 300, 300);

      bodies.filter((b) => !b.parent).forEach((b) => drawOrbit(b.orbit, b.name === focusedRef.current ? .2 : .085));
      drawAsteroidBelt(time);

      const projected: ProjectedBody[] = bodies.map((b) => {
        const pos = planetPosition(b, time);
        const p = project(pos.x, pos.y, pos.z);
        return { ...b, ...p, worldX: pos.x, worldY: pos.y, worldZ: pos.z, radius: Math.max(4, b.size * p.scale * .78) };
      }).sort((a, b) => a.z - b.z);

      const sunRadius = Math.max(30, 1.25 * sun.scale);
      drawImageSphere(loaded.get(images.sun), sun.x, sun.y, sunRadius, reducedMotion ? 0 : time * .00004, true);

      for (const b of projected) {
        if (b.parent) {
          const parentProjected = projected.find((p) => p.name === b.parent);
          if (parentProjected) {
            ctx.beginPath();
            for (let i = 0; i <= 60; i += 1) {
              const a = b.phase + time * b.speed * .00042 + i / 60 * Math.PI * 2;
              const p = project(parentProjected.worldX + Math.cos(a) * b.orbit, parentProjected.worldY + Math.sin(a * .7) * b.orbit * b.tilt, parentProjected.worldZ + Math.sin(a) * b.orbit);
              if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = "rgba(255,255,255,.065)";
            ctx.stroke();
          }
        }
        if (b.name === "Saturn") drawSaturnRings(b.x, b.y, b.radius, -.3);
        drawImageSphere(loaded.get(b.image), b.x, b.y, b.radius, reducedMotion ? 0 : time * .001 * b.axial, false);
        if (b.name === "Saturn") drawSaturnRings(b.x, b.y, b.radius, -.3);
        if (!b.parent || b.category === "moon") {
          ctx.fillStyle = b.name === focusedRef.current ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.48)";
          ctx.font = `${b.category === "moon" ? 8 : 9}px Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(b.name, b.x, b.y + b.radius + 14);
        }
        if (b.name === focusedRef.current) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius + 8 + Math.sin(time * .004) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,.58)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      const cometAngle = time * .00016;
      const cometRadius = 7.5 + Math.sin(time * .00025) * 1.1;
      const comet = project(Math.cos(cometAngle) * cometRadius, Math.sin(cometAngle * .8) * .4, Math.sin(cometAngle) * cometRadius);
      ctx.strokeStyle = "rgba(255,255,255,.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(comet.x - Math.cos(cometAngle) * 40, comet.y + Math.sin(cometAngle) * 40);
      ctx.lineTo(comet.x, comet.y);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.95)";
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, 2.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,.42)";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("ASTEROID BELT", width * .07, height * .88);
      ctx.textAlign = "right";
      ctx.fillText("CINEMATIC SCALE", width * .93, height * .88);
    };

    const renderGalaxy = (time: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const image = loaded.get(images.andromeda);
      const base = Math.min(width, height) * .52 * (8.5 / distance);
      const pulse = 1 + (reducedMotion ? 0 : Math.sin(time * .00035) * .02);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-.18 + (reducedMotion ? 0 : Math.sin(time * .00008) * .03));
      const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, base * 1.4);
      glow.addColorStop(0, "rgba(255,255,255,.24)");
      glow.addColorStop(.45, "rgba(160,145,255,.1)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-base * 1.4, -base * 1.4, base * 2.8, base * 2.8);
      if (image?.complete && image.naturalWidth) {
        const w = base * 2.15 * pulse;
        const h = w * image.naturalHeight / image.naturalWidth;
        ctx.globalAlpha = .82;
        ctx.drawImage(image, -w / 2, -h / 2, w, h);
      }
      ctx.globalAlpha = 1;
      for (let arm = 0; arm < 3; arm += 1) {
        ctx.beginPath();
        for (let i = 0; i < 150; i += 1) {
          const p = i / 149;
          const a = p * Math.PI * 5.2 + arm * Math.PI * 2 / 3 + time * .00005;
          const r = p * base * .92;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r * .48;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(255,255,255,.055)";
        ctx.lineWidth = Math.max(1, base * .015);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < 140; i += 1) {
        const a = i * 2.39996 + time * .00008;
        const r = (i / 140) * base * .95;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * .48;
        ctx.fillStyle = `rgba(255,255,255,${.12 + (i % 5) * .06})`;
        ctx.fillRect(x, y, 1.2, 1.2);
      }
      ctx.fillStyle = "rgba(255,255,255,.62)";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("M31 · ANDROMEDA · 2.5 MILLION LIGHT-YEARS", cx, height - 34);
    };

    const render = (now: number) => {
      const delta = Math.min(40, now - last);
      last = now;
      if (runningRef.current) elapsed += delta * speedRef.current;
      distance += (targetDistance - distance) * .08;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#010103";
      ctx.fillRect(0, 0, width, height);
      drawStars(elapsed);
      if (mode === "solar") renderSolar(elapsed); else renderGalaxy(elapsed);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };
    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (!dragging) return;
      yaw += (event.clientX - lastX) * .008;
      pitch = Math.max(-1.05, Math.min(1.05, pitch + (event.clientY - lastY) * .006));
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const pointerUp = () => { dragging = false; };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      targetDistance = Math.max(mode === "galaxy" ? 4.8 : 5, Math.min(mode === "galaxy" ? 18 : 30, targetDistance + event.deltaY * .012));
    };
    const click = () => {
      if (mode !== "solar") return;
      let best: ProjectedBody | null = null;
      let bestD = Infinity;
      for (const b of bodies) {
        const pos = planetPosition(b, elapsed);
        const p = project(pos.x, pos.y, pos.z);
        const radius = Math.max(8, b.size * p.scale * .95);
        const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
        if (d < radius + 12 && d < bestD) {
          best = { ...b, ...p, worldX: pos.x, worldY: pos.y, worldZ: pos.z, radius };
          bestD = d;
        }
      }
      const sunP = project(0, 0, 0);
      if (Math.hypot(pointer.x - sunP.x, pointer.y - sunP.y) < Math.max(38, sunP.scale * 1.5)) {
        setFocused("The Sun");
        onSelect("The Sun");
        targetDistance = 9;
        setHint("Sun selected · live NASA SDO imagery powers the solar surface");
        return;
      }
      if (best) {
        setFocused(best.name);
        onSelect(best.name);
        targetDistance = Math.max(7, Math.min(16, best.orbit + 6));
        setHint(`${best.name} selected · camera easing toward its orbit`);
      }
    };

    const keydown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "Space") { event.preventDefault(); setRunning((value) => !value); }
      if (event.key.toLowerCase() === "r") { setResetToken((value) => value + 1); }
      if (event.key.toLowerCase() === "g") setMode("galaxy");
      if (event.key.toLowerCase() === "s") setMode("solar");
    };

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("wheel", wheel, { passive: false });
    canvas.addEventListener("click", click);
    window.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("wheel", wheel);
      canvas.removeEventListener("click", click);
      window.removeEventListener("keydown", keydown);
    };
  }, [mode, onSelect, resetToken]);

  const reset = () => {
    setFocused("The Sun");
    setResetToken((value) => value + 1);
    setHint("Scene reset · drag, zoom, select a world, or switch scale");
  };

  const videoSolar = "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004790/SolarSystemOverview.oblique.inner.nolabels.HD1080i_p30.webm";
  const videoGalaxy = "https://svs.gsfc.nasa.gov/vis/a020000/a020400/a020406/MilkyWayZoom_30fps_1080_h264_wStars.mp4";

  return (
    <div className="liquid-glass relative mt-10 overflow-hidden rounded-[2rem] p-3 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,150,40,.08),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(90,100,255,.10),transparent_35%)]" />
      <div ref={wrapRef} className="relative h-[560px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black sm:h-[650px]">
        {cinematic && (
          <video key={mode} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen" aria-hidden="true">
            {mode === "galaxy" ? (
              <source src={videoGalaxy} type="video/mp4" />
            ) : (
              <>
                <source src={videoSolar} type="video/webm" />
                <source src="https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004790/SolarSystemOverview.oblique.inner.nolabels.HD1080i_p30.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,.62)_85%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing" aria-label="Interactive cinematic space explorer" />

        <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2">
          <button type="button" onClick={() => setMode("solar")} className={`liquid-glass rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[.18em] ${mode === "solar" ? "bg-white/10 text-white" : "text-white/45"}`}><Orbit size={13} className="mr-2 inline" /> Solar System</button>
          <button type="button" onClick={() => setMode("galaxy")} className={`liquid-glass rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[.18em] ${mode === "galaxy" ? "bg-white/10 text-white" : "text-white/45"}`}><Telescope size={13} className="mr-2 inline" /> Galaxy Viewer</button>
          <button type="button" onClick={() => setCinematic((value) => !value)} className={`liquid-glass rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[.18em] ${cinematic ? "bg-white/10 text-white" : "text-white/45"}`}>{cinematic ? "Cinematic ON" : "Cinematic OFF"}</button>
        </div>

        <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => setRunning((value) => !value)} aria-label={running ? "Pause animation" : "Play animation"} className="liquid-glass rounded-full p-3 text-white/75 hover:text-white">{running ? <Pause size={15} /> : <Play size={15} />}</button>
          <button type="button" onClick={() => setSpeed((value) => value >= 2 ? .35 : value + .55)} aria-label="Change animation speed" className="liquid-glass rounded-full px-3 py-2.5 text-[9px] uppercase tracking-[.15em] text-white/65">{speed.toFixed(2)}×</button>
          <button type="button" onClick={reset} aria-label="Reset scene" className="liquid-glass rounded-full p-3 text-white/75 hover:text-white"><RotateCcw size={15} /></button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="liquid-glass max-w-lg rounded-2xl px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[.22em] text-white/40"><MousePointer2 size={12} /> {mode === "solar" ? "Interactive solar system" : "Deep-space galaxy viewer"}<span className="text-white/20">·</span><span>Focus: {focused}</span></div>
            <p className="mt-1 text-xs text-white/55">{hint}</p>
            <p className="mt-2 text-[9px] uppercase tracking-[.16em] text-white/25">Keyboard: Space pause · R reset · S solar · G galaxy</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="liquid-glass rounded-full px-3 py-2.5 text-[9px] uppercase tracking-[.15em] text-white/45"><ZoomIn size={12} className="mr-1 inline" /> Scroll zoom</span>
            <span className="liquid-glass rounded-full px-3 py-2.5 text-[9px] uppercase tracking-[.15em] text-white/45"><Maximize2 size={12} className="mr-1 inline" /> Drag orbit</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2 px-2 text-[9px] uppercase tracking-[.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
        <span>NASA visualization layer · cinematic scale · not to scale</span>
        <span>{mode === "galaxy" ? "Milky Way conceptual animation" : "NASA solar-system orbit visualization"}</span>
      </div>
    </div>
  );
}
