"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Gift, Pause, Play } from "lucide-react";
import { campaigns } from "@/lib/marketing";
import { useAutoAdvance } from "@/components/use-auto-advance";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const { rootRef, enabled, running, reducedMotion, interactionProps, pause, toggle } = useAutoAdvance(() => setIndex((value) => (value + 1) % campaigns.length), 6500);
  const campaign = campaigns[index];
  const move = (direction: number) => { pause(); setIndex((value) => (value + direction + campaigns.length) % campaigns.length); };

  return (
    <section ref={rootRef} {...interactionProps} aria-label="Ofertas y anuncios de demostración" className="announcement-bar" data-autoplay={running ? "playing" : "paused"}>
      <div className="announcement-inner">
        <span className="announcement-demo"><Gift aria-hidden="true" /><span>DEMO</span></span>
        <div className="announcement-message" aria-live={enabled ? "off" : "polite"} aria-atomic="true"><Link key={campaign.id} href={campaign.href}>{campaign.announcement}<ChevronRight aria-hidden="true" /></Link></div>
        <div className="announcement-controls">
          <button type="button" aria-label="Anuncio anterior" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
          <button type="button" aria-label={reducedMotion ? "Anuncios automáticos desactivados por movimiento reducido" : enabled ? "Pausar anuncios" : "Reanudar anuncios"} disabled={reducedMotion} onClick={toggle}>{enabled && !reducedMotion ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
          <button type="button" aria-label="Anuncio siguiente" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
