import { motion } from "framer-motion";
import { ArrowUpRight, Telescope, Rocket } from "lucide-react";

const cards = [
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    tag: "Observe",
    title: "Stars & Galaxies",
    description: "Travel beyond our solar system and discover stellar nurseries, supergiants, spiral galaxies and the structure of the universe.",
    icon: Telescope,
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    tag: "Journey",
    title: "Missions & Discovery",
    description: "Follow humanity's robotic and scientific missions as they cross planetary frontiers and send knowledge home.",
    icon: Rocket,
  },
];

export default function ServicesSection() {
  return (
    <section id="missions" className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .7 }}
          className="relative mb-12 flex items-end justify-between md:mb-16">
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">What we explore</h2>
          <span className="hidden text-sm text-white/40 sm:block">Beyond the horizon</span>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article key={card.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .8, delay: index * .15 }}
                className="liquid-glass group overflow-hidden rounded-3xl">
                <div className="relative aspect-video overflow-hidden">
                  <video className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted autoPlay loop playsInline preload="auto" src={card.video} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[.25em] text-white/40"><Icon size={14} /> {card.tag}</span>
                    <span className="liquid-glass rounded-full p-2 text-white/75"><ArrowUpRight size={17} /></span>
                  </div>
                  <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{card.title}</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-white/50">{card.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}