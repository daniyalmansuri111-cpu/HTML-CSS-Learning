import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Orbit, Stars, Telescope } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-black px-6 pb-12 pt-32 md:pb-14 md:pt-44">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }}
          className="flex items-center gap-2 text-sm uppercase tracking-[.28em] text-white/40">
          <Stars size={15} /> About CosmoExplorer
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, delay: .1 }}
          className="mt-7 max-w-6xl text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Pioneering <em className="instrument italic text-white/60">curiosity</em> for
          <br className="hidden md:block" />
          <em className="instrument italic text-white/60">minds that look beyond Earth.</em>
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7, delay: .25 }}
          className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            [Orbit, "Planets", "Worlds to visit"],
            [Stars, "Stars", "Suns across space"],
            [Telescope, "Deep Space", "Galaxies & beyond"],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Orbit;
            return (
              <div key={String(title)} className="liquid-glass rounded-2xl p-5">
                <I size={20} className="text-white/70" />
                <p className="mt-5 text-sm font-medium text-white">{String(title)}</p>
                <p className="mt-1 text-xs text-white/35">{String(text)}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}