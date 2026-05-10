"use client";

import { RefObject, useEffect, useState } from "react";

export default function AudioToggle({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const sync = () => setPlaying(!a.paused);
    sync();
    a.addEventListener("play", sync);
    a.addEventListener("pause", sync);
    return () => {
      a.removeEventListener("play", sync);
      a.removeEventListener("pause", sync);
    };
  }, [audioRef]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        /* play blocked */
      }
    } else {
      a.pause();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 grid place-items-center w-12 h-12 rounded-full bg-cream/90 backdrop-blur-md border border-gold/40 shadow-lg hover:bg-cream transition"
    >
      {playing ? (
        <svg className="w-5 h-5 text-sage-deep" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 12 a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M6 12 a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-sage-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9 v6 m18 -6 v6" />
          <path d="M5 12 h14" strokeDasharray="2 2" />
        </svg>
      )}
    </button>
  );
}
