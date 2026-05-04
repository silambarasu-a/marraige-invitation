"use client";

import { useEffect, useState } from "react";

type Flower = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  type: "jasmine" | "marigold" | "rose" | "petal";
};

const TYPES: Flower["type"][] = ["jasmine", "marigold", "rose", "petal"];

export default function FlowerRain({ count = 28 }: { count?: number }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    const arr: Flower[] = Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: -Math.random() * 14,
      duration: 11 + Math.random() * 14,
      size: 0.7 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 30,
      type: TYPES[i % TYPES.length],
    }));
    setFlowers(arr);
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes flower-fall {
          0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: translate3d(var(--drift, 12vw), 110vh, 0) rotate(720deg); opacity: 0; }
        }
        .flower-rain-item {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation-name: flower-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.06));
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        {flowers.map((f, i) => (
          <span
            key={i}
            className="flower-rain-item"
            style={{
              left: `${f.left}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              transform: `scale(${f.size})`,
              ["--drift" as string]: `${f.drift}vw`,
            }}
          >
            <FlowerSvg type={f.type} />
          </span>
        ))}
      </div>
    </>
  );
}

function FlowerSvg({ type }: { type: Flower["type"] }) {
  if (type === "jasmine") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy="6"
              rx="3"
              ry="6"
              fill="#fffaf0"
              stroke="#f3e6c8"
              strokeWidth="0.6"
              transform={`rotate(${i * 72} 12 12)`}
              opacity="0.95"
            />
          ))}
          <circle cx="12" cy="12" r="1.6" fill="#e6c477" />
        </g>
      </svg>
    );
  }
  if (type === "marigold") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy="5"
              rx="2.2"
              ry="5"
              fill="#f0892b"
              opacity="0.9"
              transform={`rotate(${i * 30} 12 12)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={`b${i}`}
              cx="12"
              cy="6.5"
              rx="1.5"
              ry="3.5"
              fill="#c84d10"
              opacity="0.95"
              transform={`rotate(${i * 45 + 22} 12 12)`}
            />
          ))}
          <circle cx="12" cy="12" r="1.8" fill="#7a2d05" />
        </g>
      </svg>
    );
  }
  if (type === "rose") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy="7"
              rx="2.5"
              ry="4.8"
              fill={i % 2 === 0 ? "#e63a4f" : "#c1233e"}
              opacity="0.9"
              transform={`rotate(${i * 60} 12 12)`}
            />
          ))}
          <circle cx="12" cy="12" r="1.2" fill="#7a0a16" />
        </g>
      </svg>
    );
  }
  // generic petal
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <ellipse
        cx="12"
        cy="12"
        rx="5"
        ry="9"
        fill="#f6a47a"
        stroke="#c75e3a"
        strokeWidth="0.4"
        opacity="0.85"
      />
    </svg>
  );
}
