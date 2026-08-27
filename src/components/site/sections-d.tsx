import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Arrow, GoldLink, Section, SectionHeading } from "./primitives";
import {
  business,
  faqs,
  mapsDirections,
  mapsEmbed,
  testimonials,
  whatsappHref,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="faq" labelledBy="faq-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title={<span id="faq-title">Questions, answered plainly.</span>}
        />
        <ul className="mt-12 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="overflow-hidden rounded-xl border border-border bg-card/50">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-sm font-bold uppercase tracking-[0.05em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors hover:text-gold"
                  >
                    {f.q}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-4 w-4 shrink-0 text-gold transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ivory/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function Testimonials() {
  const rail = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: number) => {
    rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <Section id="testimonials" labelledBy="testimonials-title" className="veil">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <SectionHeading
            eyebrow="Testimonials"
            title={<span id="testimonials-title">What our clients say.</span>}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous testimonials"
              className="rounded-full border border-gold/35 px-4 py-2 text-ivory transition-colors hover:bg-gold/10 touch-manipulation min-h-[40px] min-w-[40px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next testimonials"
              className="rounded-full border border-gold/35 px-4 py-2 text-ivory transition-colors hover:bg-gold/10 touch-manipulation min-h-[40px] min-w-[40px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
            >
              →
            </button>
          </div>
        </div>

        <ul
          ref={rail}
          className="mt-8 sm:mt-12 flex snap-x snap-mandatory gap-4 sm:gap-5 overflow-x-auto pb-4 overscroll-x-contain touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.55 }}
              className="relative w-[82vw] xs:w-[85vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card/90 p-5 xs:p-6 sm:p-8 sm:w-[22rem] shadow-lg"
            >
              <span aria-hidden className="font-display text-3xl sm:text-4xl text-gold/40">
                “
              </span>
              <blockquote className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ivory/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                {t.quote}
              </blockquote>
              <footer className="mt-4 sm:mt-6">
                <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.1em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {t.name}
                </p>
                <p className="mt-0.5 sm:mt-1 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {t.category}
                </p>
              </footer>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px gold-hairline" />
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function QuoteAndContact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="veil">
      <div aria-hidden className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Contact Us"
          title={<span id="contact-title">Visit our branch or get in touch.</span>}
          copy="Have questions about your gold, purity verification, or releasing pledged gold? Connect with our team directly or visit our branch in Bangalore."
        />

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-2 items-stretch">
          {/* Company Details & Direct Connect Card */}
          <div className="glass-panel rounded-2xl p-6 xs:p-7 sm:p-9 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Anjaneya Gold Company logo"
                  width={453}
                  height={453}
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover shadow-[var(--glow-gold)] ring-2 ring-gold/40 shrink-0"
                />
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-ivory drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                    {business.name}
                  </h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    {business.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <GoldLink href={business.phoneHref} variant="ember" size="sm" className="touch-manipulation font-bold">
                  <Phone className="h-3.5 w-3.5" aria-hidden /> Call Us
                </GoldLink>
                <GoldLink
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  className="touch-manipulation font-bold"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp Us
                </GoldLink>
                <a
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Anjaneya Gold Company on Facebook"
                  title="Facebook"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gold/40 bg-ink/70 text-ivory/90 hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-sm touch-manipulation"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Anjaneya Gold Company on Instagram"
                  title="Instagram"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gold/40 bg-ink/70 text-ivory/90 hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-sm touch-manipulation"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              <address className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 not-italic text-xs sm:text-sm text-ivory/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {business.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a href={business.phoneHref} className="hover:text-gold touch-manipulation">
                    {business.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <a href={`mailto:${business.email}`} className="break-all hover:text-gold touch-manipulation">
                    {business.email}
                  </a>
                </p>
                <p className="text-xs text-ivory/70 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Branch timings: {business.timings}</p>
              </address>
            </div>
          </div>

          {/* Google Maps Embed Frame — Stretched to Equal Height with Contact Details Card */}
          <div className="overflow-hidden rounded-2xl border border-gold/30 bg-[#180500] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.15)] flex flex-col h-full min-h-[340px] sm:min-h-[380px]">
            <div className="relative flex-1 w-full h-full bg-[#180500] overflow-hidden min-h-[240px]">
              <iframe
                title="Anjaneya Gold Company location on Google Maps"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:invert(92%)_hue-rotate(180deg)_brightness(85%)_contrast(110%)_saturate(140%)_sepia(35%)] transition-all duration-300"
              />
            </div>
            <div className="bg-card border-t border-gold/20 p-3.5 sm:p-4 text-center backdrop-blur-md shrink-0">
              <GoldLink
                href={mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                size="sm"
                className="touch-manipulation font-bold"
              >
                Get Directions on Google Maps <Arrow />
              </GoldLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  const [policyModal, setPolicyModal] = useState<"privacy" | "terms" | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPolicyModal(null);
    };
    if (policyModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [policyModal]);

  return (
    <footer className="relative border-t border-gold/20 bg-background px-4 py-12 sm:px-8 sm:py-14 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Anjaneya Gold Company logo"
          width={453}
          height={453}
          loading="lazy"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover ring-2 ring-gold/40 shadow-[var(--glow-gold)]"
        />

        {/* Company Name */}
        <h3 className="mt-3.5 sm:mt-4 font-display text-lg xs:text-xl sm:text-2xl font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-ivory drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          {business.name}
        </h3>

        {/* Subname / Tagline */}
        <p className="mt-0.5 sm:mt-1 font-display text-sm sm:text-lg text-gold-metal font-medium drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
          {business.tagline}
        </p>

        {/* Social Icons in Center */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3 sm:gap-3.5">
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Follow us on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-ivory hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-md touch-manipulation"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href={business.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Follow us on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-ivory hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-md touch-manipulation"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-ivory hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-md touch-manipulation"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={business.phoneHref}
            aria-label="Phone"
            title="Call Us"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-ivory hover:border-gold hover:text-gold hover:bg-gold/15 transition-all shadow-md touch-manipulation"
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
        </div>

        {/* Divider & Copyright - Strictly Single Line on Desktop, Clean Wrap on Mobile */}
        <div className="mt-6 sm:mt-8 flex w-full max-w-4xl flex-wrap sm:flex-nowrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-border/80 pt-5 sm:pt-6 text-center text-[0.65rem] xs:text-[0.7rem] sm:text-xs text-ivory/50 whitespace-normal sm:whitespace-nowrap leading-relaxed">
          <span>© 2026 Anjaneya Gold Company. All rights reserved.</span>
          <span className="hidden sm:inline text-gold/40">•</span>
          <button
            type="button"
            onClick={() => setPolicyModal("privacy")}
            className="hover:text-gold transition-colors underline-offset-4 hover:underline cursor-pointer touch-manipulation"
          >
            Privacy Policy
          </button>
          <span className="text-gold/40">•</span>
          <button
            type="button"
            onClick={() => setPolicyModal("terms")}
            className="hover:text-gold transition-colors underline-offset-4 hover:underline cursor-pointer touch-manipulation"
          >
            Terms of Service
          </button>
          <span className="hidden sm:inline text-gold/40">•</span>
          <span>Designed &amp; Developed by Yash</span>
        </div>
      </div>

      {/* Interactive Privacy Policy & Terms of Service Modal */}
      <AnimatePresence>
        {policyModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
          >
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPolicyModal(null)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-gold/35 bg-card/95 p-6 sm:p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-xl touch-pan-y"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 id="policy-modal-title" className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-ivory">
                    {policyModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
                  </h2>
                  <p className="mt-0.5 text-xs text-gold">Anjaneya Gold Company • Values Your Gold</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPolicyModal(null)}
                  aria-label="Close modal"
                  className="rounded-full border border-gold/30 p-2 text-ivory hover:bg-gold/15 transition-colors touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-ivory/85">
                {policyModal === "privacy" ? (
                  <>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">1. Information We Collect</h3>
                      <p>
                        At Anjaneya Gold Company, we collect customer information strictly required to process gold valuation, purchasing, and pledged gold release services. This includes your full name, contact number, email address, physical address, and valid government-issued photo identification (such as Aadhaar, PAN card, or Voter ID) as mandated under statutory Indian gold trading laws.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">2. Purpose of Data Use</h3>
                      <p>
                        Your information is utilized solely for customer verification, legal ownership authentication, transparent invoicing, transaction security, and direct communication regarding your gold inquiry or scheduled branch appointment.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">3. Confidentiality &amp; Data Protection</h3>
                      <p>
                        We maintain strict physical, electronic, and administrative safeguards to protect your personal information and transaction records. We never sell, lease, or distribute your private records to third parties or marketing agencies.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">4. Statutory Disclosures</h3>
                      <p>
                        Customer transaction records may only be disclosed to authorized law enforcement or tax authorities when strictly required by applicable legal frameworks and regulations of the Government of India.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">5. Contact Information</h3>
                      <p>
                        For any privacy-related questions or data requests, please contact us directly at <span className="text-gold font-medium">{business.email}</span> or by calling <span className="text-gold font-medium">{business.phone}</span>.
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">1. Non-Destructive XRF Evaluation</h3>
                      <p>
                        All gold testing at Anjaneya Gold Company is carried out using advanced German XRF testing equipment and calibrated digital micro-scales in direct view of the customer to ensure 100% transparency.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">2. Valuation &amp; Market Pricing</h3>
                      <p>
                        Valuation offers are computed based on the prevailing live market gold rates, verified purity karatage (e.g. 22K/91.6% or 24K/99.9%), and net gold weight excluding any non-gold attachments, stones, or enamel.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">3. Ownership &amp; Identification Requirements</h3>
                      <p>
                        Customers must be at least 18 years of age and the rightful, lawful owner of all gold presented. Submission of valid government-issued photo ID and address proof is mandatory before completing any gold sale or release transaction.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">4. Pledged Gold Release Services</h3>
                      <p>
                        Assistance with releasing pledged gold from banks or financial institutions is subject to prior verification of official pawn tickets, loan foreclosure statements, and mutual agreement before our representative accompanies you to the financial institution.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-gold uppercase tracking-wider text-xs mb-1">5. Transaction Finality</h3>
                      <p>
                        Once the customer confirms acceptance of the valuation and instant settlement is executed via bank transfer (IMPS/NEFT/UPI) or cash payment, the sale transaction is final, conclusive, and non-reversible.
                      </p>
                    </section>
                  </>
                )}
              </div>

              {/* Close Button Footer */}
              <div className="mt-6 border-t border-border pt-4 text-right">
                <button
                  type="button"
                  onClick={() => setPolicyModal(null)}
                  className="rounded-lg border border-gold/40 bg-gold/15 px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-ivory hover:bg-gold hover:text-ink transition-colors touch-manipulation cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Anjaneya Gold Company on WhatsApp"
      className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 sm:right-5 z-50 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-gold/40 bg-ink/85 p-3 sm:p-3.5 text-gold shadow-[var(--glow-gold)] backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 touch-manipulation"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
    </a>
  );
}
