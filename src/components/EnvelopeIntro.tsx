"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HeartRain from "./HeartRain";

type Phase = "closed" | "opening" | "open" | "exiting";

export default function EnvelopeIntro({
  onOpen,
  onClick,
}: {
  onOpen?: () => void;
  onClick?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("closed");

  const handleOpen = () => {
    if (phase !== "closed") return;
    onClick?.();
    setPhase("opening");
    // cover finishes its swing
    setTimeout(() => setPhase("open"), 6000);
    // overlay fades and unmounts
    setTimeout(() => setPhase("exiting"), 4700);
    setTimeout(() => onOpen?.(), 6000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-paper texture-paper overflow-hidden"
      onClick={handleOpen}
      role="button"
      aria-label="Open invitation"
    >
      <HeartRain count={14} zIndex={1} />

      <motion.div
        animate={
          phase === "open" || phase === "exiting"
            ? { scale: 1.3, opacity: phase === "exiting" ? 0 : 1 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ perspective: 1800 }}
      >
        <div
          className="relative w-[300px] sm:w-[360px] aspect-[4/5.4]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inside (right page) — visible after cover opens */}
          <InsideRight />

          {/* Cover (left "page" — front and back) */}
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              willChange: "transform",
            }}
            animate={
              phase === "opening" || phase === "open" || phase === "exiting"
                ? { rotateY: -168 }
                : { rotateY: 0 }
            }
            transition={{ duration: 2.6, ease: [0.7, 0.0, 0.2, 1] }}
          >
            <CoverFront />
            <CoverBack />
          </motion.div>
        </div>

        {/* Tap to open hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === "closed" ? [0.4, 1, 0.4] : 0,
          }}
          transition={{
            duration: 1.8,
            repeat: phase === "closed" ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="mt-10 tracking-[0.4em] uppercase text-[11px] text-ink-soft text-center no-select"
        >
          ✦ Tap to open the invitation ✦
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CoverFront() {
  return (
    <div
      className="absolute inset-0 rounded-md overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background:
          "radial-gradient(120% 80% at 50% 0%, #f8eed5 0%, #ecdcb2 60%, #d8bf85 100%)",
        boxShadow:
          "0 20px 50px rgba(60,40,10,0.25), inset 0 0 0 1px rgba(184,147,90,0.4)",
      }}
    >
      {/* Outer ornamental frame */}
      <div
        className="absolute inset-3 rounded-sm border border-[color:var(--gold)]/70"
        style={{ boxShadow: "inset 0 0 0 1px rgba(184,147,90,0.25)" }}
      />
      <div className="absolute inset-5 rounded-sm border border-[color:var(--gold)]/40" />

      {/* Corner mandalas */}
      <Mandala className="top-3 left-3" />
      <Mandala className="top-3 right-3 rotate-90" />
      <Mandala className="bottom-3 right-3 rotate-180" />
      <Mandala className="bottom-3 left-3 -rotate-90" />

      {/* Top arch with paisleys */}
      <svg
        viewBox="0 0 200 60"
        className="absolute top-7 left-1/2 -translate-x-1/2 w-3/4 text-[color:var(--gold)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M0 50 Q 100 0 200 50" />
        <path d="M10 52 Q 100 10 190 52" opacity="0.5" />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 20 + i * 20;
          return (
            <g key={i}>
              <circle cx={x} cy={50 - Math.sin((i / 8) * Math.PI) * 35} r="1.5" fill="currentColor" />
            </g>
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="mt-12 text-[color:var(--sage-deep)] text-3xl">ॐ</div>
        <div className="mt-2 tracking-[0.5em] uppercase text-[10px] text-[color:var(--gold)]">
          Shubh Vivah
        </div>

        <div className="my-4 w-16 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <div
          className="text-[2rem] sm:text-[2.4rem] leading-none text-[color:var(--sage-deep)]"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Silambarasu
        </div>
        <div
          className="my-1 text-xl text-[color:var(--gold)]"
          style={{ fontFamily: "var(--font-pinyon)" }}
        >
          &
        </div>
        <div
          className="text-[2rem] sm:text-[2.4rem] leading-none text-[color:var(--sage-deep)]"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Prathiksha
        </div>

        <div className="my-5 w-16 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />

        <div className="tracking-[0.4em] uppercase text-[10px] text-[color:var(--ink-soft)]">
          24 · 25 May 2026
        </div>
      </div>

      {/* Bottom hanging florals */}
      <svg
        viewBox="0 0 200 30"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 w-3/4 text-[color:var(--gold)]"
        fill="currentColor"
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <g key={i} transform={`translate(${10 + i * 14}, 0)`}>
            <path d="M0 0 v6" stroke="currentColor" strokeWidth="0.4" fill="none" />
            <circle cx="0" cy="6" r="1.2" opacity="0.8" />
          </g>
        ))}
      </svg>

      {/* Subtle gloss */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.05) 100%)",
        }}
      />
    </div>
  );
}

function CoverBack() {
  return (
    <div
      className="absolute inset-0 rounded-md overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background:
          "linear-gradient(135deg, #f5ead0 0%, #e8d6a8 100%)",
        boxShadow: "inset 0 0 60px rgba(184,147,90,0.15)",
      }}
    >
      <div className="absolute inset-3 rounded-sm border border-[color:var(--gold)]/40" />
      <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <p
          className="italic text-[color:var(--ink-soft)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          “Two souls with a single thought,
          <br />two hearts that beat as one.”
        </p>
      </div>
    </div>
  );
}

function InsideRight() {
  return (
    <div
      className="absolute inset-0 rounded-md overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #fcf6e6 0%, #f3e9c9 100%)",
        boxShadow: "inset 0 0 80px rgba(184,147,90,0.18)",
      }}
    >
      <div className="absolute inset-3 rounded-sm border border-[color:var(--gold)]/40" />
      <Mandala className="top-3 left-3" />
      <Mandala className="top-3 right-3 rotate-90" />
      <Mandala className="bottom-3 right-3 rotate-180" />
      <Mandala className="bottom-3 left-3 -rotate-90" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="tracking-[0.5em] uppercase text-[10px] text-[color:var(--gold)]">
          With the blessings of our families
        </p>
        <p
          className="mt-3 italic text-[color:var(--ink-soft)] text-sm"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          We cordially invite you to celebrate
          <br />the union of
        </p>
        <div
          className="mt-5 text-3xl text-[color:var(--sage-deep)] leading-none"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Silambarasu &amp; Prathiksha
        </div>
        <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
      </div>
    </div>
  );
}

function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`absolute w-10 h-10 text-[color:var(--gold)] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="6" r="5" opacity="0.5" />
      <path d="M2 6 H10 M6 2 V10" opacity="0.7" />
      <path d="M3 3 L9 9 M9 3 L3 9" opacity="0.4" />
      <path d="M14 6 q4 0 6 4" opacity="0.6" />
      <path d="M6 14 q0 4 4 6" opacity="0.6" />
      <circle cx="14" cy="6" r="0.8" fill="currentColor" />
      <circle cx="6" cy="14" r="0.8" fill="currentColor" />
    </svg>
  );
}

