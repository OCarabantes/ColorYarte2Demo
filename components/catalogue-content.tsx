"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, FileDown, Heart, PackageCheck, Scissors, Truck } from "lucide-react";
import { products, type ProductCategory } from "@/lib/storefront";
import { ProductCard, WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";
import { useStorefront } from "@/components/site-shell";

const categories = {
  kits: {
    title: "Kits DIY Familiares",
    eyebrow: "UNA CAJA, MIL POSIBILIDADES",
    description: "Llévate el taller a casa. Materiales seleccionados, instrucciones sencillas y una buena excusa para compartir tiempo en familia.",
    subtitle: "Tu próxima tarde creativa",
    icon: Scissors,
    color: "bg-[#e9efdf] text-emerald-900",
    benefits: ["Materiales completos", "Instrucciones paso a paso", "Para crear a tu ritmo"],
    delivery: "Entrega y envío a coordinar por WhatsApp. El valor del envío se confirma antes de pagar.",
    contact: "¿Un kit para regalar o para tu grupo?",
    help: "Cuéntanos qué te gustaría crear y te ayudamos a elegir una experiencia para compartir.",
    message: "¡Hola, Color & Arte! 🌷 Me gustaría consultar por los kits DIY para crear en casa. ¿Me ayudan a elegir?",
  },
  obras: {
    title: "Obras Únicas",
    eyebrow: "HECHO CON TIEMPO Y CORAZÓN",
    description: "Pequeñas obras con una historia detrás. Descubre piezas artesanales para regalar algo especial o dar un toque de color a tu espacio.",
    subtitle: "Piezas de autor, detalles con alma",
    icon: Heart,
    color: "bg-[#fbe9ed] text-rose-900",
    benefits: ["100% hecho a mano", "Detalles con identidad", "Terminaciones para consultar"],
    delivery: "Piezas y existencias de demostración. Consulta disponibilidad, terminación y envío por WhatsApp.",
    contact: "¿Buscas un detalle especial?",
    help: "Conversemos sobre colores, terminaciones y piezas disponibles para tu próximo regalo.",
    message: "¡Hola, Color & Arte! 🌷 Me interesan las piezas artesanales. ¿Me cuentan cuáles están disponibles?",
  },
  guias: {
    title: "Guías PDF",
    eyebrow: "LA INSPIRACIÓN TAMBIÉN SE LEE",
    description: "Un nuevo proyecto empieza en una página. Explora guías ilustradas con ideas, técnicas y ejercicios para aprender desde casa, a tu propio ritmo.",
    subtitle: "Tu próxima idea, paso a paso",
    icon: FileDown,
    color: "bg-[#f1e7f6] text-purple-900",
    benefits: ["Formato digital PDF", "Contenido en español", "Sin materiales físicos"],
    delivery: "Guías de demostración: consulta disponibilidad y entrega digital por WhatsApp. Aún no hay descarga automática.",
    contact: "¿Con qué técnica quieres empezar?",
    help: "Cuéntanos qué te gustaría aprender y te orientamos para encontrar tu primera guía.",
    message: "¡Hola, Color & Arte! 🌷 Quisiera consultar por sus guías PDF y cómo recibirlas.",
  },
} satisfies Record<ProductCategory, object>;

export function CatalogueContent({ category }: { category: ProductCategory }) {
  const [sort, setSort] = useState("featured");
  const { addToCart, openProduct } = useStorefront();
  const content = categories[category];
  const Icon = content.icon;
  const DeliveryIcon = category === "guias" ? FileDown : Truck;
  const visibleProducts = products.filter((product) => product.category === category)
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);

  return (
    <>
      <div className="mx-auto max-w-[1260px] px-5 pt-7 text-xs text-stone-500 md:px-8"><Link href="/" className="hover:text-rose-600">Inicio</Link><span className="mx-2" aria-hidden="true">/</span><span>{content.title}</span></div>
      <section aria-labelledby="category-title" className="mx-auto max-w-[1260px] px-5 pb-9 pt-7 md:px-8">
        <div className={`relative overflow-hidden rounded-[28px] px-7 py-9 sm:px-10 sm:py-11 ${content.color}`}>
          <Icon className="pointer-events-none absolute -bottom-8 -right-5 size-48 rotate-12 opacity-[.07] sm:right-6" strokeWidth={.8} aria-hidden="true" />
          <div className="relative max-w-[700px]">
            <p className="section-kicker mb-3 flex items-center gap-2"><Icon className="size-4" aria-hidden="true" />{content.eyebrow}</p>
            <h1 id="category-title" className="text-[32px] font-extrabold leading-tight tracking-[-.045em] sm:text-[44px]">{content.title}<span className="text-rose-500">.</span></h1>
            <p className="mt-4 max-w-[600px] text-sm leading-relaxed opacity-85">{content.description}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{content.benefits.map((benefit) => <li key={benefit} className="flex items-center gap-1.5 text-[10px] font-bold"><Check className="size-3.5 shrink-0" aria-hidden="true" />{benefit}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="catalogo" aria-labelledby="catalogue-title" className="mx-auto max-w-[1100px] px-5 pb-12 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div><h2 id="catalogue-title" className="text-xl font-extrabold tracking-tight sm:text-2xl">{content.subtitle}</h2><p className="mt-2 text-[11px] text-stone-500">{visibleProducts.length} {category === "guias" ? "guías para explorar" : category === "kits" ? "kits para crear" : "piezas para descubrir"}</p></div>
          <label className="flex min-h-11 items-center gap-2 text-[11px] text-stone-500"><span>Ordenar:</span><select aria-label="Ordenar productos" value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-11 max-w-40 cursor-pointer rounded-full border border-stone-200 bg-white px-3 text-[11px] font-bold text-ink"><option value="featured">Nuestros favoritos</option><option value="price-asc">Menor precio primero</option><option value="price-desc">Mayor precio primero</option></select></label>
        </div>
        <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={openProduct} onAdd={addToCart} />)}</div>
        <p className="mx-auto mt-7 flex max-w-2xl items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-stone-500"><DeliveryIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{content.delivery}</p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8"><div className="max-w-lg"><p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600"><PackageCheck className="size-3.5" aria-hidden="true" />Te acompañamos a elegir</p><h2 className="text-xl font-extrabold tracking-tight">{content.contact}</h2><p className="mt-2 text-xs leading-relaxed text-stone-500">{content.help}</p></div><WhatsAppLink message={content.message} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-900 active:scale-[.97]"><WhatsAppIcon className="size-4" />Conversemos<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink></div>
      </section>
    </>
  );
}
