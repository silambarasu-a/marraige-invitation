"use client";

import { useEffect, useState } from "react";

type Petal = { left: number; delay: number; duration: number; size: number; tint: number };

export default function Petals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: -Math.random() * 12,
      duration: 9 + Math.random() * 9,
      size: 0.7 + Math.random() * 0.9,
      tint: Math.random(),
    }));
    setPetals(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.size})`,
            background:
              p.tint > 0.5
                ? "linear-gradient(135deg, #f6c9b9, #c18b7c)"
                : "linear-gradient(135deg, #fbe2c4, #d9b97a)",
          }}
        />
      ))}
    </div>
  );
}
