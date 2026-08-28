import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, Gauge, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Arrow, GoldLink, Reveal, Section, SectionHeading } from "./primitives";
import { GoldParticles } from "./GoldParticles";
import { whyUs } from "@/lib/site";
import necklace from "@/assets/jewel-necklace.png";
import earrings from "@/assets/jewel-earrings.png";

export function PledgedGold() {
  return (
    <Section id="pledged-gold" labelledBy="pledged-title" className="veil">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 lg:grid-cols-2">
        <div className="relative order-2 aspect-auto min-h-[260px] sm:min-h-[340px] overflow-hidden rounded-2xl border border-gold/25 bg-ink/75 p-6 backdrop-blur-md shadow-2xl vignette lg:order-1">
          <GoldParticles density={0.3} />
          <img
            src={necklace}
            alt="Gold necklace released from pledge"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute inset-0 m-auto h-[55%] sm:h-[62%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          />
          <ol className="absolute inset-x-3 xs:inset-x-5 bottom-3 xs:bottom-5 flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-[0.52rem] sm:text-[0.55rem] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-ivory/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {["Pledged Gold", "Document", "Verification", "Release", "Transaction"].map((s, i, a) => (
              <li key={s} className="flex items-center gap-2 sm:gap-3">
                {s}
                {i < a.length - 1 ? (
                  <span aria-hidden className="text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Release Pledged Gold"
            title={
              <span id="pledged-title">
                Your gold is yours. <span className="text-gold-metal">Let&apos;s help you get it back.</span>
              </span>
            }
            copy="We specialise in releasing pledged gold from banks and other finance companies through a verified, transparent process."
          />
          <div className="mt-6 sm:mt-8">
            <GoldLink href="#contact" variant="ember" className="touch-manipulation text-xs px-5 py-3 font-bold">
              Learn About Gold Release <Arrow />
            </GoldLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function RepledgeGold() {
  return (
    <Section id="repledge" labelledBy="repledge-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Re-Pledge"
            title={<span id="repledge-title">Re-pledge your gold with confidence.</span>}
            copy="Need to re-pledge your gold for better terms or a higher loan amount? Our team helps you understand the options available to you."
          />
          <Reveal delay={0.12}>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-ivory/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {["Gold", "Assessment", "Re-Pledging"].map((s, i, a) => (
                <span key={s} className="flex items-center gap-2.5 sm:gap-4">
                  {s}
                  {i < a.length - 1 ? (
                    <span aria-hidden className="text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="mt-4 sm:mt-6 max-w-lg text-xs sm:text-sm text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              Explore your options with our team. Any re-pledging is subject to applicable
              evaluation and approval.
            </p>
            <div className="mt-6 sm:mt-8">
              <GoldLink href="#contact" variant="gold" className="touch-manipulation text-xs px-5 py-3 font-bold">
                Enquire Now <Arrow />
              </GoldLink>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-auto min-h-[260px] sm:min-h-[340px] overflow-hidden rounded-2xl border border-gold/20 bg-ink/75 p-6 backdrop-blur-md shadow-2xl vignette"
        >
          <img
            src={earrings}
            alt="Gold earrings assessed for re-pledging"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute inset-0 m-auto h-[50%] sm:h-[55%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </div>
    </Section>
  );
}

export function MobileService() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const vanX = useTransform(scrollYProgress, [0, 1], ["4%", "78%"]);
  const pathScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="mobile-service" labelledBy="mobile-title" className="veil">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Mobile Gold Service"
          title={<span id="mobile-title">Gold service that comes to you.</span>}
          copy="We come to your location to buy gold, conduct purity checks and complete transactions securely and efficiently."
        />

        <div
          ref={ref}
          className="relative mt-10 sm:mt-14 overflow-hidden rounded-2xl border border-gold/25 bg-ink/80 p-5 xs:p-6 sm:p-12 backdrop-blur-md vignette shadow-2xl"
        >
          <GoldParticles density={0.3} />
          <div className="relative h-20 sm:h-28">
            <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-ink/40" />
            <motion.div
              aria-hidden
              style={{ scaleX: pathScale }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-gold-light shadow-[0_0_16px_var(--gold)]"
            />
            <motion.div style={{ left: vanX }} className="absolute top-1/2 -translate-y-1/2">
              <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-ivory drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]" aria-hidden />
            </motion.div>
            <MapPin
              className="absolute right-2 sm:right-4 top-1/2 h-6 w-6 sm:h-7 sm:w-7 -translate-y-full text-ivory drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              aria-hidden
            />
          </div>

          <ol className="relative mt-4 sm:mt-6 flex flex-wrap justify-center gap-x-2.5 sm:gap-x-4 gap-y-2 text-[0.52rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-ivory/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {["Arrival", "Gold Testing", "Valuation", "Documentation", "Transaction"].map(
              (s, i, a) => (
                <li key={s} className="flex items-center gap-2 sm:gap-4">
                  {s}
                  {i < a.length - 1 ? (
                    <span aria-hidden className="text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      →
                    </span>
                  ) : null}
                </li>
              ),
            )}
          </ol>

          <div className="relative mt-7 sm:mt-9 text-center">
            <GoldLink href="#contact" variant="gold" className="touch-manipulation text-xs px-5 py-3 font-bold">
              Book Mobile Service <Arrow />
            </GoldLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

const whyIcons = [ShieldCheck, Gauge, BadgeCheck, Truck] as const;

export function WhyUs() {
  return (
    <Section id="why-us" labelledBy="why-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Why Us"
          title={<span id="why-title">Why choose Anjaneya Gold Company?</span>}
        />
        <div className="mt-10 sm:mt-14 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length]!;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative bg-ink/85 p-5 xs:p-6 sm:p-7 transition-colors duration-300 hover:bg-ink/95 shadow-xl flex flex-col justify-start"
              >
                {/* Icon and Title in ONE single horizontal line */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-display text-xs xs:text-sm sm:text-sm font-bold uppercase tracking-[0.06em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Subtitle / copy directly below */}
                <p className="mt-3 sm:mt-3.5 text-xs sm:text-xs leading-relaxed text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {item.copy}
                </p>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function YearsExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="years-title"
      className="relative overflow-hidden veil border-y border-gold/20 px-4 py-16 sm:py-28 text-center sm:px-8"
    >
      <GoldParticles density={0.5} drift={0.3} />
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, scale: 0.85, filter: "blur(18px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.85, filter: "blur(18px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-8xl md:text-9xl font-bold leading-none text-gold-metal drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          20+
        </motion.p>
        <h2
          id="years-title"
          className="mt-3 sm:mt-4 font-display text-base sm:text-lg font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-ivory drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          Years of Experience
        </h2>
        <p className="mt-2 sm:mt-4 font-display text-lg sm:text-2xl text-gold-light/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">Turning gold into value.</p>
      </div>
    </section>
  );
}
