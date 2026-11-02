"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Mejora progresiva: sin JS o con movimiento reducido el contenido sigue visible. */
export function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    const observe = () => {
      observer.disconnect();
      if (media.matches) return;
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        element.classList.remove("is-revealed");
        observer.observe(element);
      });
    };
    observe();
    media.addEventListener("change", observe);
    return () => { observer.disconnect(); media.removeEventListener("change", observe); };
  }, [pathname]);
  return null;
}
