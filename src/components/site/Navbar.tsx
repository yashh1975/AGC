import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Arrow, GoldLink } from "./primitives";
import { navLinks, business } from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    let frameId = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActive(`#${visible.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.2 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      cancelAnimationFrame(frameId);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold/25 bg-ink/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_var(--orange-deep)]"
            : "bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
        >
          {/* Left Logo + Desktop Title */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Anjaneya Gold Company logo"
              width={453}
              height={453}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-1 ring-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
            />
            {/* Desktop Brand Text */}
            <span className="hidden font-display text-sm font-bold uppercase tracking-[0.18em] text-ivory sm:block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Anjaneya <span className="text-gold">Gold Company</span>
            </span>
          </a>

          {/* Mobile Exclusive Dead-Centered AGC Luxury Emblem (Matching Hero Font Style & Metallic Gold Gradient) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none sm:hidden flex items-center justify-center">
            <a href="#home" className="pointer-events-auto flex items-center justify-center">
              <span className="font-display text-xl xs:text-2xl font-black uppercase tracking-[0.22em] text-gold-metal select-none">
                AGC
              </span>
            </a>
          </div>

          <ul className="hidden items-center gap-6 xl:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  className={cn(
                    "relative font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]",
                    active === l.href ? "text-gold" : "text-ivory/85 hover:text-gold",
                  )}
                >
                  {l.label}
                  {active === l.href ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold shadow-[0_0_8px_var(--gold)]"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <GoldLink href="#contact" variant="gold" size="sm" className="hidden sm:inline-flex font-bold">
              Contact Us <Arrow />
            </GoldLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-gold/35 p-2.5 text-ivory transition-colors hover:bg-gold/10 xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] surface-ink flex flex-col overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div aria-hidden className="absolute inset-0 vignette grain opacity-90" />
            <div className="relative flex items-center justify-between px-5 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Anjaneya Gold Company logo"
                  width={453}
                  height={453}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/50"
                />
                <span className="font-display text-xs xs:text-sm font-bold uppercase tracking-[0.14em] text-ivory">
                  Anjaneya <span className="text-gold">Gold Company</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-gold/35 p-2.5 text-ivory touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <ul className="relative mt-4 flex flex-col gap-1 px-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3.5 font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-ivory hover:text-gold transition-colors touch-manipulation"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-6 flex flex-col gap-3 px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <GoldLink href="#contact" variant="gold" size="lg" className="w-full text-center touch-manipulation font-bold" onClick={() => setOpen(false)}>
                Contact Us <Arrow />
              </GoldLink>
              <GoldLink href={business.phoneHref} variant="outline" size="lg" className="w-full text-center touch-manipulation font-bold">
                Call {business.phone}
              </GoldLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
