import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Arrow, GoldLink, Reveal, Section, SectionHeading } from "./primitives";
import { GoldParticles } from "./GoldParticles";
import { howItWorks } from "@/lib/site";
import goldBar from "@/assets/gold-bar.png";
import chain from "@/assets/jewel-chain.png";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  // On mobile: skip useScroll — just show full line statically. No scroll listener = no stutter.
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0, 1]);

  return (
    <Section id="how-it-works" labelledBy="how-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="How It Works"
          align="center"
          title={
            <span id="how-title">
              From gold to value — <span className="text-gold-metal">simple and transparent.</span>
            </span>
          }
        />

        <div ref={ref} className="relative mt-12 sm:mt-16">
          <div aria-hidden className="absolute bottom-0 left-5 sm:left-7 top-0 w-0.5 -translate-x-1/2 bg-gold/15" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-5 sm:left-7 top-0 w-0.5 -translate-x-1/2 origin-top bg-gold shadow-[0_0_12px_var(--gold)]"
          />

          <ol className="space-y-6 sm:space-y-8">
            {howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="relative flex items-start gap-4 sm:gap-6 pl-10 sm:pl-14">
                  <span
                    aria-hidden
                    className="absolute left-5 sm:left-7 top-1.5 sm:top-2 h-4 w-4 sm:h-5 sm:w-5 -translate-x-1/2 rounded-full border border-gold bg-ink shadow-[0_0_10px_var(--gold)]"
                  />
                  <div className="flex-1 rounded-2xl border border-gold/20 bg-[rgba(18,3,0,0.85)] p-5 xs:p-6 sm:p-7 shadow-xl">
                    <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {step.n}
                    </span>
                    <h3 className="mt-1.5 sm:mt-2 font-display text-base sm:text-lg font-bold text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {step.copy}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export function XRFTesting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : ref,
    offset: ["start 85%", "end 15%"],
  });

  // Mobile: static positions. Desktop: scroll-driven.
  const beamY = useTransform(scrollYProgress, [0, 1], isMobile ? ["45%", "45%"] : ["4%", "86%"]);
  const purityWidth = useTransform(scrollYProgress, [0.06, 0.55], isMobile ? ["75%", "75%"] : ["0%", "91.6%"]);
  const weightWidth = useTransform(scrollYProgress, [0.1, 0.6], isMobile ? ["70%", "70%"] : ["0%", "85%"]);

  return (
    <Section id="gold-testing" labelledBy="xrf-title" className="veil">
      <div className="mx-auto grid max-w-5xl items-center gap-8 sm:gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Gold Testing"
            title={<span id="xrf-title">Precision begins with testing.</span>}
            copy="We evaluate your gold using a German XRF Gold Testing Machine for a 99% purity check — hallmarked or not."
          />
        </div>

        <div
          ref={ref}
          className="relative min-h-[380px] xs:min-h-[420px] sm:min-h-[470px] overflow-hidden rounded-2xl border border-gold/30 bg-ink shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between"
        >
          {/* Ambient Warm Scanner Radial Glow */}
          <div
            aria-hidden
            className="absolute inset-0 [background:radial-gradient(60%_45%_at_50%_35%,color-mix(in_oklab,var(--orange-deep)_55%,transparent),transparent_75%)]"
          />

          {/* Gridlines background */}
          <div
            aria-hidden
            className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,transparent_0_23px,color-mix(in_oklab,var(--gold)_7%,transparent)_23px_24px)] pointer-events-none z-0"
          />

          {/* Center Scan Visual */}
          <div className="relative flex-1 flex items-center justify-center p-4 min-h-[200px] xs:min-h-[230px] sm:min-h-[270px] overflow-hidden">
            <img
              src={chain}
              alt="Gold chain positioned inside XRF testing equipment"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-32 xs:h-40 sm:h-48 w-auto object-contain opacity-95 drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] z-0"
            />

            <motion.div
              aria-hidden
              style={{ top: beamY }}
              className="absolute inset-x-0 pointer-events-none z-10 flex flex-col items-center"
            >
              <div className="h-5 sm:h-7 w-full [background:linear-gradient(180deg,transparent_0%,rgba(212,175,55,0.09)_100%)]" />
              <div className="relative h-[1.5px] sm:h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_6px_rgba(212,175,55,0.6)]">
                <div className="absolute left-1/2 -top-[1px] sm:-top-[1.5px] -translate-x-1/2 h-[3.5px] sm:h-[4.5px] w-14 sm:w-16 rounded-full bg-gold-light/90 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
              </div>
              <div className="h-4 sm:h-5 w-full [background:linear-gradient(180deg,rgba(212,175,55,0.07)_0%,transparent_100%)]" />
            </motion.div>
          </div>

          {/* Readout — solid bg, no backdrop-blur */}
          <div className="relative z-20 border-t border-gold/20 bg-[rgba(18,3,0,0.92)] p-4 sm:p-5">
            <p className="text-xs sm:text-sm font-semibold text-ivory drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">German XRF Purity Analysis</p>

            <div className="mt-3 space-y-3.5">
              <div className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.14em] text-ivory/80">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-ivory/70">Purity Reading</span>
                  <span className="font-mono text-gold-light font-bold text-[0.65rem] sm:text-[0.72rem] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    91.6% (22K) · 99.9% (24K)
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 sm:h-2 w-full rounded-full bg-ivory/10 overflow-hidden">
                  <motion.div
                    style={{ width: purityWidth }}
                    className="h-full rounded-full bg-gradient-to-r from-amber via-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  />
                </div>
              </div>

              <div className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.14em] text-ivory/80">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-ivory/70">Weight</span>
                  <span className="font-mono text-gold-light font-bold text-[0.65rem] sm:text-[0.72rem] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    Accurate to 0.01g
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 sm:h-2 w-full rounded-full bg-ivory/10 overflow-hidden">
                  <motion.div
                    style={{ width: weightWidth }}
                    className="h-full rounded-full bg-gradient-to-r from-amber via-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Valuation() {
  return (
    <Section id="valuation" labelledBy="valuation-title" className="veil">
      <GoldParticles className="opacity-40" density={isMobile ? 0 : 0.4} />
      <div className="relative mx-auto max-w-5xl text-center">
        <SectionHeading
          align="center"
          eyebrow="Valuation"
          title={<span id="valuation-title">Fair value starts with accurate assessment.</span>}
          copy="Purity, weight and applicable market conditions come together into one transparent number, explained to you before you decide."
        />

        <div className="mt-10 sm:mt-14 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          {[
            { k: "Purity", v: "XRF verified" },
            { k: "Weight", v: "Calibrated scale" },
            { k: "Market Conditions", v: "Current rate applied" },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: isMobile ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.6 }}
              className="rounded-xl border border-gold/25 bg-[rgba(18,3,0,0.85)] p-4.5 sm:p-6 shadow-xl"
            >
              <p className="eyebrow text-xs drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{item.k}</p>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg font-bold text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">{item.v}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto mt-8 sm:mt-12 max-w-lg overflow-hidden rounded-2xl border border-gold/30 bg-ink/80 p-6 sm:p-10 light-sweep shadow-2xl">
            <img
              src={goldBar}
              alt="Gold bar representing assessed value"
              width={1024}
              height={1024}
              loading="lazy"
              className="mx-auto h-24 sm:h-28 w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
            />
            <p className="relative mt-4 sm:mt-6 font-display text-2xl sm:text-3xl font-bold text-ivory drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">Your Valuation</p>
            <p className="relative mt-2 text-xs leading-relaxed text-ivory/85 px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              Final valuation is subject to physical inspection, purity testing, weight verification
              and applicable market conditions.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <GoldLink href="#contact" variant="gold" size="lg" className="touch-manipulation text-xs px-6 py-3.5 font-bold">
              Know What Your Gold Is Worth <Arrow />
            </GoldLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
