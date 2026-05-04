"use client";

import { useEffect, useState } from "react";

type Heart = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  hue: number;
  filled: boolean;
};

export default function HeartRain({
  count = 28,
  zIndex = 2,
}: {
  count?: number;
  zIndex?: number;
}) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const arr: Heart[] = Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: -Math.random() * 14,
      duration: 9 + Math.random() * 10,
      size: 0.7 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 28,
      hue: i % 4,
      filled: i % 3 !== 0,
    }));
    setHearts(arr);
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes heart-fall {
          0%   { transform: translate3d(0, -10vh, 0) rotate(-12deg) scale(var(--s, 1)); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate3d(calc(var(--drift, 8vw) * 0.5), 50vh, 0) rotate(12deg) scale(var(--s, 1)); opacity: 1; }
          100% { transform: translate3d(var(--drift, 8vw), 110vh, 0) rotate(-6deg) scale(var(--s, 1)); opacity: 0; }
        }
        .heart-rain-item {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-name: heart-fall;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 1px 2px rgba(193,35,62,0.18));
        }
        @keyframes heart-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        .heart-rain-item svg { animation: heart-pulse 1.2s ease-in-out infinite; }
      `}</style>
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex }}
        aria-hidden="true"
      >
        {hearts.map((h, i) => {
          const colors = [
            { fill: "#e63a4f", stroke: "#a8112a" }, // red
            { fill: "#ec5c8a", stroke: "#a32856" }, // pink
            { fill: "#c1233e", stroke: "#7a0a16" }, // deep red
            { fill: "#f3a4b5", stroke: "#c1233e" }, // soft pink
          ];
          const c = colors[h.hue];
          return (
            <span
              key={i}
              className="heart-rain-item"
              style={{
                left: `${h.left}%`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
                ["--drift" as string]: `${h.drift}vw`,
                ["--s" as string]: String(h.size),
              }}
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 24 22"
                fill={h.filled ? c.fill : "none"}
                stroke={c.stroke}
                strokeWidth={h.filled ? 0.8 : 1.6}
                strokeLinejoin="round"
              >
                <path d="M12 21 C 7 16.5, 2 13, 2 8 A 5 5 0 0 1 12 6 A 5 5 0 0 1 22 8 C 22 13, 17 16.5, 12 21 Z" />
                {h.filled && (
                  <path
                    d="M7 6 q1.5 -2 4 -1"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </span>
          );
        })}
      </div>
    </>
  );
}
