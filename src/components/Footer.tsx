"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <footer ref={ref} className="snap-section px-6 py-12 bg-paper texture-paper text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="mx-auto max-w-xl"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="block h-px w-24 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold">✦</span>
          <span className="block h-px w-24 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p
          className="mt-6 text-4xl text-sage-deep"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          With love &amp; blessings
        </p>
        <p
          className="mt-3 italic text-ink-soft"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Silambarasu &amp; Prathiksha
        </p>
        <p className="mt-8 tracking-[0.3em] uppercase text-[10px] text-ink-soft">
          24 — 25 May 2026
        </p>
      </motion.div>
    </footer>
  );
}
