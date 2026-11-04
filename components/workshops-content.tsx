"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Heart } from "lucide-react";
import { ButterflyIcon, WellbeingIcon, FamilyIcon } from "@/components/craft-icons";
import { homeFeaturedWorkshops, workshopShowcase, outlineButton } from "@/lib/storefront";
import { WorkshopCard, WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";

export function WorkshopsContent() {
  const [month, setMonth] = useState("all");
  const [audience, setAudience] = useState("Todos");
  const visibleWorkshops = homeFeaturedWorkshops.filter(
    (workshop) => (month === "all" || workshop.date.startsWith(month)) && (audience === "Todos" || workshop.audience === audience)
  );

  return (
    <>
      <div className="mx-auto max-w-[1260px] px-5 pt-5 text-xs text-stone-500 md:px-8">
        <Link href="/" className="hover:text-rose-600">Inicio</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span>Talleres Presenciales</span>
      </div>

      <section aria-labelledby="workshops-title" className="mx-auto max-w-[1260px] px-5 pb-4 pt-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#F4DCE3] pb-4">
          <div>
            <h1 id="workshops-title" className="text-2xl font-extrabold tracking-tight text-[#21152D] sm:text-3xl">
              Talleres <span className="text-[#E9004B]">Presenciales</span>
            </h1>
            <p className="mt-1 text-xs font-medium text-[#675D68] sm:text-sm">
              Especial para mujeres, mamás y familias en Lo Barnechea: tu momento de hobby y desconexión con materiales y cafetería incluidos.
            </p>
          </div>
          <label className="inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 text-[11px] font-bold text-ink">
            <CalendarDays className="size-3.5 text-[#E9004B]" aria-hidden="true" />
            <span className="sr-only">Mes de los talleres</span>
            <select
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              className="cursor-pointer bg-transparent py-2 pr-1 text-[11px] font-bold outline-offset-2"
            >
              <option value="all">Todas las fechas ({homeFeaturedWorkshops.length})</option>
              <option value="2026-11">Noviembre 2026</option>
              <option value="2026-12">Diciembre 2026</option>
            </select>
          </label>
        </div>
      </section>

      <section data-reveal id="talleres" aria-labelledby="workshops-title" className="mx-auto max-w-[1260px] px-5 pb-10 md:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f5efe8] p-2.5 sm:px-4">
          <div role="group" aria-label="Tipo de taller" className="flex flex-wrap gap-2">
            {[
              { id: "Todos", label: "Todas las experiencias", icon: ButterflyIcon },
              { id: "Para ti", label: "Para ti · Mujeres & Mamás", icon: WellbeingIcon },
              { id: "En familia", label: "En familia con niños", icon: FamilyIcon },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={audience === id}
                onClick={() => setAudience(id)}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition-all duration-200 ${
                  audience === id ? "bg-[#E9004B] text-white shadow-xs" : "bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <span className="px-1 text-[10px] font-bold text-stone-500">📍 Lo Barnechea · Materiales y cafetería incluidos</span>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {visibleWorkshops.length} talleres disponibles en el filtro seleccionado
        </div>

        {visibleWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-rose-200 bg-white px-6 py-10 text-center">
            <ButterflyIcon className="mx-auto mb-3 size-8 text-rose-400" aria-hidden="true" />
            <h3 className="font-bold">Pronto habrá más momentos para compartir</h3>
            <p className="mb-5 mt-2 text-sm text-stone-500">No hay talleres de este tipo en el mes seleccionado. Prueba otro mes o escríbenos.</p>
            <WhatsAppLink message="¡Hola, Color & Arte! Me gustaría conocer las próximas fechas de talleres en familia. 🌷" className={outlineButton}>
              Consultar próximas fechas
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </WhatsAppLink>
          </div>
        )}
        <p className="mt-5 flex items-start justify-center gap-1.5 text-center text-[10px] leading-relaxed text-stone-500">
          <Heart className="mt-0.5 size-3 shrink-0 text-rose-500" aria-hidden="true" />
          Los cupos y la ubicación se confirman por WhatsApp. Las ganas de crear ya las tienes.
        </p>
      </section>

      <section data-reveal aria-labelledby="all-techniques-title" className="mx-auto max-w-[1260px] px-5 pb-14 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#F4DCE3] pb-3">
          <div>
            <h2 id="all-techniques-title" className="text-xl font-extrabold tracking-tight text-[#21152D] sm:text-2xl">
              Catálogo de <span className="text-[#E9004B]">9 Técnicas Creativas</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#675D68]">
              También puedes agendar cualquiera de estas experiencias para grupos de amigas, cumpleaños o tardes familiares.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {workshopShowcase.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col overflow-hidden rounded-[20px] border bg-linear-to-br p-3 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.accent} bg-white`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-white p-1.5 shadow-2xs">
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-104"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-[#E9004B] px-2.5 py-0.5 text-[9px] font-extrabold text-white shadow-2xs">
                  {item.badge}
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-full bg-amber-100/95 px-2 py-0.5 text-[9px] font-extrabold text-amber-950">
                  {item.audience}
                </span>
              </div>
              <div className="mt-3 flex flex-1 flex-col px-0.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-600">{item.subtitle}</span>
                <h3 className="mt-0.5 line-clamp-2 text-[14px] font-extrabold leading-snug tracking-tight text-ink">{item.title}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-stone-600">{item.description}</p>
                <div className="mt-3 flex items-center justify-end border-t border-rose-200/50 pt-2.5">
                  <WhatsAppLink
                    message={`¡Hola, Color & Arte! 🌷 Me encantó el «${item.title}». ¿Me cuentan cuándo es la próxima fecha o cómo agendarlo?`}
                    className="inline-flex min-h-8 w-full items-center justify-center gap-1.5 rounded-full bg-[#008653] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-2xs transition-colors hover:bg-[#006B43]"
                  >
                    <WhatsAppIcon className="size-3.5" />
                    <span>Consultar fecha</span>
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
