import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const goldButton = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 touch-manipulation select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        gold: "text-[#1f0901] shadow-[0_8px_25px_rgba(226,186,85,0.45)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(255,157,50,0.65)] [background:linear-gradient(90deg,#A87018_0%,#ECC55F_45%,#FFF2CA_55%,#A87018_100%)] [background-size:200%_100%] hover:[background-position:100%_0]",
        ember:
          "text-ivory shadow-[0_8px_25px_rgba(180,60,10,0.35)] hover:-translate-y-0.5 border border-gold/35 [background:rgba(140,45,5,0.65)] hover:[background:rgba(180,60,10,0.85)]",
        outline:
          "border border-gold/40 bg-[rgba(120,35,4,0.45)] text-ivory hover:border-gold hover:bg-[rgba(160,50,6,0.65)] hover:-translate-y-0.5 backdrop-blur-sm",
        ghost: "text-ivory/90 hover:text-gold",
      },
      size: {
        sm: "px-4.5 py-2 text-[0.62rem] sm:px-5 sm:py-2.5 sm:text-[0.65rem]",
        md: "px-5.5 py-3 text-xs sm:px-7 sm:py-3.5",
        lg: "px-7 py-3.5 text-xs sm:px-9 sm:py-4 sm:text-[0.8rem]",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button"> & VariantProps<typeof goldButton>;
type AnchorProps = ComponentPropsWithoutRef<"a"> & VariantProps<typeof goldButton>;

export function GoldButton({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(goldButton({ variant, size }), className)} {...props} />;
}

export function GoldLink({ className, variant, size, ...props }: AnchorProps) {
  return <a className={cn(goldButton({ variant, size }), className)} {...props} />;
}

export function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow mb-2.5 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-2xl xs:text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl text-ivory drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-3 sm:mt-5 text-pretty text-xs xs:text-sm sm:text-base leading-relaxed text-ivory/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          {copy}
        </p>
      ) : null}
    </motion.header>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.2), ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20 px-4 py-14 xs:px-5 xs:py-20 sm:px-8 sm:py-24 lg:py-32", className)}
    >
      {children}
    </section>
  );
}
