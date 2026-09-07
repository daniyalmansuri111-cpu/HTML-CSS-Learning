import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

export default function FeaturedVideoSection() {
  return (
    <section className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} transition={{ duration: .9 }}
        className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl">
        <video className="h-full w-full object-cover" muted autoPlay loop playsInline preload="auto" src={video} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 p-5 md:flex-row md:items-end md:justify-between md:p-10">
          <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[.25em] text-white/50">
              <Play size={12} /> Deep Space
            </p>
            <p className="text-sm leading-relaxed text-white md:text-base">
              Zoom out from our home planet and enter a universe of stars, galaxies, nebulae and
              worlds. This is your visual gateway to everything beyond Earth.
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
            onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass flex w-fit items-center gap-3 rounded-full px-8 py-3 text-sm font-medium text-white">
            Explore the atlas <ArrowUpRight size={17} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}