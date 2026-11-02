"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Gift, Pause, Play, Sparkles } from "lucide-react";
import { campaigns, type Campaign } from "@/lib/marketing";
import { useAutoAdvance } from "@/components/use-auto-advance";

export function CampaignCode({ campaign, compact = false }: { campaign: Campaign; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setCopied(false); setFailed(false); }, [campaign.id]);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 3500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  async function copyCode() {
    try { await navigator.clipboard.writeText(campaign.code); setCopied(true); setFailed(false); }
    catch { setFailed(true); }
  }
  return <div className={compact ? "campaign-code campaign-code-compact" : "campaign-code"}><button type="button" onClick={copyCode} aria-label={`Copiar código de demostración ${campaign.code}`}><span>{campaign.code}</span>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</button><span role="status" className="campaign-copy-status">{copied ? "¡Código copiado!" : failed ? `Copia este código: ${campaign.code}` : "Código de demostración"}</span></div>;
}

export function CampaignRibbon({ category }: { category: Campaign["category"] }) {
  const campaign = campaigns.find((item) => item.category === category)!;
  return <aside aria-label="Promoción de demostración" className={`campaign-ribbon campaign-theme-${campaign.theme}`}><div className="campaign-ribbon-message"><Gift aria-hidden="true" /><div><p><span className="demo-chip">DEMO</span>{campaign.offer}</p><span>Promoción ficticia; no se aplica al subtotal.</span></div></div><CampaignCode campaign={campaign} compact /></aside>;
}

export function CampaignCarousel() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const { rootRef, enabled, running, reducedMotion, interactionProps, pause, toggle } = useAutoAdvance(() => setIndex((value) => (value + 1) % campaigns.length), 8000);
  const campaign = campaigns[index];
  function select(next: number) { pause(); setIndex((next + campaigns.length) % campaigns.length); }

  return (
    <section ref={rootRef} {...interactionProps} className="campaign-section" aria-label="Ideas y promociones para tu próxima pausa" aria-roledescription="carrusel" data-autoplay={running ? "playing" : "paused"} data-reveal>
      <div className="campaign-section-heading"><div><p className="section-kicker"><Sparkles aria-hidden="true" />ESTA SEMANA, EL PLAN ES CREAR</p><h2>Un buen plan empieza <span>con un poquito de color.</span></h2><p>Para compartir, regalar o simplemente darte ese momento que mereces.</p></div><div className="carousel-controls"><button type="button" onClick={() => select(index - 1)} aria-label="Promoción anterior"><ChevronLeft aria-hidden="true" /></button><button type="button" onClick={toggle} disabled={reducedMotion} aria-label={reducedMotion ? "Carrusel automático desactivado por movimiento reducido" : enabled ? "Pausar carrusel" : "Reanudar carrusel"}>{enabled && !reducedMotion ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button><button type="button" onClick={() => select(index + 1)} aria-label="Promoción siguiente"><ChevronRight aria-hidden="true" /></button></div></div>
      <div className="campaign-viewport" aria-live={enabled ? "off" : "polite"} aria-atomic="false" onTouchStart={(event) => { pause(); touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(index + (dx < 0 ? 1 : -1)); }}>
        <article key={campaign.id} className={`campaign-slide campaign-theme-${campaign.theme}`} aria-roledescription="diapositiva" aria-label={`${index + 1} de ${campaigns.length}: ${campaign.label}`}>
          <div className="campaign-image"><img src={campaign.image} alt={campaign.imageAlt} width={1500} height={1000} loading="lazy" /><span className="campaign-photo-label"><Sparkles aria-hidden="true" />{campaign.label}</span><span className="campaign-photo-number" aria-hidden="true">0{index + 1}<small> / 0{campaigns.length}</small></span></div>
          <div className="campaign-slide-copy"><div className="campaign-offer"><span className="demo-chip">DEMO</span><Gift aria-hidden="true" />{campaign.offer}</div><h3>{campaign.title}</h3><p>{campaign.description}</p><div className="campaign-slide-actions"><Link href={campaign.href}>{campaign.cta}<ArrowUpRight aria-hidden="true" /></Link><CampaignCode campaign={campaign} /></div><span className="campaign-disclaimer">Oferta ficticia para explorar esta demo. Consulta las condiciones reales por WhatsApp.</span></div>
        </article>
      </div>
      <div className="campaign-pagination" role="group" aria-label="Elegir promoción">{campaigns.map((item, itemIndex) => <button key={item.id} type="button" onClick={() => select(itemIndex)} aria-label={`Ver promoción ${itemIndex + 1}: ${item.label}`} aria-pressed={index === itemIndex}><span className="campaign-pagination-dot" /><span>{item.label}</span></button>)}</div>
    </section>
  );
}
