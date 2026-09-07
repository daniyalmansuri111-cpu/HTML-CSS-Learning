import { motion } from "framer-motion";

const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export default function PhilosophySection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: .8 }}
          className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl">
          Universe <em className="instrument italic text-white/40">x</em> Curiosity
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .8 }} className="aspect-[4/3] overflow-hidden rounded-3xl">
            <video className="h-full w-full object-cover" muted autoPlay loop playsInline preload="auto" src={video} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, delay: .08 }} className="flex flex-col justify-center">
            <div className="pb-10">
              <p className="mb-4 text-xs uppercase tracking-[.25em] text-white/40">Choose your destination</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                From familiar planets to galaxies millions of light-years away, every destination
                gives us a new perspective on where we came from and what might exist beyond.
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="pt-10">
              <p className="mb-4 text-xs uppercase tracking-[.25em] text-white/40">Shape your curiosity</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                Explore the objects, missions and cosmic phenomena that expand our understanding of
                space — then keep going. There is always another world to discover.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}