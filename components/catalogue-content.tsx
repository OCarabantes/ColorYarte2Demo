"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Truck } from "lucide-react";
import { products, type KitGroup, type ProductCategory } from "@/lib/storefront";
import { ProductCard, WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";
import { ButterflyIcon, KitIcon, FamilyIcon, GuideIcon, PaintingIcon } from "@/components/craft-icons";
import { useStorefront } from "@/components/site-shell";

const categories = {
  kits: {
    title: "Kits DIY Familiares",
    highlightTitle: ["Kits DIY ", "Familiares"] as const,
    audienceSubtitle: "Especial para mamás, niños y toda la familia: actividades creativas en casa con todos los materiales incluidos.",
    delivery: "Entrega y envío a todo Chile a coordinar por WhatsApp. Armamos packs familiares y de cumpleaños a medida.",
    contact: "¿Quieres armar un Pack Familiar o celebrar un cumpleaños creativo?",
    help: "Cuéntanos cuántos son en casa o las edades de los niños y te recomendamos la combinación perfecta de kits.",
    message: "¡Hola, Color & Arte! 🌷 Me gustaría consultar por los Kits DIY Familiares y opciones de packs para crear en casa. ¿Me ayudan a elegir?",
  },
  obras: {
    title: "Obras Únicas",
    highlightTitle: ["Obras ", "Únicas"] as const,
    audienceSubtitle: "Especial para mujeres, mamás y amantes del arte manual: piezas hechas a mano con dedicación para regalar o decorar tu rincón.",
    delivery: "Piezas y existencias de demostración. Consulta disponibilidad, terminación y envío por WhatsApp.",
    contact: "¿Buscas un detalle especial?",
    help: "Conversemos sobre colores, terminaciones y piezas disponibles para tu próximo regalo.",
    message: "¡Hola, Color & Arte! 🌷 Me interesan las piezas artesanales. ¿Me cuentan cuáles están disponibles?",
  },
  guias: {
    title: "Guías PDF",
    highlightTitle: ["Guías ", "PDF"] as const,
    audienceSubtitle: "Especial para mujeres, mamás y familias creativas: tutoriales paso a paso en español para aprender nuevas técnicas desde casa a tu ritmo.",
    delivery: "Guías de demostración: consulta disponibilidad y entrega digital por WhatsApp. Aún no hay descarga automática.",
    contact: "¿Con qué técnica quieres empezar?",
    help: "Cuéntanos qué te gustaría aprender y te orientamos para encontrar tu primera guía.",
    message: "¡Hola, Color & Arte! 🌷 Quisiera consultar por sus guías PDF y cómo recibirlas.",
  },
} satisfies Record<ProductCategory, object>;

export function CatalogueContent({ category }: { category: ProductCategory }) {
  const [sort, setSort] = useState("featured");
  const [kitFilter, setKitFilter] = useState<"all" | KitGroup>("all");
  const { addToCart, openProduct } = useStorefront();
  const content = categories[category];
  const DeliveryIcon = category === "guias" ? GuideIcon : Truck;
  const categoryProducts = products.filter((product) => product.category === category);
  const visibleProducts = categoryProducts
    .filter((product) => category !== "kits" || kitFilter === "all" || product.kitGroup === kitFilter)
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);

  return (
    <>
      <div className="mx-auto max-w-[1260px] px-5 pt-5 text-xs text-stone-500 md:px-8">
        <Link href="/" className="hover:text-rose-600">Inicio</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span>{content.title}</span>
      </div>

      <section aria-labelledby="category-title" className="mx-auto max-w-[1260px] px-5 pb-4 pt-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#F4DCE3] pb-4">
          <div>
            <h1 id="category-title" className="text-2xl font-extrabold tracking-tight text-[#21152D] sm:text-3xl">
              {content.highlightTitle[0]}
              <span className="text-[#E9004B]">{content.highlightTitle[1]}</span>
            </h1>
            <p className="mt-1 text-xs font-medium text-[#675D68] sm:text-sm">
              {content.audienceSubtitle}
            </p>
          </div>
          <label className="flex min-h-10 items-center gap-2 text-[11px] text-stone-500">
            <span>Ordenar:</span>
            <select
              aria-label="Ordenar productos"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-h-10 max-w-40 cursor-pointer rounded-full border border-stone-200 bg-white px-3 text-[11px] font-bold text-ink"
            >
              <option value="featured">Nuestros favoritos</option>
              <option value="price-asc">Menor precio primero</option>
              <option value="price-desc">Mayor precio primero</option>
            </select>
          </label>
        </div>
      </section>

      <section data-reveal id="catalogo" aria-labelledby="category-title" className="mx-auto max-w-[1260px] px-5 pb-12 md:px-8">
        {category === "kits" && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f5efe8] p-2.5 sm:px-4">
            <div role="group" aria-label="Filtrar kits por experiencia familiar" className="flex flex-wrap gap-2">
              {[
                { id: "all" as const, label: `Todos los Kits (${categoryProducts.length})`, icon: ButterflyIcon },
                { id: "cajas-familiares" as const, label: "Cajas de Taller en Familia (4)", icon: FamilyIcon },
                { id: "pinta-y-celebra" as const, label: "Kits Pinta y Celebra · Niños y Cumpleaños (4)", icon: PaintingIcon },
              ].map(({ id, label, icon: FilterIcon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={kitFilter === id}
                  onClick={() => setKitFilter(id)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-extrabold transition-all duration-200 ${kitFilter === id ? "bg-rose-600 text-white shadow-sm" : "bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-700"}`}
                >
                  <FilterIcon className="size-3.5" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <span className="px-1 text-[10px] font-bold text-stone-500">✨ Todos incluyen materiales listos para usar</span>
          </div>
        )}

        {category === "guias" && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E8D7F1] bg-[#FAF5FD] px-4 py-2.5 text-[11px] font-bold text-purple-950">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-900 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                <GuideIcon className="size-3" aria-hidden="true" />
                100% Formato Digital PDF
              </span>
              <span>📲 Recíbelas en tu WhatsApp o correo</span>
              <span className="hidden sm:inline text-purple-300">•</span>
              <span className="hidden sm:inline">🖨️ Con plantillas listas para imprimir en casa</span>
            </div>
            <span className="text-[10px] font-extrabold text-[#E9004B]">Sin envío físico · Acceso inmediato</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={openProduct} onAdd={addToCart} />)}
        </div>
        <p className="mx-auto mt-7 flex max-w-2xl items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-stone-500"><DeliveryIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{content.delivery}</p>

        {category === "kits" && (
          <div className="mt-12 overflow-hidden rounded-[28px] border border-rose-200/70 bg-linear-to-br from-[#fff5f6] via-[#fffdf9] to-[#f3f8ee] p-6 sm:p-9">
            <div className="max-w-2xl">
              <p className="section-kicker mb-2 flex items-center gap-2 text-rose-600"><FamilyIcon className="size-4" aria-hidden="true" />IDEAS PARA DISFRUTAR JUNTOS EN CASA</p>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">3 planes familiares que empiezan abriendo un kit<span className="text-rose-500">.</span></h2>
              <p className="mt-2.5 text-xs leading-relaxed text-stone-600 sm:text-sm">No necesitas esperar una ocasión especial para regalarles tiempo de calidad. Mira cómo nuestras familias combinan sus kits favoritos:</p>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              <div className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#faf5ee] p-2">
                  <img src="/images/kits/Kit de repujado.jpeg" alt="Kit de Repujado con 4 láminas" className="aspect-square w-full rounded-lg object-contain" />
                  <img src="/images/kits/Kit de kinusaiga.jpeg" alt="Kit de Kinusaiga sin agujas" className="aspect-square w-full rounded-lg object-contain" />
                </div>
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-extrabold text-amber-900">☕ Plan 1 · Domingo de Mesa Grande</span>
                <h3 className="mt-2.5 text-base font-extrabold">Padres, hijos y abuelos creando a la par</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-stone-600">El <strong>Kit de Repujado</strong> incluye 4 láminas de aluminio y el <strong>Kit de Kinusaiga</strong> permite crear con telas sin usar agujas. Es la dupla ideal para que todos en la mesa tengan su propio proyecto mientras conversan.</p>
              </div>

              <div className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#faf5ee] p-2">
                  <img src="/images/kits/kit de puntillismo.jpeg" alt="Kit de Puntillismo" className="aspect-square w-full rounded-lg object-contain" />
                  <img src="/images/kits/Kit pinta tu corazon.jpeg" alt="Kit Pinta tu Corazón" className="aspect-square w-full rounded-lg object-contain" />
                </div>
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-[10px] font-extrabold text-rose-800">💖 Plan 2 · Tarde de Calma y Cariño</span>
                <h3 className="mt-2.5 text-base font-extrabold">Bajar las revoluciones y pintar con el corazón</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-stone-600">Combina el <strong>Kit de Puntillismo</strong> con <strong>Pinta tu Corazón</strong> para una tarde relajante entre mamá, papá e hijos. Sus 10 pinturas acrílicas y relieves guían cada trazo sin estrés.</p>
              </div>

              <div className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#faf5ee] p-2">
                  <img src="/images/kits/Kit para pintar Girasol.jpeg" alt="Kit para pintar Girasol" className="aspect-square w-full rounded-lg object-contain" />
                  <img src="/images/kits/Kit para pintar OSO.2.jpeg" alt="Kit para pintar Osito" className="aspect-square w-full rounded-lg object-contain" />
                </div>
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-900">🎂 Plan 3 · Cumpleaños, Primos y Lluvia</span>
                <h3 className="mt-2.5 text-base font-extrabold">Cada niño con sus propios pinceles y figura</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-stone-600">Con los kits de <strong>Girasol, Mariposa y Ositos 3D</strong>, cada niño recibe su figura, 3 pinturas y 3 pinceles propios. ¡Cero peleas en la mesa y el recuerdo más lindo para cumpleaños o pijamadas!</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8"><div className="max-w-lg"><p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600"><KitIcon className="size-3.5" aria-hidden="true" />Te acompañamos a elegir</p><h2 className="text-xl font-extrabold tracking-tight">{content.contact}</h2><p className="mt-2 text-xs leading-relaxed text-stone-500">{content.help}</p></div><WhatsAppLink message={content.message} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-900 active:scale-[.97]"><WhatsAppIcon className="size-4" />Conversemos<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink></div>
      </section>
    </>
  );
}
