import { useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

const cream = "#E1E0CC";
const ease = [0.16, 1, 0.3, 1] as const;

const media = {
  hero:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  atmosphere:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4",
  bottle:
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=85",
  darkBottle:
    "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?auto=format&fit=crop&w=1400&q=85",
  roses:
    "https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-luxury-roses-perfume-08-19-11-afa338e24f1944f7a939bfcd572bead120ac999a333cd3188349508b89d013c3.jpg",
  smoke:
    "https://assets.promptbase.com/Images/x5BTSGaxHh8BfoOYdP0n/resized/1778342540517z_800x800.webp?alt=media&token=330c4469-20e1-4184-967a-04d40f810f81",
  woods:
    "https://www.naseemperfume.in/cdn/shop/files/give-ingredient-image-based-on-this-story-as-it-settles-the-earth-speaks-in-deep-resonant-tones-patchouli-cedarwood-and-sandalwood-burnished-with-the-molten-warmth-of-amber_1.png?v=1763552957&width=1500",
};

const scents = {
  obsidian: {
    title: "OBSIDIAN",
    subtitle: "The signature",
    description:
      "A dark collision of smoked cedar, black amber and sandalwood. Dense at first. Softer with time.",
    notes: ["Cedar", "Black Amber", "Sandalwood"],
    intensity: 92,
    color: "#6B151C",
  },
  velvet: {
    title: "VELVET",
    subtitle: "The intimate",
    description:
      "Cardamom, cashmere woods and skin musk. Soft enough to whisper. Distinct enough to remember.",
    notes: ["Cardamom", "Cashmere", "Musk"],
    intensity: 68,
    color: "#4D3640",
  },
  nocturne: {
    title: "NOCTURNE",
    subtitle: "The after dark",
    description:
      "Dark vanilla wrapped in amber resin, patchouli and warm woods. Made for nights that run late.",
    notes: ["Vanilla", "Amber", "Patchouli"],
    intensity: 98,
    color: "#351217",
  },
};

type ScentKey = keyof typeof scents;

function PullText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const visible = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="mr-[0.2em] overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{
              y: 50,
              opacity: 0,
            }}
            animate={
              visible
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: index * 0.07,
              ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{
        duration: 0.9,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Noise() {
  return (
    <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.5] mix-blend-overlay" />
  );
}

export default function App() {
  const [scent, setScent] = useState<ScentKey>("obsidian");
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = scents[scent];

  return (
    <main className="overflow-hidden bg-black text-[#E1E0CC]">

      <section className="relative min-h-screen p-3 sm:p-4 md:p-6">
        <div className="relative h-[calc(100vh-24px)] min-h-[620px] overflow-hidden rounded-[1.5rem] md:h-[calc(100vh-48px)] md:rounded-[2rem]">

          <video
            src={media.hero}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <Noise />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-black/90" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(107,21,28,0.35),transparent_35%)]" />

          <nav className="absolute left-1/2 top-0 z-30 hidden -translate-x-1/2 items-center gap-8 rounded-b-3xl bg-black px-8 py-3 lg:flex">
            {[
              ["Scent", "#scent"],
              ["Story", "#story"],
              ["Notes", "#notes"],
              ["World", "#world"],
              ["Collection", "#collection"],
            ].map(([name, href]) => (
              <a
                key={name}
                href={href}
                className="text-xs text-primary/70 transition-colors hover:text-primary"
              >
                {name}
              </a>
            ))}

            <button
              onClick={() => setCartOpen(true)}
              className="ml-2 text-primary transition-transform hover:scale-110"
            >
              <ShoppingBag size={15} />
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="absolute right-5 top-5 z-30 rounded-full bg-black/70 p-3 text-primary backdrop-blur-md lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="absolute left-5 top-5 z-20 text-[9px] uppercase tracking-[0.35em] text-primary/60 md:left-8 md:top-8">
            NOIRÉ / PARFUM
          </div>

          <div className="absolute bottom-6 left-5 right-5 z-20 md:bottom-10 md:left-8 md:right-8">

            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-primary/60">
              <span className="h-px w-8 bg-primary/50" />
              Chapter 01 — After Dark
            </div>

            <h1
              className="text-[24vw] font-medium leading-[0.72] tracking-[-0.09em] sm:text-[22vw] md:text-[19vw] lg:text-[17vw]"
              style={{ color: cream }}
            >
              <PullText text="NOIRÉ*" />
            </h1>

            <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">

              <p className="max-w-md text-xs leading-6 text-primary/60 md:col-span-4 md:col-start-9">
                Fragrance for people who don't need to
                announce their presence.
              </p>

              <a
                href="#scent"
                className="group flex w-fit items-center gap-4 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black"
              >
                Enter the world

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                  <ArrowRight size={17} color={cream} />
                </span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-20 hidden flex-col items-center gap-3 md:flex">
            <span className="text-[8px] uppercase tracking-[0.3em] text-primary/50 [writing-mode:vertical-rl]">
              Scroll to explore
            </span>

            <ArrowDown
              size={14}
              className="animate-bounce text-primary/60"
            />
          </div>
        </div>
      </section>

      <section
        id="story"
        className="relative overflow-hidden bg-black px-5 py-28 md:px-10 md:py-40"
      >
        <div className="absolute inset-0 overflow-hidden">

          <motion.img
            src={media.roses}
            alt=""
            initial={{
              scale: 1.08,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.8,
              ease,
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/75" />

          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/55 to-black" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,21,28,0.32),transparent_55%)]" />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7b1822] blur-[130px]"
          />

          <Noise />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="mb-12 flex items-center gap-4">
            <span className="h-px w-10 bg-primary/40" />

            <p className="text-[9px] uppercase tracking-[0.4em] text-primary/60">
              The philosophy
            </p>

            <span className="h-px flex-1 bg-primary/10" />
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-12">

            <div className="lg:col-span-8">

              <h2
                className="text-4xl leading-[0.9] tracking-[-0.05em] sm:text-5xl md:text-7xl lg:text-8xl"
                style={{
                  textShadow:
                    "0 4px 40px rgba(0,0,0,0.9)",
                }}
              >
                <PullText text="We don't make fragrance." />

                <motion.span
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.45,
                    ease,
                  }}
                  className="mt-3 block font-serif italic text-primary/70"
                >
                  We create atmosphere.
                </motion.span>
              </h2>

              <Reveal delay={0.2}>
                <p className="mt-10 max-w-xl text-sm leading-7 text-primary/60 md:text-base">
                  NOIRÉ began with a fascination for the
                  invisible. The trace someone leaves in a room.
                  The memory attached to a jacket. The feeling
                  that arrives before a person says a word.
                </p>
              </Reveal>

            </div>

            <div className="relative hidden lg:col-span-4 lg:block">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotate: 8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 5,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease,
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 2,
                }}
                className="relative mx-auto aspect-[3/4] max-w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl"
              >
                <img
                  src={media.darkBottle}
                  alt="NOIRÉ fragrance bottle"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-[8px] uppercase tracking-[0.35em] text-primary/50">
                    NOIRÉ
                  </p>

                  <p className="mt-2 text-xl text-primary">
                    001
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [-8, -5, -8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-black/70 backdrop-blur-xl"
              >
                <Sparkles
                  size={18}
                  strokeWidth={1}
                  className="text-primary"
                />
              </motion.div>

            </div>
          </div>

          <div className="mt-20 grid grid-cols-3 border-y border-white/10 py-7 text-center md:mt-28">

            <div>
              <p className="text-2xl text-primary md:text-3xl">
                50
              </p>

              <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-gray-500">
                ML
              </p>
            </div>

            <div className="border-x border-white/10">
              <p className="text-2xl text-primary md:text-3xl">
                12+
              </p>

              <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-gray-500">
                HOURS
              </p>
            </div>

            <div>
              <p className="text-2xl text-primary md:text-3xl">
                03
              </p>

              <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-gray-500">
                SIGNATURE NOTES
              </p>
            </div>

          </div>
        </div>
      </section>

      <section
        id="scent"
        className="relative overflow-hidden bg-[#0d0b0b] px-5 py-28 md:px-10 md:py-40"
      >
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#6B151C]/20 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-primary/50">
                Chapter 02
              </p>

              <h2 className="mt-5 text-5xl leading-[0.85] tracking-[-0.05em] md:text-8xl">
                Choose your
                <span className="font-serif italic text-primary/60">
                  {" "}mood.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-6 text-gray-500">
              Three compositions. Three personalities.
              One philosophy — leave something behind.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">

            <div className="lg:col-span-5">

              <div className="flex flex-wrap gap-2">
                {(Object.keys(scents) as ScentKey[]).map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() => setScent(key)}
                      className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-all ${
                        scent === key
                          ? "border-primary bg-primary text-black"
                          : "border-white/10 text-gray-500 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {scents[key].title}
                    </button>
                  )
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={scent}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                  }}
                  transition={{
                    duration: 0.5,
                    ease,
                  }}
                  className="mt-12"
                >
                  <p className="text-[9px] uppercase tracking-[0.3em] text-primary/40">
                    {current.subtitle}
                  </p>

                  <h3 className="mt-3 text-4xl text-primary md:text-5xl">
                    {current.title}
                  </h3>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400">
                    {current.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {current.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-white/10 px-4 py-2 text-[10px] text-gray-400"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="mt-12 max-w-md">

                    <div className="mb-3 flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-gray-500">
                        Intensity
                      </span>

                      <span className="text-primary">
                        {current.intensity}%
                      </span>
                    </div>

                    <div className="h-[2px] bg-white/10">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${current.intensity}%`,
                        }}
                        transition={{
                          duration: 1,
                          ease,
                        }}
                        className="h-full"
                        style={{
                          backgroundColor: current.color,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="group mt-10 flex items-center gap-5 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-medium text-black"
                  >
                    Discover {current.title}

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
                      <ArrowRight
                        size={16}
                        color={cream}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative min-h-[550px] lg:col-span-7">

              <AnimatePresence mode="wait">
                <motion.div
                  key={scent}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.8,
                    ease,
                  }}
                  className="absolute inset-0 overflow-hidden rounded-[2rem]"
                >
                  <img
                    src={
                      scent === "obsidian"
                        ? media.darkBottle
                        : scent === "velvet"
                          ? media.roses
                          : media.smoke
                    }
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                  <div className="absolute bottom-8 left-8">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-primary/50">
                      NOIRÉ
                    </span>

                    <p className="mt-2 text-5xl font-medium tracking-[-0.05em] text-primary md:text-7xl">
                      {current.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-5 z-10 hidden h-28 w-28 rounded-full border border-primary/20 bg-black/70 p-5 backdrop-blur-xl md:block"
              >
                <Sparkles
                  size={20}
                  className="text-primary"
                />

                <p className="mt-2 text-[8px] uppercase leading-3 tracking-[0.15em] text-gray-400">
                  Made for
                  <br />
                  after dark
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      <section
        id="notes"
        className="relative overflow-hidden bg-black px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-16 max-w-4xl">
            <p className="text-[9px] uppercase tracking-[0.4em] text-primary/50">
              Chapter 03 — The architecture of a scent
            </p>

            <h2 className="mt-6 text-4xl leading-[0.9] tracking-[-0.04em] md:text-7xl">
              First impression.
              <br />
              <span className="text-gray-600">
                Lasting memory.
              </span>
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "OPEN",
                description:
                  "Bright spice and bitter citrus cut through the darkness.",
                image: media.woods,
              },
              {
                number: "02",
                title: "BLOOM",
                description:
                  "Warm woods slowly take over, creating depth and texture.",
                image: media.roses,
              },
              {
                number: "03",
                title: "REMAIN",
                description:
                  "Amber, musk and vanilla stay close to the skin for hours.",
                image: media.smoke,
              },
            ].map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 0.12}
              >
                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                  className="group relative h-[500px] overflow-hidden rounded-[1.5rem] bg-[#151313]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-1000 group-hover:scale-110 group-hover:opacity-80"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[9px] backdrop-blur-md">
                    {item.number}
                  </div>

                  <div className="absolute bottom-7 left-6 right-6">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-primary/50">
                      {item.title}
                    </p>

                    <p className="mt-3 text-2xl text-primary">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-primary/50">
                      Explore layer
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="world"
        className="relative h-[80vh] min-h-[600px] overflow-hidden"
      >
        <video
          src={media.atmosphere}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <Noise />

        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div>

            <p className="text-[9px] uppercase tracking-[0.5em] text-primary/60">
              Chapter 04
            </p>

            <h2 className="mt-6 text-6xl leading-[0.8] tracking-[-0.06em] text-primary sm:text-7xl md:text-[10vw]">
              THE NIGHT
              <br />
              <span className="font-serif italic text-primary/60">
                belongs to you.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-md text-xs leading-6 text-primary/60">
              Don't wear a fragrance because you want to be
              noticed. Wear one because you want to be
              remembered.
            </p>

          </div>
        </div>
      </section>

      <section
        id="collection"
        className="bg-[#0d0b0b] px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            <div className="lg:col-span-5">

              <p className="text-[9px] uppercase tracking-[0.4em] text-primary/50">
                The object
              </p>

              <h2 className="mt-5 text-5xl leading-[0.85] tracking-[-0.05em] md:text-7xl">
                Something
                <br />
                <span className="font-serif italic text-primary/60">
                  worth keeping.
                </span>
              </h2>

              <p className="mt-8 max-w-md text-sm leading-7 text-gray-500">
                A 50ml eau de parfum presented in a weighted
                glass bottle. Designed to feel like an object
                before it ever becomes a fragrance.
              </p>

              <div className="mt-8 grid max-w-md grid-cols-3 border-y border-white/10 py-5">

                <div>
                  <p className="text-2xl text-primary">
                    50
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                    ML
                  </p>
                </div>

                <div className="border-x border-white/10 text-center">
                  <p className="text-2xl text-primary">
                    24
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                    % OIL
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl text-primary">
                    12+
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                    HOURS
                  </p>
                </div>

              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="mt-9 flex items-center gap-4 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-medium text-black"
              >
                Add to collection

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
                  <ArrowRight
                    size={16}
                    color={cream}
                  />
                </span>
              </button>

            </div>

            <div className="relative lg:col-span-7">

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="relative mx-auto aspect-square max-w-[650px] overflow-hidden rounded-[2rem]"
              >

                <img
                  src={media.darkBottle}
                  alt="NOIRÉ bottle"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.65)_90%)]" />

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b2630] blur-[80px]"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">

                    <p className="text-[9px] uppercase tracking-[0.5em] text-primary/50">
                      NOIRÉ
                    </p>

                    <p className="mt-3 text-5xl tracking-[-0.06em] text-primary md:text-7xl">
                      001
                    </p>

                    <p className="mt-2 font-serif text-xl italic text-primary/50">
                      Obsidian
                    </p>

                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-5 py-32 text-center md:px-10 md:py-48">

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6B151C]/20 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl">

          <p className="text-[9px] uppercase tracking-[0.5em] text-primary/50">
            Final chapter
          </p>

          <h2 className="mt-8 text-[17vw] leading-[0.72] tracking-[-0.09em] text-primary md:text-[12vw]">
            REMEMBER
            <span className="font-serif italic text-primary/50">
              {" "}ME.
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-md text-sm leading-7 text-gray-500">
            The best fragrances don't fill a room.
            They create a reason to stay.
          </p>

          <button
            onClick={() => setCartOpen(true)}
            className="group mt-9 inline-flex items-center gap-5 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-medium text-black transition-all hover:gap-7"
          >
            Enter NOIRÉ

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
              <ArrowRight
                size={16}
                color={cream}
              />
            </span>
          </button>

        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-[9px] uppercase tracking-[0.2em] text-gray-600 md:flex-row md:items-center md:justify-between">

          <span className="text-sm tracking-[-0.05em] text-primary">
            NOIRÉ*
          </span>

          <span>
            Fragrance for after dark
          </span>

          <span>
            © 2026 NOIRÉ
          </span>

        </div>
      </footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] bg-black p-6 lg:hidden"
          >

            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 rounded-full bg-[#181515] p-3 text-primary"
            >
              <X size={18} />
            </button>

            <div className="flex h-full flex-col justify-center">

              {[
                ["Scent", "#scent"],
                ["Story", "#story"],
                ["Notes", "#notes"],
                ["World", "#world"],
                ["Collection", "#collection"],
              ].map(([name, href], index) => (
                <motion.a
                  key={name}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="border-b border-white/10 py-5 text-4xl text-primary"
                >
                  {name}
                </motion.a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md"
            />

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
              className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-[#111010] p-6"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-primary/40">
                    Your selection
                  </p>

                  <h3 className="mt-2 text-2xl text-primary">
                    NOIRÉ
                  </h3>
                </div>

                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full bg-[#211e1e] p-3 text-gray-400 hover:text-primary"
                >
                  <X size={18} />
                </button>

              </div>

              <div className="mt-10 flex gap-4">

                <img
                  src={media.darkBottle}
                  alt="NOIRÉ"
                  className="h-32 w-28 rounded-xl object-cover"
                />

                <div>

                  <p className="text-xl text-primary">
                    {current.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Eau de parfum · 50 ML
                  </p>

                  <p className="mt-5 text-sm text-primary">
                    $120
                  </p>

                  <div className="mt-4 flex items-center rounded-full border border-white/10">

                    <button
                      onClick={() =>
                        setQuantity(
                          Math.max(1, quantity - 1)
                        )
                      }
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <Minus size={13} />
                    </button>

                    <span className="px-3 text-xs text-primary">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity(quantity + 1)
                      }
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <Plus size={13} />
                    </button>

                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-4">

                {current.notes.map((note) => (
                  <div
                    key={note}
                    className="flex items-center gap-3 text-xs text-gray-500"
                  >
                    <Check
                      size={14}
                      className="text-primary"
                    />
                    {note}
                  </div>
                ))}

              </div>

              <div className="mt-auto">

                <div className="mb-5 flex justify-between border-t border-white/10 pt-5">

                  <span className="text-xs text-gray-500">
                    Total
                  </span>

                  <span className="text-primary">
                    ${120 * quantity}
                  </span>

                </div>

                <button
                  onClick={() => setCartOpen(false)}
                  className="flex w-full items-center justify-between rounded-full bg-primary px-6 py-3 text-sm font-medium text-black"
                >
                  Complete selection
                  <ArrowRight size={17} />
                </button>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}