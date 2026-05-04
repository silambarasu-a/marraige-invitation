"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Item = { time: string; title: string; subtitle?: string };

export default function Timeline({
  date,
  weekday,
  items,
}: {
  date: string;
  weekday: string;
  items: Item[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} data-burst="true" className="snap-section px-6 py-12 bg-cream-deep/40">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="tracking-[0.4em] uppercase text-[11px] text-gold">
            {weekday} · {date}
          </p>
          <h3
            className="mt-3 text-4xl sm:text-5xl text-sage-deep"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            The Day&apos;s Programme
          </h3>
        </motion.div>

        <div className="relative pl-8 sm:pl-12">
          <span className="absolute left-3 sm:left-5 top-2 bottom-2 w-px bg-linear-to-b from-gold via-gold-light to-transparent" />
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              className="relative mb-7 last:mb-0"
            >
              <span className="absolute -left-8 sm:-left-12 top-2 grid place-items-center w-6 h-6 rounded-full border border-gold bg-cream">
                <span className="block w-2 h-2 rounded-full bg-gold" />
              </span>
              <div className="rounded-2xl bg-cream border border-gold/20 px-5 py-4 shadow-sm">
                <div className="text-sm tracking-[0.2em] uppercase text-gold-light">
                  {it.time}
                </div>
                <div
                  className="text-2xl text-sage-deep"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {it.title}
                </div>
                {it.subtitle && (
                  <div className="text-sm text-ink-soft mt-0.5">{it.subtitle}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
