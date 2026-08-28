import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoldParticles } from "./GoldParticles";
import ring from "@/assets/jewel-ring.png";
import necklace from "@/assets/jewel-necklace.png";
import bangle from "@/assets/jewel-bangle.png";
import earrings from "@/assets/jewel-earrings.png";
import chain from "@/assets/jewel-chain.png";
import goldBar from "@/assets/gold-bar.png";
import handsReceive from "@/assets/hands-receive-cash.png";

export function GoldJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobileDevice(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Only run GSAP ScrollTrigger on desktop — on mobile use pure CSS for zero-interrupt native scrolling
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const el = root.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });

    let ctx: gsap.Context | null = null;
    let timerId: number | undefined;

    const setup = () => {
      const testimonialsEl = document.getElementById("testimonials");
      if (!testimonialsEl) {
        timerId = window.setTimeout(setup, 50);
        return;
      }

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const R = Math.min(window.innerWidth, window.innerHeight) * 0.28;

        gsap.set(
          q(".gj-ring, .gj-chain, .gj-earrings, .gj-necklace, .gj-heat, .gj-furnace, .gj-molten, .gj-mould, .gj-bar, .gj-hand-group, .gj-burst"),
          { autoAlpha: 0 },
        );
        gsap.set(q(".gj-bangle"), { autoAlpha: 1, scale: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            endTrigger: testimonialsEl,
            end: "bottom top",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(q(".gj-orbit"), { rotate: 0 }, { rotate: 360, duration: 100 }, 0);
        tl.fromTo(q(".gj-scene"), { scale: 1.01 }, { scale: 0.99, duration: 100 }, 0);
        tl.to(q(".gj-bangle"), { scale: 0.95, duration: 14 }, 0);

        const joins: Array<[string, number, number, number]> = [
          [".gj-ring", R, -R * 0.55, 14],
          [".gj-chain", R * 0.92, R * 0.62, 17],
          [".gj-earrings", -R * 0.92, R * 0.62, 20],
          [".gj-necklace", -R, -R * 0.55, 23],
        ];
        for (const [sel, x, y, at] of joins) {
          tl.fromTo(q(sel), { x: x * 3.2, y: y * 2.4, autoAlpha: 0, scale: 0.5 },
            { x, y, autoAlpha: 1, scale: 0.85, duration: 5, ease: "power2.out" }, at);
        }

        tl.fromTo(q(".gj-heat"), { autoAlpha: 0 }, { autoAlpha: 0.35, duration: 3 }, 48);
        tl.fromTo(q(".gj-furnace"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 0.4, scale: 1, duration: 3 }, 48);
        tl.to(q(".gj-jewel, .gj-bangle"), { x: 0, y: 0, scale: 0.75, duration: 3.5, ease: "power2.inOut" }, 50);
        tl.to(q(".gj-jewel, .gj-bangle"), { scaleY: 0.35, scaleX: 1.2, autoAlpha: 0, duration: 3, ease: "power2.in" }, 53.5);
        tl.fromTo(q(".gj-molten"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 0.55, scale: 1, duration: 2.5 }, 54.5);
        tl.fromTo(q(".gj-mould"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 2 }, 56.5);
        tl.to(q(".gj-pour"), { scaleY: 1, duration: 2 }, 57);
        tl.to(q(".gj-molten"), { autoAlpha: 0, y: 80, scale: 0.4, duration: 2 }, 58);
        tl.to(q(".gj-fill"), { scaleY: 1, duration: 2 }, 58);
        tl.fromTo(q(".gj-bar"), { autoAlpha: 0, y: 60, scale: 0.6, rotate: -8 },
          { autoAlpha: 1, y: 0, scale: 1.05, rotate: 3, duration: 3.5, ease: "power2.out" }, 60);
        tl.to(q(".gj-mould"), { autoAlpha: 0, y: 60, duration: 2 }, 62);
        tl.to(q(".gj-furnace"), { autoAlpha: 0.08, scale: 0.8, duration: 2.5 }, 62.5);
        tl.to(q(".gj-heat"), { autoAlpha: 0.04, duration: 2.5 }, 63);
        tl.to(q(".gj-bar"), { rotate: -4, y: -10, duration: 15 }, 64);
        tl.fromTo(q(".gj-burst"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 0.4, scale: 1.2, duration: 3 }, 74);
        tl.to(q(".gj-bar"), { autoAlpha: 0, scale: 1.18, y: -18, duration: 2.5, ease: "power2.in" }, 78.5);
        tl.to(q(".gj-burst"), { autoAlpha: 0.65, scale: 1.35, duration: 1.5 }, 78.5);
        tl.to(q(".gj-burst"), { autoAlpha: 0, duration: 2 }, 80);
        tl.fromTo(q(".gj-hand-group"), { autoAlpha: 0, scale: 0.75, y: 25 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 2.5, ease: "power2.out" }, 80);
        tl.to(q(".gj-hand-img"), { rotate: 3, y: -12, scale: 1.04, duration: 14 }, 82);
        tl.to(q(".gj-hand-group"), { autoAlpha: 0, scale: 0.9, duration: 3 }, 96);
        tl.to(q(".gj-burst"), { autoAlpha: 0, duration: 3 }, 96);
        tl.to(q(".gj-scene"), { autoAlpha: 0, duration: 3 }, 97);
      }, el);
    };

    setup();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, []);

  const jewelClass =
    "gj-jewel absolute h-[18vh] max-w-[40vw] sm:h-[32vh] sm:max-w-[50vw] w-auto object-contain [filter:drop-shadow(0_10px_25px_rgba(212,175,55,0.4))] [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-[opacity,transform] transform-gpu opacity-0 invisible";

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE: Pure static render — no GSAP, no scroll interception, no fixed
  // Use 100dvh to respect iOS Safari dynamic viewport for perfect centering
  // ─────────────────────────────────────────────────────────────────────────
  if (isMobileDevice) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-0 transform-gpu"
        style={{ height: "100dvh" }}>
        {/* Background */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_115%_95%_at_50%_46%,#c85305_0%,#9e3902_28%,#662002_55%,#380f01_80%,#180500_100%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_82%_32%,rgba(245,120,20,0.38)_0%,transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_18%_68%,rgba(190,65,5,0.25)_0%,transparent_65%)]" />
        {/* Perfectly centered bangle using dvh-based centering */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={bangle}
            alt=""
            width={1024}
            height={1024}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-[52vw] w-[52vw] object-contain [filter:drop-shadow(0_10px_30px_rgba(212,175,55,0.55))] opacity-90"
          />
        </div>
        {/* Ambient particles */}
        <GoldParticles className="opacity-50" density={0.2} />
        <div className="absolute inset-0 pointer-events-none vignette" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP: Full GSAP scroll-driven cinematic experience
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu [contain:paint]">
      {/* Background ambience */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_115%_95%_at_50%_46%,#c85305_0%,#9e3902_28%,#662002_55%,#380f01_80%,#180500_100%)] [transform:translate3d(0,0,0)]" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_82%_32%,rgba(245,120,20,0.38)_0%,transparent_60%)]" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_18%_68%,rgba(190,65,5,0.25)_0%,transparent_65%)]" />

      <div className="gj-scene pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform transform-gpu [transform:translate3d(0,0,0)]">
        <div className="gj-orbit pointer-events-none relative flex h-[76vmin] w-[76vmin] max-w-[85vw] max-h-[85vw] items-center justify-center will-change-transform transform-gpu [transform:translate3d(0,0,0)]">
          <img src={bangle} alt="22K Solid Gold Bangle" width={1024} height={1024}
            fetchPriority="high" loading="eager" decoding="async"
            className="gj-jewel gj-bangle absolute h-[26vh] max-w-[70vw] sm:h-[48vh] sm:max-w-[80vw] w-auto object-contain [filter:drop-shadow(0_15px_35px_rgba(212,175,55,0.6))] [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-[opacity,transform] transform-gpu" />
          <img src={ring} alt="Pure Gold Ring" width={1024} height={1024}
            loading="eager" decoding="async" style={{ opacity: 0, visibility: "hidden" }}
            className={`gj-ring ${jewelClass}`} />
          <img src={chain} alt="22K Gold Rope Chain" width={1024} height={1024}
            loading="eager" decoding="async" style={{ opacity: 0, visibility: "hidden" }}
            className={`gj-chain ${jewelClass}`} />
          <img src={earrings} alt="Traditional Gold Earrings" width={1024} height={1024}
            loading="eager" decoding="async" style={{ opacity: 0, visibility: "hidden" }}
            className={`gj-earrings ${jewelClass}`} />
          <img src={necklace} alt="Royal Gold Necklace" width={1024} height={1024}
            loading="eager" decoding="async" style={{ opacity: 0, visibility: "hidden" }}
            className={`gj-necklace ${jewelClass}`} />
        </div>

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-heat pointer-events-none absolute h-[45vh] w-[45vh] opacity-0 invisible">
          <div className="absolute inset-0 rounded-full [background:radial-gradient(circle,rgba(217,95,2,0.22)_0%,rgba(158,53,0,0.12)_45%,transparent_75%)] blur-2xl" />
        </div>

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-furnace pointer-events-none absolute h-[38vh] w-[38vh] opacity-0 invisible">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#furnaceGrad)" strokeWidth="1.2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />
            <defs>
              <linearGradient id="furnaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9E3500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-molten pointer-events-none absolute h-[26vh] w-[26vh] opacity-0 invisible">
          <div className="absolute inset-0 rounded-[45%] [background:radial-gradient(circle_at_40%_35%,rgba(242,210,122,0.45),rgba(217,95,2,0.35)_45%,rgba(112,38,0,0.25)_85%)] blur-[2px] [box-shadow:0_0_20px_rgba(212,175,55,0.25)]" />
          <div className="absolute inset-0 rounded-[45%] opacity-60 blur-xl [background:radial-gradient(circle,rgba(242,210,122,0.35),transparent_70%)]" />
        </div>

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-mould pointer-events-none absolute bottom-[22vh] h-[14vh] w-[28vh] overflow-hidden rounded-md border-2 border-gold/60 bg-ink/90 [box-shadow:0_0_30px_rgba(212,175,55,0.35)] opacity-0 invisible transform-gpu">
          <div className="gj-pour absolute inset-x-[40%] -top-[40vh] h-[40vh] origin-top scale-y-0 [background:linear-gradient(180deg,transparent,var(--gold-light),var(--amber))]" />
          <div className="gj-fill absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 [background:linear-gradient(180deg,var(--gold-light),var(--gold)_60%,var(--orange-deep))]" />
        </div>

        <img src={goldBar} alt="999.9 Fine Gold Bar" width={1024} height={1024}
          loading="eager" decoding="async" style={{ opacity: 0, visibility: "hidden" }}
          className="gj-bar absolute h-[38vh] w-auto max-w-[70vw] object-contain [filter:drop-shadow(0_15px_40px_rgba(212,175,55,0.6))] [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-[opacity,transform] transform-gpu opacity-0 invisible" />

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-burst pointer-events-none absolute h-[50vh] w-[50vh] opacity-0 invisible transform-gpu [transform:translate3d(0,0,0)]">
          <div className="absolute inset-0 rounded-full [background:radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(158,53,0,0.12)_45%,transparent_70%)] blur-2xl" />
          <GoldParticles density={0.6} drift={0.25} />
        </div>

        <div style={{ opacity: 0, visibility: "hidden" }} className="gj-hand-group pointer-events-none absolute inset-0 flex items-center justify-center will-change-[opacity,transform] transform-gpu opacity-0 invisible [transform:translate3d(0,0,0)]">
          <img src={handsReceive} alt="Customer Hands Holding Cash and Coins" width={1024} height={1024}
            loading="eager" decoding="async"
            className="gj-hand-img h-[48vh] max-w-[82vw] w-auto object-contain [filter:drop-shadow(0_15px_40px_rgba(255,180,60,0.6))] [mask-image:radial-gradient(circle_at_50%_55%,black_60%,transparent_90%)] [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-[opacity,transform] transform-gpu" />
        </div>
      </div>

      <GoldParticles className="opacity-60" density={0.5} />
      <div className="absolute inset-0 pointer-events-none vignette" />
    </div>
  );
}
