"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  size: number;
  shape: "rect" | "circle" | "petal";
  life: number;
};

const COLORS = ["#C18B7C", "#B8935A", "#D9B97A", "#6F8467", "#E2A77B", "#F3D6B4"];

export default function Confetti({
  trigger,
  origin = { x: 0.5, y: 0.5 },
  burst = 60,
  onDone,
}: {
  trigger: number;
  origin?: { x: number; y: number };
  burst?: number;
  onDone?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const ox = origin.x * w;
    const oy = origin.y * h;

    const newParticles: Particle[] = Array.from({ length: burst }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      return {
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: (["rect", "circle", "petal"] as const)[Math.floor(Math.random() * 3)],
        life: 1,
      };
    });
    particlesRef.current.push(...newParticles);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.vy += 0.18;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.008;

        if (p.life <= 0 || p.y > h + 40) {
          arr.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, p.size / 3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (arr.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onDoneRef.current?.();
        rafRef.current = null;
      }
    };

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [trigger, origin.x, origin.y, burst]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-60"
      aria-hidden="true"
    />
  );
}
