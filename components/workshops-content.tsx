"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Flower2, Heart, Sparkles, Users } from "lucide-react";
import { workshops, outlineButton } from "@/lib/storefront";
import { WorkshopCard, WhatsAppLink } from "@/components/storefront-ui";

export function WorkshopsContent() {
  const [month, setMonth] = useState("2026-11");
  const [audience, setAudience] = useState("Todos");
  const visibleWorkshops = workshops.filter((workshop) => workshop.date.startsWith(month) && (audience === "Todos" || workshop.audience === audience));
  return <>
    <div className="mx-auto max-w-[1260px] px-5 pt-7 text-xs text-stone-500 md:px-8"><Link href="/" className="hover:text-rose-600">Inicio</Link><span className="mx-2" aria-hidden="true">/</span><span>Talleres Presenciales</span></div>
        <section id="talleres" aria-labelledby="workshops-title" className="mx-auto max-w-[1260px] px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="section-kicker mb-2.5 flex items-center gap-2 text-rose-600"><span className="h-px w-5 bg-rose-400" />NOS ENCONTRAMOS PARA CREAR</p><h1 id="workshops-title" className="text-[29px] font-extrabold leading-tight tracking-[-.045em] sm:text-[35px]">Talleres Presenciales<span className="text-rose-500">.</span></h1><p className="mt-3 text-xs leading-relaxed text-stone-500 sm:text-[13px]">Elige tu experiencia. Nosotros ponemos los materiales, el café y el cariño.</p></div>
            <label className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-xs font-bold shadow-sm"><CalendarDays className="size-4 text-rose-500" aria-hidden="true" /><span className="sr-only">Mes de los talleres</span><select value={month} onChange={(event) => setMonth(event.target.value)} className="cursor-pointer bg-transparent py-2.5 pr-1 text-xs outline-offset-2"><option value="2026-11">Noviembre 2026</option><option value="2026-12">Diciembre 2026</option></select></label>
          </div>
          <div className="my-6 flex flex-wrap items-center justify-between gap-3"><div role="group" aria-label="Tipo de taller" className="flex flex-wrap gap-2">{[{ id: "Todos", icon: Sparkles }, { id: "Para ti", icon: Heart }, { id: "En familia", icon: Users }].map(({ id, icon: Icon }) => <button key={id} type="button" aria-pressed={audience === id} onClick={() => setAudience(id)} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[10px] font-bold transition-all duration-300 ${audience === id ? "border-rose-200 bg-[#fbe9ed] text-rose-800" : "border-transparent text-stone-500 hover:bg-white hover:text-rose-600"}`}><Icon className="size-3" aria-hidden="true" />{id === "Todos" ? "Todas las experiencias" : id}</button>)}</div><span className="text-[9px] text-stone-500">Programación y cupos de demostración</span></div>
          <div aria-live="polite" aria-atomic="true" className="sr-only">{visibleWorkshops.length} talleres disponibles en el filtro seleccionado</div>
          {visibleWorkshops.length > 0 ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleWorkshops.map((workshop) => <WorkshopCard key={workshop.id} workshop={workshop} />)}</div> : <div className="rounded-3xl border border-dashed border-rose-200 bg-white px-6 py-12 text-center"><Flower2 className="mx-auto mb-3 size-8 text-rose-400" aria-hidden="true" /><h3 className="font-bold">Pronto habrá más momentos para compartir</h3><p className="mb-5 mt-2 text-sm text-stone-500">No hay talleres de este tipo en el mes seleccionado. Prueba otro mes o escríbenos.</p><WhatsAppLink message="¡Hola, Color & Arte! Me gustaría conocer las próximas fechas de talleres en familia. 🌷" className={outlineButton}>Consultar próximas fechas<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink></div>}
          <p className="mt-5 flex items-start justify-center gap-1.5 text-center text-[10px] leading-relaxed text-stone-500"><Heart className="mt-0.5 size-3 shrink-0 text-rose-500" aria-hidden="true" />Los cupos y la ubicación se confirman por WhatsApp. Las ganas de crear ya las tienes.</p>
        </section>

  </>;
}
