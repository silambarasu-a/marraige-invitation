"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";

export default function SaveTheDate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [revealedCount, setRevealedCount] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [burst, setBurst] = useState(50);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });

  const handleReveal = (cx: number, cy: number) => {
    setRevealedCount((c) => c + 1);
    setOrigin({ x: cx, y: cy });
    setBurst(60);
    setTrigger((n) => n + 1);
  };

  const [finalDone, setFinalDone] = useState(false);
  useEffect(() => {
    if (revealedCount >= 3 && !finalDone) {
      setFinalDone(true);
      setTimeout(() => {
        setOrigin({ x: 0.5, y: 0.55 });
        setBurst(160);
        setTrigger((n) => n + 1);
      }, 250);
    }
  }, [revealedCount, finalDone]);

  return (
    <section id="save-the-date" data-burst="true" ref={ref} className="snap-section px-6 py-12 bg-paper texture-paper">
      <Confetti trigger={trigger} origin={origin} burst={burst} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="mx-auto max-w-3xl w-full text-center"
      >
        <p className="tracking-[0.4em] uppercase text-[11px] text-gold-light">The Date</p>
        <h2
          className="mt-3 text-5xl sm:text-6xl text-sage-deep"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Save the Date
        </h2>
        <p
          className="mt-4 italic text-ink-soft"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Scratch below to reveal our wedding dates
        </p>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
          <ScratchTile label="Date" value="24-25" onReveal={handleReveal} />
          <ScratchTile label="Month" value="May" onReveal={handleReveal} />
          <ScratchTile label="Year" value="2026" onReveal={handleReveal} />
        </div>

        <p className="mt-10 tracking-[0.25em] text-[11px] uppercase text-ink-soft">
          Sunday & Monday
        </p>
      </motion.div>
    </section>
  );
}

function ScratchTile({
  label,
  value,
  onReveal,
}: {
  label: string;
  value: string;
  onReveal: (cx: number, cy: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#D9B97A");
    grad.addColorStop(0.5, "#B8935A");
    grad.addColorStop(1, "#8C6A3F");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH ✦", rect.width / 2, rect.height / 2 + 4);

    let isDown = false;
    let revealed = 0;
    const total = rect.width * rect.height;

    const scratchAt = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      revealed += Math.PI * 22 * 22;
      if (revealed / total > 0.45 && !scratched) {
        setScratched(true);
        const w = wrapperRef.current?.getBoundingClientRect();
        if (w) {
          const cx = (w.left + w.width / 2) / window.innerWidth;
          const cy = (w.top + w.height / 2) / window.innerHeight;
          onReveal(cx, cy);
        }
      }
    };

    const getPos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => {
      isDown = true;
      const { x, y } = getPos(e);
      scratchAt(x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const { x, y } = getPos(e);
      scratchAt(x, y);
    };
    const onUp = () => (isDown = false);

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onReveal, scratched]);

  useEffect(() => {
    if (!scratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.transition = "opacity 700ms ease";
    canvas.style.opacity = "0";
    const t = setTimeout(() => (canvas.style.display = "none"), 800);
    return () => clearTimeout(t);
  }, [scratched]);

  return (
    <div
      ref={wrapperRef}
      className="relative aspect-[3/4] rounded-2xl border border-gold/40 bg-cream-deep shadow-sm overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
        <span className="tracking-[0.3em] uppercase text-[9px] text-ink-soft">
          {label}
        </span>
        <span
          className="mt-2 text-3xl sm:text-4xl text-sage-deep leading-none"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          {value}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full no-select touch-none cursor-pointer"
      />
    </div>
  );
}
