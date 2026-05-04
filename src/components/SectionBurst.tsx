"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";

export default function SectionBurst() {
  const [trigger, setTrigger] = useState(0);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.4 });
  const seenRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-burst='true']");
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.45 && !seenRef.current.has(e.target)) {
            seenRef.current.add(e.target);
            const r = e.target.getBoundingClientRect();
            setOrigin({
              x: (r.left + r.width / 2) / window.innerWidth,
              y: Math.max(0.1, (r.top + 80) / window.innerHeight),
            });
            setTrigger((n) => n + 1);
          }
        });
      },
      { threshold: [0.45, 0.6] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <Confetti trigger={trigger} origin={origin} burst={50} />;
}
