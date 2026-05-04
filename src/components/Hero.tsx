"use client";

import { motion } from "framer-motion";
import OmIcon from "./OmIcon";

export default function Hero() {
  return (
    <section id="hero" data-burst="true" className="snap-section px-6 py-12 overflow-hidden texture-paper">
      {/* corner ornaments */}
      <CornerOrnaments />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          className="drift mx-auto mb-6 w-16 text-sage"
        >
          <OmIcon className="w-full h-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="tracking-[0.4em] uppercase text-xs sm:text-sm text-gold-light"
        >
          Shubh Vivah
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-4 text-ink-soft text-sm sm:text-base"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          With the blessings of our families,
          <br />we cordially invite you to celebrate the union of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.1 }}
          className="mt-8 text-6xl sm:text-7xl text-sage-deep leading-none"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Silambarasu
        </motion.h1>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="block h-px w-20 bg-gradient-to-r from-transparent to-gold" />
          <span
            className="text-3xl text-gold"
            style={{ fontFamily: "var(--font-pinyon)" }}
          >
            &
          </span>
          <span className="block h-px w-20 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.1 }}
          className="text-6xl sm:text-7xl text-sage-deep leading-none"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Prathiksha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-12 italic text-ink-soft text-base sm:text-lg max-w-md mx-auto"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          “Two souls with a single thought, two hearts that beat as one.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-10"
        >
          <div className="inline-block tracking-[0.3em] uppercase text-[11px] text-ink-soft">
            24 & 25 May 2026
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.4 }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-16 flex flex-col items-center gap-2 text-ink-soft"
        >
          <span className="tracking-[0.3em] text-[10px] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CornerOrnaments() {
  return (
    <>
      <Corner className="top-6 left-6" />
      <Corner className="top-6 right-6 rotate-90" />
      <Corner className="bottom-6 right-6 rotate-180" />
      <Corner className="bottom-6 left-6 -rotate-90" />
    </>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute h-16 w-16 text-gold/70 ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 22 V2 H22" />
      <path d="M6 26 V6 H26" opacity="0.5" />
      <circle cx="2" cy="2" r="2" fill="currentColor" stroke="none" />
      <path d="M22 2 q6 0 8 6" />
      <path d="M2 22 q0 6 6 8" />
    </svg>
  );
}
