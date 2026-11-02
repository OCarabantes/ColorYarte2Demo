"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";

/** Pausa al interactuar, salir de pantalla, ocultar la pestaña o reducir movimiento. */
export function useAutoAdvance(advance: () => void, interval: number) {
  const rootRef = useRef<HTMLElement>(null);
  const advanceRef = useRef(advance);
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => { advanceRef.current = advance; }, [advance]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion(); updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const running = enabled && !reducedMotion && inView && pageVisible && !hovered && !focused;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => advanceRef.current(), interval);
    return () => window.clearInterval(timer);
  }, [running, interval]);

  const interactionProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    },
  };
  return { rootRef, enabled, running, reducedMotion, interactionProps, pause: () => setEnabled(false), toggle: () => setEnabled((value) => !value) };
}
