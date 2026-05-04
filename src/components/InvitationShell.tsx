"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./EnvelopeIntro";

export default function InvitationShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("preview")) {
      setOpened(true);
    }
    // start at the top whenever the page (re)loads (unless an explicit hash target)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // lock body scroll while the envelope intro is up
  useEffect(() => {
    document.documentElement.classList.toggle("intro-locked", !opened);
    if (opened && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <EnvelopeIntro key="env" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.8, delay: opened ? 0.1 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
