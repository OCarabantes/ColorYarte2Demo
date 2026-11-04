"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock, Heart, MapPin, MessageCircle, Phone, Plus, Sparkles } from "lucide-react";
import { EmbossingIcon, FamilyIcon, MiyukiIcon, PaintingIcon, GuideIcon, KitIcon } from "@/components/craft-icons";
import { whatsappUrl, formatPrice, remainingSeats, shortDateLabel, workshopMessage, type Workshop, type Product } from "@/lib/storefront";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return <span className={`relative inline-block shrink-0 ${className}`} aria-hidden="true"><MessageCircle className="size-full" strokeWidth={1.7} /><Phone className="absolute left-[29%] top-[24%] h-[43%] w-[43%]" strokeWidth={2} /></span>;
}

export function WhatsAppLink({ message, children, className, label }: { message: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}<span className="sr-only"> (abre WhatsApp en una pestaña nueva)</span></a>;
}

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const seats = remainingSeats(workshop);
  const TechniqueIcon = workshop.technique === "Repujado" ? EmbossingIcon : workshop.technique === "Joyería Miyuki" ? MiyukiIcon : PaintingIcon;
  return (
    <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#F4DCE3] bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E9004B]/45 hover:shadow-lg hover:shadow-rose-900/10">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#F4DCE3]/70 bg-linear-to-br from-[#fff0f4] via-[#fff9ee] to-[#eff8f1] p-2">
        <img src={workshop.image} alt={workshop.imageAlt} width={700} height={525} loading="lazy" className="h-full w-full rounded-[14px] object-contain drop-shadow-2xs" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white/95 px-2.5 py-1 text-[9.5px] font-extrabold text-rose-700 shadow-2xs backdrop-blur-md">
          <TechniqueIcon className="size-3 text-rose-600" aria-hidden="true" />
          {workshop.technique}
        </span>
        <span className={`absolute bottom-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[9.5px] font-extrabold shadow-2xs ${workshop.audience === "En familia" ? "bg-[#dbf5e4] text-emerald-950 border border-emerald-200" : "bg-[#ffe4ec] text-rose-900 border border-rose-200"}`}>
          {workshop.audience === "En familia" ? "👩‍👧‍👦 En familia" : "🌸 Para ti"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E9004B] px-2.5 py-1 text-[10.5px] font-extrabold text-white shadow-2xs">
            <CalendarDays className="size-3 shrink-0" aria-hidden="true" />
            <time dateTime={workshop.date}>{shortDateLabel(workshop.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0C7] px-2.5 py-1 text-[10px] font-extrabold text-[#21152D]">
            <Clock className="size-3 shrink-0" aria-hidden="true" />
            {workshop.time} h · {workshop.duration}
          </span>
        </div>
        <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug tracking-[-.02em] text-[#21152D]">
          {workshop.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#675D68]">
          {workshop.description}
        </p>
        <div className="mt-2.5 rounded-xl border border-[#F4DCE3]/80 bg-[#FFF9F7] p-2">
          <p className="flex items-start gap-1 text-[11px] font-bold leading-snug text-[#21152D]">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#E9004B]" aria-hidden="true" />
            <span className="line-clamp-1">{workshop.venue}</span>
          </p>
          <p className="mt-0.5 pl-4 line-clamp-1 text-[10px] text-[#675D68]">{workshop.location}</p>
        </div>
        <div className="mt-auto pt-3">
          <div className="mb-2.5 flex items-baseline justify-between gap-2 border-t border-[#F4DCE3]/70 pt-2.5">
            <div>
              <span className="text-base font-extrabold tracking-tight text-[#21152D]">{formatPrice(workshop.price)}</span>
              <span className="ml-1 text-[9.5px] font-medium text-[#675D68]">CLP</span>
            </div>
            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold ${seats === 0 ? "text-stone-500" : seats <= 4 ? "text-[#E9004B]" : "text-[#008653]"}`}>
              <span className={`size-1.5 rounded-full ${seats === 0 ? "bg-stone-400" : seats <= 4 ? "bg-[#E9004B]" : "bg-[#008653]"}`} />
              {seats === 0 ? "Agotado" : `${seats} cupos`}
            </span>
          </div>
          <WhatsAppLink
            message={workshopMessage(workshop)}
            className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-full bg-[#008653] px-3.5 py-2 text-[11px] font-extrabold text-white shadow-2xs transition-all duration-200 hover:bg-[#006B43] active:scale-[.98]"
            label={`${seats ? "Reservar" : "Consultar lista de espera para"} ${workshop.title} por WhatsApp`}
          >
            <WhatsAppIcon className="size-3.5" />
            <span>{seats ? "Reservar por WhatsApp" : "Lista de espera"}</span>
            <ArrowUpRight className="ml-auto size-3.5" aria-hidden="true" />
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}

export function ProductCard({ product, onSelect, onAdd }: { product: Product; onSelect: (product: Product) => void; onAdd: (product: Product) => void }) {
  const isDigital = product.category === "guias";
  const isKit = product.category === "kits";
  const BadgeIcon = isDigital ? GuideIcon : isKit ? KitIcon : product.id === "obra-botanica" ? EmbossingIcon : MiyukiIcon;

  if (isKit) {
    return (
      <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-[20px] border border-stone-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-950/8">
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-stone-100 bg-linear-to-b from-[#faf5ee] to-[#f1e9de] p-2.5">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="block h-full w-full text-left"
            aria-label={`Ver detalles de ${product.name}`}
          >
            <img src={product.image} alt={product.imageAlt} width={700} height={525} loading="lazy" className="h-full w-full rounded-[14px] object-contain drop-shadow-2xs" />
            <span className="pointer-events-none absolute left-3 top-3 inline-flex max-w-[calc(100%-24px)] items-center gap-1 rounded-full bg-[#e7f3e6]/95 px-2.5 py-1 text-[9px] font-extrabold text-emerald-950 shadow-2xs backdrop-blur-md">
              <BadgeIcon className="size-3" aria-hidden="true" />{product.badge}
            </span>
            {product.occasionTag && (
              <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-extrabold text-rose-700 shadow-2xs backdrop-blur-md">
                {product.occasionTag}
              </span>
            )}
            <span className="pointer-events-none absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-ink shadow-xs transition-all duration-300 group-hover:bg-stone-900 group-hover:text-white">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => onAdd(product)}
            disabled={product.stock === 0}
            className="absolute bottom-3 left-3 z-10 flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#E9004B] text-white shadow-md shadow-[#E9004B]/30 transition-all duration-300 hover:scale-105 hover:bg-[#C90041] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Agregar ${product.name} a mi bolsa`}
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[9.5px] font-extrabold text-rose-700">
              <FamilyIcon className="size-3" aria-hidden="true" />
              {product.familyAudience ?? "Para crear en familia"}
            </span>
          </div>

          <h3 className="mt-2 line-clamp-2 text-[14.5px] font-extrabold leading-snug tracking-[-.02em] text-[#21152D]">
            <button type="button" className="text-left transition-colors hover:text-[#E9004B]" onClick={() => onSelect(product)}>
              {product.name}
            </button>
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#675D68]">{product.description}</p>

          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.includes.slice(0, 2).map((item) => (
              <span key={item} className="rounded-md bg-stone-100 px-2 py-0.5 text-[9.5px] font-medium text-stone-600">
                + {item}
              </span>
            ))}
            {product.includes.length > 2 && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9.5px] font-bold text-emerald-800">
                +{product.includes.length - 2} más
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-stone-100 pt-3 mt-3">
            <div>
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-emerald-800">Todo incluido</span>
              <span className="text-base font-extrabold tracking-tight text-[#21152D]">
                {formatPrice(product.price)}
                <span className="ml-1 text-[9px] font-medium text-stone-500">CLP</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="inline-flex min-h-8 items-center justify-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10.5px] font-extrabold text-stone-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            >
              Ver qué incluye
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (isDigital) {
    return (
      <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E8D7F1] bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E9004B]/45 hover:shadow-lg hover:shadow-purple-950/8">
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#F2E6F7] bg-linear-to-br from-[#f6eefc] via-[#fff2f6] to-[#fef6e6] p-2.5">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="relative block h-full w-full overflow-hidden rounded-[14px] border border-white/90 bg-white shadow-xs text-left"
            aria-label={`Ver detalles de ${product.name}`}
          >
            <img src={product.image} alt={product.imageAlt} width={600} height={450} loading="lazy" className="h-full w-full object-cover" />
            <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#21152D]/45 via-transparent to-transparent" />
            <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[#21152D]/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-2xs backdrop-blur-xs">
              <GuideIcon className="size-3 text-[#FCE4EB]" aria-hidden="true" />
              PDF Digital
            </span>
            {product.includes[0] && (
              <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-purple-200 bg-white/95 px-2 py-0.5 text-[9px] font-extrabold text-purple-900 shadow-2xs">
                {product.includes[0]}
              </span>
            )}
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/95 text-[#21152D] shadow-xs transition-all duration-300 group-hover:bg-[#E9004B] group-hover:text-white">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="absolute bottom-4 left-4 z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#E9004B] text-white shadow-md shadow-[#E9004B]/30 transition-all duration-300 hover:scale-105 hover:bg-[#C90041] active:scale-95"
            aria-label={`Agregar ${product.name} a mi bolsa`}
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-purple-800">
            <span className="inline-block size-1.5 rounded-full bg-purple-600" aria-hidden="true" />
            <span>Archivo descargable · Imprime o lee en pantalla</span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 text-[14px] font-extrabold leading-snug tracking-[-.02em] text-[#21152D]">
            <button type="button" className="text-left transition-colors hover:text-[#E9004B]" onClick={() => onSelect(product)}>
              {product.name.replace(/^Guía PDF ·\s*/i, "")}
            </button>
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#675D68]">
            {product.description}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.includes.slice(1, 3).map((item) => (
              <span key={item} className="rounded-md bg-[#F9F2FC] px-2 py-0.5 text-[9.5px] font-semibold text-purple-900">
                ✓ {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-stone-100 pt-3 mt-3">
            <div>
              <span className="block text-[8.5px] font-extrabold uppercase tracking-wider text-purple-700">Envío digital PDF</span>
              <span className="text-base font-extrabold tracking-tight text-[#21152D]">
                {formatPrice(product.price)}
                <span className="ml-1 text-[9px] font-medium text-[#675D68]">CLP</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="inline-flex min-h-8 items-center justify-center rounded-full border border-purple-200 bg-purple-50/70 px-3 py-1 text-[10.5px] font-extrabold text-purple-900 transition-colors hover:border-[#E9004B] hover:bg-[#FFF0F4] hover:text-[#E9004B]"
            >
              Ver índice PDF
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#F4DCE3] bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E9004B]/45 hover:shadow-lg hover:shadow-rose-950/8">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#F4DCE3]/70 bg-stone-100">
        <button type="button" onClick={() => onSelect(product)} className="block h-full w-full text-left" aria-label={`Ver detalles de ${product.name}`}>
          <img src={product.image} alt={product.imageAlt} width={700} height={525} loading="lazy" className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute left-3 top-3 inline-flex max-w-[calc(100%-24px)] items-center gap-1 rounded-full bg-[#ffefea] px-2.5 py-1 text-[9px] font-extrabold text-rose-800 shadow-2xs"><BadgeIcon className="size-3" aria-hidden="true" />{product.badge}</span>
          <span className="pointer-events-none absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-ink shadow-xs transition-all duration-300 group-hover:bg-stone-900 group-hover:text-white"><ArrowUpRight className="size-3.5" aria-hidden="true" /></span>
        </button>
        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className="absolute bottom-3 left-3 z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#E9004B] text-white shadow-md shadow-[#E9004B]/30 transition-all duration-300 hover:scale-105 hover:bg-[#C90041] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Agregar ${product.name} a mi bolsa`}
        >
          <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-stone-500">Hecho con tiempo y cariño</span>
        <h3 className="mt-1 line-clamp-2 text-[14.5px] font-extrabold leading-snug tracking-[-.02em] text-[#21152D]"><button type="button" className="text-left transition-colors hover:text-[#E9004B]" onClick={() => onSelect(product)}>{product.name}</button></h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#675D68]">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-stone-100 pt-3 mt-3">
          <span className="text-base font-extrabold tracking-tight text-[#21152D]">{formatPrice(product.price)}<span className="ml-1 text-[9px] font-medium text-stone-500">CLP</span></span>
          <button type="button" onClick={() => onSelect(product)} className="inline-flex min-h-8 items-center justify-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10.5px] font-extrabold text-stone-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">Ver detalles</button>
        </div>
      </div>
    </article>
  );
}

