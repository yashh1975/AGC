import { motion } from "framer-motion";
import { Arrow, GoldLink } from "./primitives";
import { business } from "@/lib/site";
import logo from "@/assets/logo.jpg";

/**
 * Hero section styled exactly like the reference image:
 * - Warm glowing amber-copper ambient background
 * - Delicate rotating orbital gold ring with ONE single glowing gold point
 * - Enhanced subtle natural shadow behind the text for crisp contrast
 * - Bigger logo, title, and subtitle
 * - Vertically centered button stack: "Explore Our Services" on top, "Call Us" directly below
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] min-h-[100dvh] flex-col items-center justify-center px-4 py-16 sm:py-20 text-center overflow-hidden"
      aria-label="Anjaneya Gold Company"
    >
      {/* 1. Radiant Terracotta-Amber Radiant Ambient Background (clean gradient without CPU blur filter) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden [transform:translate3d(0,0,0)]"
      >
        <div className="absolute h-[120vmin] w-[120vmin] max-w-[1300px] max-h-[1300px] rounded-full [background:radial-gradient(circle_at_50%_46%,rgba(240,110,15,0.45)_0%,rgba(190,70,5,0.28)_25%,rgba(120,35,2,0.12)_50%,transparent_72%)]" />
        <div className="absolute top-[8%] right-[8%] h-[65vmin] w-[65vmin] rounded-full [background:radial-gradient(circle,rgba(255,140,20,0.30)_0%,rgba(200,80,10,0.12)_35%,transparent_65%)]" />
      </div>

      {/* 2. Delicate Orbital Ring Framing with ONE Single Gold Point at top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center [transform:translate3d(0,0,0)]"
      >
        <div className="bangle-frame relative aspect-square h-[82vmin] w-[82vmin] max-w-[92vw] max-h-[92vw] rounded-full border border-gold/30 [box-shadow:0_0_40px_rgba(212,175,55,0.15),inset_0_0_50px_rgba(255,157,50,0.1)]">
          <span className="absolute inset-[3%] rounded-full border border-gold/20" />
          {/* Exactly ONE gold point at top-right (1 o'clock) */}
          <span className="absolute top-[7%] right-[32%] h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_#FFF0C2,0_0_20px_#FF9D32]" />
        </div>
      </div>

      {/* 3. Central Content: Larger Logo -> Larger Heading -> Centered Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[380px] xs:max-w-[480px] sm:max-w-3xl md:max-w-4xl px-3 sm:px-6 [transform:translate3d(0,0,0)]"
      >
        {/* Logo - Adaptive Responsive Sizing */}
        <img
          src={logo}
          alt="Anjaneya Gold Company logo"
          width={453}
          height={453}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="mb-3 sm:mb-4 h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full object-cover shadow-[0_0_20px_rgba(212,175,55,0.4)] ring-2 ring-gold/60 shrink-0"
        />

        {/* Company Name - Adaptive Responsive Sizing (desktop: text-7xl, mobile: text-4xl) */}
        <h1 className="text-balance font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.05em] sm:tracking-[0.07em] leading-[1.08] drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span className="text-gold-metal">{business.name}</span>
        </h1>

        {/* Subtitle - Adaptive Responsive Sizing */}
        <p className="mt-2 sm:mt-3 font-display text-xs xs:text-sm sm:text-lg md:text-xl font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-ivory/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
          {business.tagline}
        </p>

        {/* Action Buttons: Centered stack with "Call Us" directly below "Explore Our Services" */}
        <div className="mt-5 sm:mt-7 flex flex-col items-center justify-center gap-2.5 sm:gap-3 w-full">
          <GoldLink
            href="#services"
            variant="gold"
            size="md"
            className="shadow-[0_4px_25px_rgba(212,175,55,0.5)] text-xs sm:text-sm px-7 py-3 sm:px-9 sm:py-3.5 touch-manipulation font-bold uppercase tracking-wider min-w-[200px] sm:min-w-[240px] text-center"
          >
            Explore Our Services <Arrow />
          </GoldLink>
          <GoldLink
            href={business.phoneHref}
            variant="outline"
            size="md"
            className="bg-ink/60 border-gold/40 text-ivory hover:border-gold hover:bg-gold/15 backdrop-blur-md shadow-md text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3 touch-manipulation font-bold uppercase tracking-wider min-w-[150px] sm:min-w-[180px] text-center"
          >
            Call Us
          </GoldLink>
        </div>
      </motion.div>
    </section>
  );
}



