"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  location: string;
  mapsUrl: string;
  embedSrc: string;
  artwork: ReactNode;
  theme?: "day" | "night";
  themeTagline?: string;
};

export default function EventCard({
  id,
  eyebrow,
  title,
  weekday,
  day,
  month,
  year,
  time,
  venue,
  location,
  mapsUrl,
  embedSrc,
  artwork,
  theme = "day",
  themeTagline,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isNight = theme === "night";

  // parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yArt = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yCard = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id={id}
      ref={ref}
      data-burst="true"
      className={`snap-section px-5 py-10 ${
        isNight ? "bg-night text-cream" : "bg-paper text-ink"
      } texture-paper`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: yCard }}
        className="mx-auto max-w-md w-full"
      >
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 1.1, delay: 0.1 }}
            className={`uppercase text-[10px] ${
              isNight ? "text-gold-light" : "text-gold"
            }`}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className={`mt-2 text-5xl ${
              isNight ? "text-cream" : "text-sage-deep"
            }`}
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          initial={{ scale: 0.92, opacity: 0, rotateX: 14 }}
          animate={inView ? { scale: 1, opacity: 1, rotateX: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1500 }}
          className={`mt-5 rounded-3xl overflow-hidden border ${
            isNight ? "border-gold/30 bg-white/5" : "border-gold/30 bg-cream-deep/40"
          } backdrop-blur-sm`}
        >
          <div className="p-4">
            <div className="relative aspect-5/4 rounded-2xl overflow-hidden">
              <motion.div style={{ y: yArt }} className="absolute inset-0">
                {artwork}
              </motion.div>
              {/* top scrim for legibility */}
              <div
                className="absolute inset-x-0 top-0 h-[42%] pointer-events-none"
                style={{
                  background: isNight
                    ? "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.45) 60%, transparent 100%)"
                    : "linear-gradient(180deg, rgba(253,231,200,0.92) 0%, rgba(253,231,200,0.55) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 top-0 flex flex-col items-center text-center px-5 pt-3">
                <p
                  className={`tracking-[0.3em] uppercase text-[9px] ${
                    isNight ? "text-cream/85" : "text-[#7a3d1c]"
                  }`}
                >
                  {themeTagline}
                </p>
                <h3
                  className={`mt-1 text-3xl leading-tight ${
                    isNight ? "text-cream" : "text-sage-deep"
                  }`}
                  style={{ fontFamily: "var(--font-great-vibes)" }}
                >
                  {title}
                </h3>
                <div className="mt-1 inline-flex items-center gap-2 text-[11px]">
                  <span className={isNight ? "text-cream/90" : "text-[#5a2810]"}>
                    {weekday} · {day} {month} {year}
                  </span>
                </div>
                <p
                  className={`text-[10px] tracking-wider ${
                    isNight ? "text-cream/80" : "text-[#7a3d1c]"
                  }`}
                >
                  {time}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`px-4 pb-4 ${
              isNight ? "text-cream/90" : "text-ink"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-center text-xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {venue}
            </motion.div>
            <div
              className={`text-center text-[11px] tracking-wider mt-0.5 ${
                isNight ? "text-cream/70" : "text-ink-soft"
              }`}
            >
              {location}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-3 rounded-2xl overflow-hidden border border-gold/30"
            >
              <iframe
                src={embedSrc}
                width="100%"
                height="140"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </motion.div>

            <div className="mt-3 flex justify-center">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase transition ${
                  isNight
                    ? "border-gold-light text-gold-light hover:bg-gold-light/10"
                    : "border-gold text-gold hover:bg-gold/10"
                }`}
              >
                View on Map
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 3h7v7" />
                  <path d="M13 3 4 12" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
