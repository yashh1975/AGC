import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, GoldLink, Reveal, Section, SectionHeading } from "./primitives";
import { services, trustBar, type ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import necklace from "@/assets/jewel-necklace.png";
import ring from "@/assets/jewel-ring.png";
import bangle from "@/assets/jewel-bangle.png";
import earrings from "@/assets/jewel-earrings.png";
import chain from "@/assets/jewel-chain.png";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function TrustBar() {
  return (
    <div className="relative border-y border-gold/20 bg-ink/80 py-4 sm:py-6">
      <div aria-hidden className="absolute inset-0 light-sweep opacity-40" />
      <ul className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2.5 px-4 sm:px-8">
        {trustBar.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: isMobile ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0 : i * 0.05, duration: 0.4 }}
            className="flex items-center gap-1.5 sm:gap-2 text-[0.58rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-ivory/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          >
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold shrink-0 shadow-[0_0_6px_var(--gold)]" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function BrandIntro() {
  return (
    <Section id="about" labelledBy="about-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Glass panel — solid bg, no backdrop-blur (expensive GPU layer on iOS) */}
        <div className="rounded-2xl border border-gold/25 bg-[rgba(18,3,0,0.88)] p-5 xs:p-7 sm:p-10 shadow-2xl flex flex-col justify-between h-full">
          <div>
            <SectionHeading
              eyebrow="Anjaneya Gold Company"
              title={
                <span id="about-title">
                  More than gold. <span className="text-gold-metal">A trusted process.</span>
                </span>
              }
              copy="Every piece of gold carries value. Our job is to help you understand that value through a professional and transparent process."
            />
            <Reveal delay={0.15}>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-ivory/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                For over two decades we have served customers across Bangalore, Karnataka — buying
                gold at current market prices, releasing pledged gold, re-pledging and offering a
                convenient mobile service.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="mt-6 sm:mt-8">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <GoldLink href="#services" variant="ember" className="touch-manipulation text-xs px-5 py-3">
                Explore Our Services <Arrow />
              </GoldLink>
              <GoldLink href="#how-it-works" variant="outline" className="touch-manipulation text-xs px-5 py-3">
                See How It Works
              </GoldLink>
            </div>
          </Reveal>
        </div>

        {/* Feature Cards Column */}
        <div className="flex flex-col justify-between gap-3 sm:gap-4 h-full">
          {[
            {
              title: "German XRF Purity Testing",
              desc: "Accurate spectroscopic purity analysis for 22K and 24K gold with 100% non-destructive precision.",
              badge: "German Tech",
            },
            {
              title: "Live Spot Market Rates",
              desc: "100% transparent gold valuation directly linked to real-time market gold prices with no hidden cuts.",
              badge: "Fair Price",
            },
            {
              title: "Instant Bank IMPS / RTGS Settlement",
              desc: "Immediate fund transfer into your bank account or cash handover on the spot after verification.",
              badge: "Instant Transfer",
            },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              /* Mobile: opacity only — no X translate to avoid layout reflow */
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col justify-center rounded-xl border border-gold/20 bg-[rgba(18,3,0,0.82)] p-4 sm:p-5 transition-all hover:border-gold/50 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.58rem] sm:text-[0.6rem] font-mono uppercase tracking-[0.18em] text-gold bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded">
                  {feat.badge}
                </span>
                <span className="font-mono text-xs font-bold text-gold/60">0{i + 1}</span>
              </div>
              <h4 className="mt-2 font-display text-sm sm:text-base font-bold uppercase tracking-[0.06em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {feat.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const serviceVisual: Record<ServiceKey, { src: string; alt: string }> = {
  sell: { src: necklace, alt: "Gold necklace evaluated for cash" },
  release: { src: bangle, alt: "Gold bangle released from pledge" },
  repledge: { src: chain, alt: "Gold chain assessed for re-pledging" },
  mobile: { src: earrings, alt: "Gold earrings tested at your location" },
};

export function Services() {
  const [activeKey, setActiveKey] = useState<ServiceKey | null>(null);
  const active = (activeKey ? services.find((s) => s.key === activeKey) : null) || services[0]!;
  const visual = serviceVisual[activeKey || "sell"];

  return (
    <Section id="services" labelledBy="services-title" className="veil">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Services"
          title={<span id="services-title">Four ways we turn gold into value.</span>}
          copy="Select a service to follow its process from first evaluation to completion."
        />

        <div className="mt-10 sm:mt-14 grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.1fr] items-stretch">
          <ul className="flex flex-col justify-between gap-2.5 sm:gap-3 h-full" role="tablist" aria-label="Gold services">
            {services.map((s) => {
              const isActive = s.key === activeKey;
              return (
                <li key={s.key} className="flex-1 flex">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveKey((prev) => (prev === s.key ? null : s.key))}
                    className={cn(
                      "group w-full flex flex-col justify-center rounded-xl border px-4 py-3.5 sm:px-6 sm:py-5 text-left transition-all duration-300 touch-manipulation",
                      isActive
                        ? "border-gold/60 bg-card shadow-[var(--glow-gold)]"
                        : "border-border bg-card/40 hover:border-gold/40 hover:bg-card/70",
                    )}
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span
                        className={cn(
                          "font-display text-xs font-bold tracking-[0.2em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]",
                          isActive ? "text-gold" : "text-ivory/50",
                        )}
                      >
                        {s.index}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.05em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {s.title}
                      </h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-7 sm:pl-9 pt-2.5 sm:pt-3 text-xs sm:text-sm leading-relaxed text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                        >
                          {s.copy}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Service visual panel — no blur filter in AnimatePresence (kills GPU on mobile) */}
          <div className="relative h-full min-h-[22rem] sm:min-h-[26rem] overflow-hidden rounded-2xl border border-gold/25 bg-ink/75 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey || "default"}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-8"
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-32 sm:h-52 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                />
                <ol className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2">
                  {active.steps.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-center gap-2 sm:gap-3 text-[0.52rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-ivory/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    >
                      {step}
                      {i < active.steps.length - 1 ? (
                        <span aria-hidden className="text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                          →
                        </span>
                      ) : null}
                    </motion.li>
                  ))}
                </ol>
                <GoldLink href="#contact" variant="gold" size="sm" className="mt-6 sm:mt-8 touch-manipulation font-bold">
                  {active.cta} <Arrow />
                </GoldLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
