import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  hue: number;
};

/**
 * Reusable gold dust field. Density scales down on small screens and the
 * animation is skipped entirely for prefers-reduced-motion.
 */
export function GoldParticles({
  className,
  density = 1,
  drift = 0.12,
}: {
  className?: string;
  density?: number;
  drift?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    let raf = 0;
    let particles: Particle[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cachedW = 0;
    let cachedH = 0;

    const build = () => {
      cachedW = canvas.clientWidth || 300;
      cachedH = canvas.clientHeight || 300;
      dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cachedW * dpr));
      canvas.height = Math.max(1, Math.round(cachedH * dpr));
      const base = mobile ? 12 : 45;
      const count = Math.round(base * density);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * cachedW,
        y: Math.random() * cachedH,
        vx: (Math.random() - 0.5) * drift,
        vy: -Math.random() * drift - 0.03,
        r: Math.random() * 1.5 + 0.35,
        a: Math.random() * 0.45 + 0.12,
        hue: 34 + Math.random() * 16,
      }));
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cachedW, cachedH);
      if (!mobile) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255, 180, 60, 0.4)";
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -8) p.y = cachedH + 8;
        if (p.x < -8) p.x = cachedW + 8;
        if (p.x > cachedW + 8) p.x = -8;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 85%, ${58 + p.r * 8}%, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    if (reduced) {
      // Draw one static frame only.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 85%, 62%, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [density, drift]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
