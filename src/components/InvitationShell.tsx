"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./EnvelopeIntro";
import AudioToggle from "./AudioToggle";

export default function InvitationShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (new URLSearchParams(window.location.search).has("preview")) {
      setOpened(true);
    }
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("intro-locked", !opened);
    if (opened && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [opened]);

  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.5;
    a.play().catch(() => {
      /* blocked — user can press toggle */
    });
  };

  return (
    <>
      <audio ref={audioRef} src="/sita-kalyana.mp3" loop preload="auto" />

      <AnimatePresence>
        {!opened && (
          <EnvelopeIntro
            key="env"
            onClick={startMusic}
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.8, delay: opened ? 0.1 : 0 }}
      >
        {children}
      </motion.div>

      {opened && <AudioToggle audioRef={audioRef} />}
    </>
  );
}
