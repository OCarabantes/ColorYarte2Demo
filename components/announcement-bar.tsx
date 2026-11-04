"use client";

import { ButterflyIcon } from "@/components/craft-icons";

export function AnnouncementBar() {
  return (
    <section aria-label="Presentación de la marca" className="announcement-bar">
      <div className="announcement-inner">
        <p className="inline-flex items-center justify-center gap-2 text-center text-[10px] font-bold leading-none tracking-[0.09em] text-white sm:text-[11px]">
          <ButterflyIcon className="size-3 shrink-0 text-[#ffe6a7]" tone="current" aria-hidden="true" />
          <span>Atelier Color &amp; Arte • Cerámica, Textil &amp; Botánica</span>
          <ButterflyIcon className="size-3 shrink-0 text-[#ffe6a7]" tone="current" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
