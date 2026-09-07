import { useState } from "react";
import { ArrowRight, Globe2, Menu, X, Instagram, Sparkles } from "lucide-react";
import AboutSection from "./components/AboutSection";
import FeaturedVideoSection from "./components/FeaturedVideoSection";
import UniverseExplorer from "./components/UniverseExplorer";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <HeroBackground />

        <div className="relative z-20 px-4 py-5 sm:px-6 sm:py-6">
          <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6 sm:py-3">
            <button onClick={() => scrollTo("top")} className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <Globe2 size={23} strokeWidth={1.7} />
              <span>CosmoExplorer</span>
            </button>

            <div className="ml-8 hidden items-center gap-8 md:flex">
              <button onClick={() => scrollTo("explore")} className="text-sm font-medium text-white/75 transition hover:text-white">Explore</button>
              <button onClick={() => scrollTo("missions")} className="text-sm font-medium text-white/75 transition hover:text-white">Missions</button>
              <button onClick={() => scrollTo("about")} className="text-sm font-medium text-white/75 transition hover:text-white">About</button>
            </div>

            <div className="hidden items-center gap-5 sm:flex">
              <button onClick={() => scrollTo("explore")} className="text-sm font-medium text-white/90 hover:text-white">Start exploring</button>
              <button onClick={() => scrollTo("explore")} className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white transition hover:bg-white/5">
                Enter cosmos
              </button>
            </div>

            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
              className="liquid-glass rounded-full p-2 sm:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </nav>

          {menuOpen && (
            <div className="liquid-glass mx-auto mt-2 flex max-w-5xl flex-col rounded-2xl p-2 sm:hidden">
              {[
                ["explore", "Explore the universe"],
                ["missions", "Space missions"],
                ["about", "About CosmoExplorer"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="rounded-xl px-4 py-3 text-left text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div id="top" className="relative z-10 flex flex-1 -translate-y-[8%] flex-col items-center justify-center px-5 py-12 text-center sm:-translate-y-[12%] md:-translate-y-[18%]">
          <p className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45 sm:text-xs">
            <Sparkles size={13} /> The interactive universe explorer
          </p>

          <h1 className="instrument max-w-6xl text-6xl leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Explore the cosmos <em className="italic text-white/60">all</em>.
          </h1>

          <form onSubmit={submitEmail} className="liquid-glass mt-9 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-5 pr-2">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
            <button type="submit" aria-label="Subscribe" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-5 max-w-xl px-4 text-sm leading-relaxed text-white/65">
            {submitted
              ? "You're connected. New cosmic discoveries will be waiting for you."
              : "Journey through planets, stars, galaxies, moons, black holes, missions and the mysteries beyond our solar system."}
          </p>

          <button onClick={() => scrollTo("explore")} className="liquid-glass mt-7 rounded-full px-8 py-3 text-sm font-medium text-white transition hover:bg-white/5">
            Start exploring <ArrowRight className="ml-2 inline-block" size={15} />
          </button>
        </div>

        <div className="relative z-10 flex justify-center gap-3 pb-8 sm:gap-4 sm:pb-12">
          <SocialButton label="Instagram"><Instagram size={19} /></SocialButton>
          <SocialButton label="Universe"><Globe2 size={19} /></SocialButton>
          <SocialButton label="Discover"><Sparkles size={19} /></SocialButton>
        </div>
      </section>

      <AboutSection />
      <FeaturedVideoSection />
      <UniverseExplorer />
      <PhilosophySection />
      <ServicesSection />

      <footer className="border-t border-white/10 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-medium"><Globe2 size={18} /> CosmoExplorer</div>
            <p className="mt-2 text-xs text-white/35">Your interactive atlas of everything beyond Earth.</p>
          </div>
          <p className="text-xs text-white/30">© 2026 CosmoExplorer. Keep looking up.</p>
        </div>
      </footer>
    </div>
  );
}

function HeroBackground() {
  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-0"
        muted autoPlay playsInline preload="auto" src={heroVideo}
        onCanPlay={(event) => {
          const video = event.currentTarget;
          void video.play();
          const start = performance.now();
          const fadeIn = (now: number) => {
            const progress = Math.min((now - start) / 500, 1);
            video.style.opacity = String(progress);
            if (progress < 1) requestAnimationFrame(fadeIn);
          };
          requestAnimationFrame(fadeIn);
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (video.duration && video.duration - video.currentTime <= 0.55 && video.dataset.fading !== "true") {
            video.dataset.fading = "true";
            const start = performance.now();
            const initial = Number(video.style.opacity || 1);
            const fadeOut = (now: number) => {
              const progress = Math.min((now - start) / 500, 1);
              video.style.opacity = String(initial * (1 - progress));
              if (progress < 1) requestAnimationFrame(fadeOut);
            };
            requestAnimationFrame(fadeOut);
          }
        }}
        onEnded={(event) => {
          const video = event.currentTarget;
          video.style.opacity = "0";
          video.dataset.fading = "false";
          window.setTimeout(() => {
            video.currentTime = 0;
            void video.play();
            const start = performance.now();
            const fadeIn = (now: number) => {
              const progress = Math.min((now - start) / 500, 1);
              video.style.opacity = String(progress);
              if (progress < 1) requestAnimationFrame(fadeIn);
            };
            requestAnimationFrame(fadeIn);
          }, 100);
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.25)_48%,rgba(0,0,0,.88)_100%)]" />
      <div className="star-field absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_18%,white_0_1px,transparent_1.5px),radial-gradient(circle_at_78%_22%,white_0_1px,transparent_1.5px),radial-gradient(circle_at_45%_72%,white_0_1px,transparent_1.5px),radial-gradient(circle_at_90%_78%,white_0_1px,transparent_1.5px)] [background-size:230px_190px,310px_270px,270px_230px,350px_310px]" />
    </>
  );
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button aria-label={label} className="liquid-glass rounded-full p-3.5 text-white/70 transition-all hover:bg-white/5 hover:text-white sm:p-4">
      {children}
    </button>
  );
}