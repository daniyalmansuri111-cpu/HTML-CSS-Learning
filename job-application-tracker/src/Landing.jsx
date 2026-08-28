import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4";

const navItems = [
  "Applications",
  "Interviews",
  "Analytics",
  "Resources",
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Background Video */}
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* ================= NAVBAR ================= */}

        <nav className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[#010101] lg:text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 256"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
            </svg>

            <span className="text-lg font-semibold">
              JobTrack
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden items-center gap-3 md:flex">

            <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">

              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item}

                  {item === "Analytics" && (
                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                    />
                  )}
                </a>
              ))}

            </div>


            {/* Get Started */}
            <Link
              to="/dashboard"
              className="flex self-stretch items-center rounded-full bg-[linear-gradient(to_bottom,#2B2B2B,#101010)] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get started
            </Link>

          </div>


          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg md:hidden"
          >

            <Menu
              size={20}
              strokeWidth={1.8}
              className={`absolute text-[#010101] transition-all duration-300 ${
                menuOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />

            <X
              size={20}
              strokeWidth={1.8}
              className={`absolute text-[#010101] transition-all duration-300 ${
                menuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />

          </button>

        </nav>


        {/* ================= MOBILE MENU ================= */}

        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />


        {/* Drawer */}
        <aside
          className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-black/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          <div className="flex flex-col gap-2 px-6 pt-24">

            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen
                    ? "translateX(0)"
                    : "translateX(24px)",
                  transition: `opacity 400ms ease ${
                    (index + 1) * 60
                  }ms, transform 400ms ease ${
                    (index + 1) * 60
                  }ms`,
                }}
              >

                <span>{item}</span>

                {item === "Analytics" && (
                  <ChevronDown
                    size={17}
                    strokeWidth={1.8}
                  />
                )}

              </a>
            ))}

          </div>


          {/* Mobile CTA */}
          <div
            className="mt-auto px-6 pb-10 transition-all duration-400"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen
                ? "translateY(0)"
                : "translateY(16px)",
              transitionDelay: menuOpen
                ? "300ms"
                : "0ms",
            }}
          >

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(to_bottom,#2B2B2B,#101010)] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get started
            </Link>

          </div>

        </aside>


        {/* ================= HERO CONTENT ================= */}

        <main className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">

          {/* LEFT SIDE */}

          <div className="max-w-xl">

            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-[#010101] sm:text-4xl lg:text-[3.5rem] lg:text-white">
              Turn every job application into your next opportunity
            </h1>


            {/* CTA */}

            <Link
              to="/dashboard"
              className="mt-6 inline-flex rounded-full bg-white p-1.5 sm:mt-8"
            >

              <span className="rounded-full bg-[linear-gradient(to_bottom,#2B2B2B,#101010)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:py-2.5">
                Start tracking
              </span>

            </Link>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">

            {/* ================= STATS CARD ================= */}

            <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">

              <div>

                <div className="[font-family:'Silkscreen',cursive] text-3xl font-normal tracking-tight text-[#010101] sm:text-4xl lg:text-white">
                  42,500+
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#010101]/70 sm:mt-4 lg:text-white/70">
                  Candidates use JobTrack to organize applications,
                  interviews, and career progress.
                </p>

              </div>


              <div className="mt-6 flex items-center gap-2 text-xs text-[#010101]/60 lg:text-white/60">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                Applications organized

              </div>

            </div>


            {/* ================= CAREER PULSE ================= */}

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">

              {/* Header */}

              <div className="mb-3 flex items-center gap-2 sm:mb-4">

                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">
                  J
                </div>

                <span className="text-sm font-semibold text-[#010101] lg:text-white">
                  Career Pulse
                </span>

              </div>


              {/* Quote */}

              <p className="text-sm leading-relaxed text-[#010101]/80 lg:text-white/80">
                "I stopped losing track of applications and finally
                knew exactly which opportunities needed my attention."
              </p>


              {/* Profile */}

              <div className="mt-4 flex items-center gap-3 sm:mt-5">

                <img
                  src="https://i.pravatar.cc/72?img=12"
                  alt="Sara Klein"
                  className="h-9 w-9 rounded-full bg-white/20 object-cover"
                />

                <div>

                  <p className="text-sm font-semibold text-[#010101] lg:text-white">
                    Sara Klein
                  </p>

                  <p className="text-xs text-[#010101]/60 lg:text-white/60">
                    Software Engineer
                  </p>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </section>
  );
}

export default Landing;