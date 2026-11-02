"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Brush, CalendarDays, Clock, FileDown, Heart, MapPin, MessageCircle, PackageCheck, Phone, Plus } from "lucide-react";
import { whatsappUrl, formatPrice, remainingSeats, dateLabel, workshopMessage, buttonBase, type Workshop, type Product } from "@/lib/storefront";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return <span className={`relative inline-block shrink-0 ${className}`} aria-hidden="true"><MessageCircle className="size-full" strokeWidth={1.7} /><Phone className="absolute left-[29%] top-[24%] h-[43%] w-[43%]" strokeWidth={2} /></span>;
}

export function WhatsAppLink({ message, children, className, label }: { message: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}<span className="sr-only"> (abre WhatsApp en una pestaña nueva)</span></a>;
}

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const seats = remainingSeats(workshop);
  return (
    <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-[24px] border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-300/25">
      <div className="relative aspect-[1.65] overflow-hidden">
        <img src={workshop.image} alt={workshop.imageAlt} width={1100} height={733} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-stone-700 backdrop-blur-md"><Brush className="size-3.5 text-rose-600" aria-hidden="true" />{workshop.technique}</span>
        <span className={`absolute bottom-4 right-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold shadow-sm ${workshop.audience === "En familia" ? "bg-[#e4f4e9] text-emerald-900" : "bg-[#fff0c3] text-amber-950"}`}>{workshop.audience === "En familia" ? "Para crear en familia" : "Tu momento creativo"}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold text-rose-700"><CalendarDays className="size-3.5" aria-hidden="true" /><time dateTime={workshop.date} className="capitalize">{dateLabel(workshop.date)}</time><span className="text-stone-300">·</span><span>{workshop.time} h</span></div>
        <h3 className="text-[20px] font-extrabold leading-snug tracking-[-.035em]">{workshop.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-500">{workshop.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-stone-500">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-stone-400" aria-hidden="true" />{workshop.venue}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-stone-400" aria-hidden="true" />{workshop.duration}</span>
        </div>
        <p className="mt-2 text-[11px] text-stone-500">{workshop.age} · Materiales y bebida incluidos</p>
        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end justify-between gap-2 border-t border-stone-100 pt-4">
            <div><span className="text-[23px] font-extrabold tracking-tight">{formatPrice(workshop.price)}</span><span className="ml-1 text-[10px] text-stone-500">CLP / persona</span></div>
            <span className={`mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold ${seats === 0 ? "text-stone-500" : seats <= 4 ? "text-rose-700" : "text-emerald-700"}`}><span className={`size-1.5 rounded-full ${seats === 0 ? "bg-stone-400" : seats <= 4 ? "bg-rose-500" : "bg-emerald-500"}`} />{seats === 0 ? "Cupos completos" : `${seats} cupos disponibles`}</span>
          </div>
          <WhatsAppLink message={workshopMessage(workshop)} className={`${buttonBase} w-full border border-rose-200 bg-rose-50/70 px-3 py-3 text-xs text-rose-700 hover:border-rose-600 hover:bg-rose-600 hover:text-white`} label={`${seats ? "Reservar" : "Consultar lista de espera para"} ${workshop.title} por WhatsApp`}><WhatsAppIcon className="size-4" />{seats ? "Reservar por WhatsApp" : "Unirme a la lista de espera"}<ArrowUpRight className="ml-auto size-4" aria-hidden="true" /></WhatsAppLink>
        </div>
      </div>
    </article>
  );
}

export function ProductCard({ product, onSelect, onAdd }: { product: Product; onSelect: (product: Product) => void; onAdd: (product: Product) => void }) {
  const isDigital = product.category === "guias";
  const BadgeIcon = isDigital ? FileDown : product.category === "kits" ? PackageCheck : Heart;
  return (
    <article className="image-zoom group flex h-full flex-col">
      <button type="button" onClick={() => onSelect(product)} className="relative block aspect-[1.08] w-full overflow-hidden rounded-[22px] bg-stone-100 text-left" aria-label={`Ver detalles de ${product.name}`}>
        <img src={product.image} alt={product.imageAlt} width={1100} height={733} loading="lazy" className="h-full w-full object-cover" />
        {isDigital && <span className="absolute inset-0 bg-linear-to-t from-[#362145]/30 to-transparent" />}
        <span className={`absolute left-3 top-3 inline-flex max-w-[calc(100%-24px)] items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-extrabold shadow-sm ${isDigital ? "bg-[#f1e7f6] text-purple-900" : product.category === "kits" ? "bg-[#e7f1e6] text-emerald-900" : "bg-[#ffefea] text-rose-800"}`}><BadgeIcon className="size-3" aria-hidden="true" />{product.badge}</span>
        {isDigital && <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/30 bg-white/90 px-3 py-2 text-ink backdrop-blur-md"><FileDown className="size-5 text-purple-700" aria-hidden="true" /><span className="text-[10px] font-bold">Tu próximo proyecto<br /><span className="font-normal text-stone-500">empieza en una página</span></span></span>}
        <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
      </button>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-stone-500">{product.category === "kits" ? "Creatividad para llevar" : isDigital ? "Aprende a tu ritmo · PDF" : "Hecho con tiempo y cariño"}</span>
        <h3 className="mt-1.5 text-[15px] font-extrabold tracking-[-.035em]"><button type="button" className="text-left transition-colors hover:text-rose-600" onClick={() => onSelect(product)}>{product.name}</button></h3>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4"><span className="text-lg font-extrabold tracking-tight">{formatPrice(product.price)}<span className="ml-1 text-[9px] font-medium text-stone-500">CLP</span></span><button type="button" onClick={() => onAdd(product)} disabled={product.stock === 0} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-600 transition-all duration-300 hover:border-rose-600 hover:bg-rose-600 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Agregar ${product.name} a mi bolsa`}><Plus className="size-4" aria-hidden="true" /></button></div>
      </div>
    </article>
  );
}

