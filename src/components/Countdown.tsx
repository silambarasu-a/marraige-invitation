"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TARGET = new Date("2026-05-25T09:00:00+05:30").getTime();

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [t, setT] = useState(() => diff(TARGET));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(TARGET));
    const id = setInterval(() => setT(diff(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" data-burst="true" ref={ref} className="px-6 pt-10 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-2xl w-full text-center"
      >
        <p className="tracking-[0.4em] uppercase text-[11px] text-gold">
          The countdown begins
        </p>
        <h3
          className="mt-3 text-4xl sm:text-5xl text-sage-deep"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Until we say I do
        </h3>

        <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-5">
          <Block label="Days" value={mounted ? t.days : 0} />
          <Block label="Hours" value={mounted ? t.hours : 0} />
          <Block label="Minutes" value={mounted ? t.minutes : 0} />
          <Block label="Seconds" value={mounted ? t.seconds : 0} />
        </div>

        <p className="mt-8 tracking-[0.3em] uppercase text-[10px] text-ink-soft">
          25 May 2026 · 9:00 AM IST
        </p>
      </motion.div>
    </section>
  );
}

function Block({ label, value }: { label: string; value: number }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="rounded-2xl border border-gold/30 bg-cream-deep/60 px-2 py-5 sm:px-4 sm:py-6 shadow-sm">
      <div className="relative h-12 sm:h-16 overflow-hidden">
        <motion.div
          key={v}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="text-4xl sm:text-5xl text-sage-deep tabular-nums"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {v}
        </motion.div>
      </div>
      <div className="mt-1 tracking-[0.25em] uppercase text-[9px] sm:text-[10px] text-ink-soft">
        {label}
      </div>
    </div>
  );
}
