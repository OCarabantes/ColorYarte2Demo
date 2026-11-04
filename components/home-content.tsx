"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown, Clock, Coffee, ExternalLink, Gift, Heart, Instagram, MapPin, Sparkles, Star, Users } from "lucide-react";
import { ButterflyIcon, WorkshopIcon, KitIcon, FamilyIcon, CreativeCafeIcon, WellbeingIcon } from "@/components/craft-icons";
import { homeFeaturedWorkshops, testimonials, GENERAL_MESSAGE, buttonBase, shortDateLabel, formatPrice, remainingSeats, workshopMessage, type Workshop } from "@/lib/storefront";
import { WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";

const INSTAGRAM_URL = "https://www.instagram.com/coloryarte_manualidades";

export function HomeContent() {
  const [workshopFilter, setWorkshopFilter] = useState<"Todos" | "Para ti" | "En familia">("Todos");

  const publishedWorkshops = homeFeaturedWorkshops.slice(0, 4);
  const homeWorkshops = publishedWorkshops.filter(
    (w) => workshopFilter === "Todos" || w.audience === workshopFilter
  );
  const visibleSlots = Math.min(Math.max(homeWorkshops.length, 1), 4);
  const rouletteDurationSeconds = Math.max(homeWorkshops.length * 6, 16);

  const totalWorkshopsCount = publishedWorkshops.length;
  const paraTiWorkshopsCount = publishedWorkshops.filter((w) => w.audience === "Para ti").length;
  const enFamiliaWorkshopsCount = publishedWorkshops.filter((w) => w.audience === "En familia").length;

  const renderWorkshopCard = (w: Workshop, keyPrefix: string) => {
    const seats = remainingSeats(w);
    const isAvailable = seats > 0;
    return (
      <div
        key={`${keyPrefix}-${w.id}`}
        data-slots={visibleSlots}
        className="workshop-roulette-card group flex flex-col overflow-hidden rounded-[20px] border border-[#F4DCE3] bg-[#FFF9F7] shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E9004B]/45 hover:shadow-lg hover:shadow-[#21152D]/8"
      >
        {/* A. Imagen del taller */}
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#F4DCE3]/70 bg-linear-to-br from-[#FFF0F4] via-white to-[#FCE4EB]/60 p-2">
          {w.image ? (
            <img
              src={w.image}
              alt={w.imageAlt || w.title}
              width={600}
              height={450}
              loading="lazy"
              className="h-full w-full rounded-[14px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#FFF0F4] text-[#E9004B]">
              <WorkshopIcon className="size-12" aria-hidden="true" />
            </div>
          )}
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold shadow-2xs backdrop-blur-md ${
              w.audience === "En familia"
                ? "border border-emerald-200 bg-emerald-50/95 text-emerald-900"
                : "border border-[#F4DCE3] bg-white/95 text-[#E9004B]"
            }`}
          >
            {w.audience === "En familia" ? "En familia" : "Para ti"}
          </span>
        </div>

        {/* Cuerpo de la tarjeta */}
        <div className="flex flex-1 flex-col p-4">
          {/* B. Fecha y horario (2 badges diferenciados) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E9004B] px-3 py-1 text-[11px] font-extrabold text-white shadow-2xs">
              <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
              <time dateTime={w.date}>{shortDateLabel(w.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0C7] px-2.5 py-1 text-[11px] font-extrabold text-[#21152D]">
              <Clock className="size-3 shrink-0 text-[#21152D]" aria-hidden="true" />
              <span>{w.time} h</span>
            </span>
          </div>

          {/* C. Nombre del taller */}
          <h4 className="mt-3 line-clamp-2 text-[15px] font-bold leading-snug text-[#21152D] transition-colors group-hover:text-[#E9004B]">
            {w.title}
          </h4>

          {/* Ubicación y dirección con jerarquía clara */}
          <div className="mt-2.5 rounded-xl border border-[#F4DCE3]/80 bg-white p-2.5">
            <p className="flex items-start gap-1.5 text-xs font-bold leading-snug text-[#21152D]">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#E9004B]" aria-hidden="true" />
              <span className="line-clamp-1">{w.venue}</span>
            </p>
            <p className="mt-0.5 pl-5 line-clamp-1 text-[11px] text-[#675D68]">{w.location}</p>
          </div>

          {/* Pie de tarjeta: Precio, cupos y botón de reserva WhatsApp */}
          <div className="mt-auto pt-3.5">
            <div className="mb-2.5 flex items-baseline justify-between gap-2 border-t border-[#F4DCE3]/70 pt-2.5">
              <div>
                <span className="text-base font-extrabold tracking-tight text-[#21152D]">
                  {formatPrice(w.price)}
                </span>
                <span className="ml-1 text-[10px] font-medium text-[#675D68]">CLP</span>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-extrabold ${
                  !isAvailable
                    ? "text-[#675D68]"
                    : seats <= 4
                    ? "text-[#E9004B]"
                    : "text-[#008653]"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    !isAvailable ? "bg-[#675D68]" : seats <= 4 ? "bg-[#E9004B]" : "bg-[#008653]"
                  }`}
                />
                {isAvailable ? `${seats} cupos` : "Agotado"}
              </span>
            </div>

            <WhatsAppLink
              message={workshopMessage(w)}
              label={`${isAvailable ? "Reservar" : "Lista de espera para"} ${w.title} por WhatsApp`}
              className={`inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold text-white shadow-xs transition-all duration-200 active:scale-[.98] ${
                isAvailable
                  ? "bg-[#008653] hover:bg-[#006B43] hover:shadow-md"
                  : "bg-[#675D68] hover:bg-[#21152D]"
              }`}
            >
              <WhatsAppIcon className="size-3.5" />
              <span>{isAvailable ? `Reservar (${seats} cupos)` : "Lista de espera"}</span>
              <ArrowUpRight className="ml-auto size-3.5" aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </div>
      </div>
    );
  };

  return <>
        <section id="inicio" aria-labelledby="hero-title" className="home-hero-section mx-auto max-w-[1320px]">
          <div className="home-hero hero-gradient hero-grain relative isolate text-white">
            <svg className="pointer-events-none absolute -left-14 bottom-[-70px] size-72 text-white/15" viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M0 100C45 20 155 20 200 100M0 130C45 50 155 50 200 130M0 160C45 80 155 80 200 160M0 190C45 110 155 110 200 190" stroke="currentColor" strokeWidth="2" /></svg>
            <svg className="pointer-events-none absolute -right-10 -top-10 size-64 text-amber-200/20" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true"><circle cx="100" cy="100" r="80" /></svg>
            <div className="home-hero-layout">
              <div className="home-hero-copy">
                <div className="home-hero-eyebrow"><ButterflyIcon aria-hidden="true" />TALLERES EN LO BARNECHEA · HOBBY, MAMÁS Y FAMILIA</div>
                <h1 id="hero-title" className="home-hero-title">Crea, comparte<br />y regálate un<br /><span>momento para ti.<svg viewBox="0 0 420 14" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M3 9C85 1 280 1 416 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span></h1>
                <p className="home-hero-description">Vive un hobby entretenido en Lo Barnechea entre café, colores y buena compañía, o lleva nuestros Kits DIY a casa para crear junto a tus hijos.</p>
                <div className="home-hero-actions">
                  <Link href="/talleres" className="home-hero-cta home-hero-cta-primary"><WorkshopIcon aria-hidden="true" /><span>Encuentra tu taller</span><ArrowUpRight aria-hidden="true" /></Link>
                  <Link href="/kits" className="home-hero-cta home-hero-cta-secondary"><span>Crea en casa</span><ArrowRight aria-hidden="true" /></Link>
                </div>
                <div className="home-hero-trust"><span><Check aria-hidden="true" />Sedes en Lo Barnechea</span><span><Check aria-hidden="true" />Materiales incluidos</span><span><Heart aria-hidden="true" />Para ti y tu familia</span></div>
              </div>
              <figure className="home-hero-visual">
                <div className="home-hero-photo"><img src="/images/familia-creativa.webp" alt="Imagen de ambientación: madre e hija disfrutan pintando figuras de yeso en una mesa creativa llena de color" width={1500} height={1000} fetchPriority="high" /></div>
                <div className="home-hero-seal" aria-label="Crear hace bien"><ButterflyIcon aria-hidden="true" /><span>CREAR<br />HACE BIEN</span></div>
                <figcaption className="home-hero-caption handwritten"><FamilyIcon aria-hidden="true" /><span>Pequeños momentos,<br /><strong>grandes recuerdos.</strong></span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* SECCIÓN PRINCIPAL #1 AL INICIO: FECHAS DE TALLERES PRESENCIALES EN LO BARNECHEA */}
        <section id="fechas-talleres" aria-labelledby="home-workshops-title" className="mx-auto max-w-[1320px] px-5 pt-7 pb-8 md:px-8 md:pt-10">
          <div className="overflow-hidden rounded-[28px] border border-[#F4DCE3] bg-[#FFF9F7] p-5 shadow-xl shadow-[#21152D]/5 sm:p-8 lg:p-10">
            {/* 3. HERO / ENCABEZADO PRINCIPAL DE LA SECCIÓN (55-60% Izquierda / 40-45% Derecha) */}
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Zona Izquierda (~58% -> 7 de 12 columnas) */}
              <div className="lg:col-span-7">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#F4DCE3] bg-[#FFF0F4] px-3.5 py-1.5 text-[11px] font-bold text-[#21152D] shadow-2xs">
                  <MapPin className="size-3.5 shrink-0 text-[#E9004B]" aria-hidden="true" />
                  <span className="truncate sm:whitespace-normal">
                    📍 Lo Barnechea, Chile (La Dehesa · Los Trapenses · El Rodeo · El Huinganal)
                  </span>
                </div>

                <h2 id="home-workshops-title" className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-.04em] text-[#21152D] sm:text-[38px] lg:text-[42px]">
                  Fechas de <span className="text-[#E9004B]">Talleres Presenciales</span> en Lo Barnechea
                </h2>

                {/* Elemento decorativo bajo el título: línea fucsia de bordes redondeados */}
                <div className="mt-3.5 h-1.5 w-20 rounded-full bg-[#E9004B]" aria-hidden="true" />

                <p className="mt-4 max-w-2xl text-[13.5px] leading-[1.75] text-[#675D68] sm:text-[15px]">
                  ¡Tu momento creativo de la semana ya tiene fecha y lugar! Elige tu taller favorito para desconectar, tomar un rico café entre mujeres o venir con tus hijos.{" "}
                  <strong className="font-bold text-[#21152D] underline decoration-[#E9004B]/35 decoration-2 underline-offset-4">
                    Todos incluyen materiales completos, guía paso a paso y cafetería.
                  </strong>
                </p>

                {/* 4. INDICADORES DE BENEFICIOS */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {[
                    { icon: Gift, label: "Materiales completos" },
                    { icon: BookOpen, label: "Guía paso a paso" },
                    { icon: Coffee, label: "Cafetería incluida" },
                  ].map(({ icon: BenefitIcon, label }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2.5 rounded-2xl border border-[#F4DCE3] bg-[#FFF0F4] px-4 py-2.5 text-xs font-bold text-[#21152D] shadow-2xs transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-white text-[#E9004B] shadow-2xs">
                        <BenefitIcon className="size-4" aria-hidden="true" />
                      </span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zona Derecha (~42% -> 5 de 12 columnas): Composición temática con máscara orgánica y fondo rosado */}
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto max-w-[460px]">
                  {/* Forma orgánica de fondo rosado */}
                  <div
                    className="pointer-events-none absolute -inset-2.5 rotate-[-2deg] rounded-[42px_20px_46px_24px] bg-linear-to-br from-[#FCE4EB] via-[#FFF0F4] to-[#FFF0C7]/70"
                    aria-hidden="true"
                  />
                  {/* Contenedor principal con máscara orgánica y bordes suaves */}
                  <div className="relative overflow-hidden rounded-[36px_18px_38px_20px] border-2 border-[#F4DCE3] bg-[#FFF0F4] p-3 shadow-lg shadow-[#E9004B]/10">
                    <div className="relative aspect-[1.35] overflow-hidden rounded-[26px_12px_28px_14px] bg-white">
                      <img
                        src="/images/taller-cafe-creativo.webp"
                        alt="Mesa acogedora de taller creativo en cafetería con cappuccino, cuaderno rosado, pinceles, paleta de colores y caja decorada con decoupage"
                        width={1200}
                        height={900}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#21152D]/45 via-transparent to-transparent" />
                      {/* Etiqueta flotante de ambiente */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/60 bg-white/95 px-3.5 py-2.5 text-[#21152D] shadow-md backdrop-blur-md">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F4] text-[#E9004B]">
                            <Coffee className="size-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-[11px] font-extrabold leading-tight text-[#21152D]">Arte, pinceles y rico cappuccino</p>
                            <p className="text-[10px] text-[#675D68]">Ambiente cálido · Sin experiencia previa</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#FCE4EB] px-2.5 py-1 text-[10px] font-extrabold text-[#E9004B]">
                          Cupos limitados
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. FILTROS DE CATEGORÍAS (Botones modernos tipo pill con contadores reales) */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#F4DCE3] pt-6">
              <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filtrar próximos talleres en Lo Barnechea">
                {[
                  {
                    id: "Todos" as const,
                    label: "Todas las fechas",
                    count: totalWorkshopsCount,
                    icon: CalendarDays,
                  },
                  {
                    id: "Para ti" as const,
                    label: "Hobby para Ti · Mujeres & Mamás",
                    count: paraTiWorkshopsCount,
                    icon: Sparkles,
                  },
                  {
                    id: "En familia" as const,
                    label: "En Familia con tus Hijos",
                    count: enFamiliaWorkshopsCount,
                    icon: Users,
                  },
                ].map(({ id, label, count, icon: FilterIcon }) => {
                  const isActive = workshopFilter === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setWorkshopFilter(id)}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold transition-all duration-200 sm:px-5 ${
                        isActive
                          ? "bg-[#E9004B] text-white shadow-md shadow-[#E9004B]/25 hover:bg-[#C90041]"
                          : "border border-[#F4DCE3] bg-white text-[#21152D] hover:border-[#E9004B]/40 hover:bg-[#FFF0F4]"
                      }`}
                    >
                      <FilterIcon className={`size-4 shrink-0 ${isActive ? "text-white" : "text-[#E9004B]"}`} aria-hidden="true" />
                      <span>{label}</span>
                      <span
                        className={`ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                          isActive ? "bg-white/20 text-white" : "bg-[#FCE4EB] text-[#E9004B]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Link
                href="/talleres"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E9004B] transition-colors hover:text-[#C90041] hover:underline"
              >
                <span>Ver calendario mensual completo</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* 6. CONTENEDOR DE AGENDA RÁPIDA + 7. RULETA AUTOMÁTICA SUAVE DESDE LA DERECHA (MÁX. 4 FECHAS, ADAPTABLE) */}
            <div className="mt-6 rounded-[24px] border border-[#F4DCE3] bg-white p-4 shadow-sm sm:p-6 lg:p-7">
              {/* Encabezado interior */}
              <div className="mb-5 flex flex-col justify-between gap-2 border-b border-[#F4DCE3]/80 pb-4 sm:flex-row sm:items-center">
                <h3 className="flex flex-wrap items-center gap-1.5 text-sm font-bold text-[#21152D] sm:text-base">
                  <Sparkles className="size-4 shrink-0 text-[#E9004B]" aria-hidden="true" />
                  <span className="font-extrabold text-[#E9004B]">Agenda rápida</span>
                  <span className="text-[#675D68]">·</span>
                  <span>Fechas y lugares confirmados en Lo Barnechea</span>
                </h3>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#675D68]">
                  <WhatsAppIcon className="size-4 text-[#008653]" />
                  <span>Haz clic en «Reservar» para asegurar tu cupo por WhatsApp</span>
                </p>
              </div>

              {/* 7. RULETA AUTOMÁTICA CONTINUA DE TARJETAS VISUALES (Se desliza suavemente desde la derecha y se pausa al pasar el mouse) */}
              {homeWorkshops.length <= 1 ? (
                <div className="mx-auto flex max-w-sm justify-center">
                  {homeWorkshops.map((w) => renderWorkshopCard(w, "single"))}
                </div>
              ) : (
                <div
                  className="workshop-roulette-viewport"
                  style={{ "--roulette-duration": `${rouletteDurationSeconds}s` } as CSSProperties}
                >
                  <div className="workshop-roulette-track">
                    <div className="workshop-roulette-group">
                      {homeWorkshops.map((w) => renderWorkshopCard(w, "primary"))}
                    </div>
                    <div className="workshop-roulette-group" aria-hidden="true">
                      {homeWorkshops.map((w) => renderWorkshopCard(w, "clone"))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Barra inferior de ayuda / grupos privados */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F4DCE3] bg-white p-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F4] text-[#E9004B]">
                  <WorkshopIcon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-[#21152D] sm:text-sm">
                    ¿Buscas otra fecha o quieres organizar un taller privado en Lo Barnechea?
                  </p>
                  <p className="text-[11px] text-[#675D68]">
                    Armamos experiencias para grupos de amigas, cumpleaños de mamás o tardes familiares en cafeterías y a domicilio.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/talleres"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#F4DCE3] bg-[#FFF0F4] px-4 py-2 text-xs font-extrabold text-[#E9004B] transition-colors hover:bg-[#FCE4EB]"
                >
                  <span>Ver programación mensual</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <WhatsAppLink
                  message="¡Hola, Color & Arte! 🌷 Quiero consultar por las fechas y lugares de talleres presenciales en Lo Barnechea para reservar mi cupo."
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#008653] px-4 py-2 text-xs font-extrabold text-white shadow-xs transition-colors hover:bg-[#006B43]"
                >
                  <WhatsAppIcon className="size-3.5" />
                  <span>Reservar cupo por WhatsApp</span>
                </WhatsAppLink>
              </div>
            </div>
          </div>

          {/* 4 ACCESOS RÁPIDOS DE NAVEGACIÓN MATERNA Y FAMILIAR */}
          <div className="mx-auto mt-6 grid max-w-[1280px] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CreativeCafeIcon,
                badge: "🌸 HOBBY EN LO BARNECHEA",
                title: "Talleres para Mujeres & Mamás",
                text: "Sal de la rutina con tardes de decoupage, repujado, puntillismo y rico café.",
                bg: "bg-linear-to-br from-[#ffe4ec] via-[#fff0f5] to-white border-rose-200",
                iconBg: "bg-rose-500 text-white",
                badgeColor: "text-rose-700 bg-white/90",
                href: "#fechas-talleres",
                cta: "Ver fechas arriba",
              },
              {
                icon: KitIcon,
                badge: "🎁 8 KITS TODO INCLUIDO",
                title: "Kits DIY Familiares en Casa",
                text: "Kinusaiga, puntillismo, repujado, corazones y figuras 3D para niños desde $10.900.",
                bg: "bg-linear-to-br from-[#dcfce7] via-[#f0fdf4] to-white border-emerald-200",
                iconBg: "bg-emerald-600 text-white",
                badgeColor: "text-emerald-900 bg-white/90",
                href: "/kits",
                cta: "Ver catálogo de Kits",
              },
              {
                icon: FamilyIcon,
                badge: "📸 COMUNIDAD CREATIVA",
                title: "Síguenos en Instagram",
                text: "Mira fotos reales, reels, nuevas fechas y creaciones en @coloryarte_manualidades.",
                bg: "bg-linear-to-br from-[#fce7f3] via-[#fae8ff] to-white border-pink-200",
                iconBg: "bg-pink-600 text-white",
                badgeColor: "text-pink-800 bg-white/90",
                href: "#instagram-feed",
                cta: "Ver feed de Instagram",
              },
              {
                icon: WellbeingIcon,
                badge: "✨ SIN EXPERIENCIA PREVIA",
                title: "9 Técnicas para Disfrutar",
                text: "Nosotras ponemos todos los materiales y te guiamos paso a paso desde cero.",
                bg: "bg-linear-to-br from-[#fff2cc] via-[#fff9e6] to-white border-amber-200",
                iconBg: "bg-amber-500 text-white",
                badgeColor: "text-amber-900 bg-white/90",
                href: "/talleres",
                cta: "Conocer las técnicas",
              },
            ].map(({ icon: Icon, badge, title, text, bg, iconBg, badgeColor, href, cta }) => (
              <a key={title} href={href} className={`group flex flex-col justify-between rounded-[24px] border-2 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${bg}`}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-wider ${badgeColor}`}>{badge}</span>
                    <span className={`craft-icon-stamp flex size-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                      <Icon className="size-6" tone="current" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-ink">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{text}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700 transition-transform group-hover:translate-x-1">
                  {cta}<ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* SECCIÓN ESTRATÉGICA #3: FEED OFICIAL DE INSTAGRAM @coloryarte_manualidades */}
        <section id="instagram-feed" data-reveal aria-labelledby="instagram-feed-title" className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
          <div className="overflow-hidden rounded-[32px] border-2 border-pink-200/90 bg-linear-to-br from-[#fff0f6] via-white to-[#fef3c7]/45 p-6 shadow-xl shadow-rose-950/6 sm:p-9">
            {/* CABECERA DE PERFIL DE INSTAGRAM */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-pink-200/70 pb-7">
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex size-20 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-amber-400 via-rose-500 to-purple-600 p-1 shadow-md transition-transform duration-300 hover:scale-105 sm:size-24"
                  aria-label="Visitar perfil de Instagram @coloryarte_manualidades"
                >
                  <img src="/logo-color-arte.jpg" alt="Avatar de @coloryarte_manualidades" width={96} height={96} className="size-full rounded-full border-2 border-white bg-white object-cover" />
                  <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-linear-to-tr from-rose-500 to-purple-600 text-white shadow-sm ring-2 ring-white">
                    <Instagram className="size-3.5" aria-hidden="true" />
                  </span>
                </a>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-rose-500 via-pink-500 to-purple-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      <Instagram className="size-3" aria-hidden="true" />
                      Nuestro Instagram Oficial
                    </span>
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-extrabold text-rose-800">
                      📍 Lo Barnechea, Chile
                    </span>
                  </div>
                  <h2 id="instagram-feed-title" className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-600">
                      @coloryarte_manualidades
                    </a>
                  </h2>
                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-stone-600 sm:text-sm">
                    🌷 <strong>Crea · Inspira · Disfruta</strong> · Síguenos para ver nuevas fechas de talleres en Lo Barnechea, videos paso a paso, lanzamientos de Kits Familiares y las creaciones de nuestras alumnas.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3.5 py-2 text-[11px] font-extrabold text-rose-700 shadow-2xs">
                  <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  🌐 Vista en Vivo
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-rose-500 via-pink-600 to-purple-600 px-6 py-3 text-xs font-extrabold text-white shadow-md shadow-pink-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Instagram className="size-4" aria-hidden="true" />
                  <span>Seguir en Instagram</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-pink-200 bg-white p-3 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                <span>Vista embebida directa de <strong>instagram.com/coloryarte_manualidades</strong>:</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-extrabold text-rose-600 underline">
                  Abrir directamente en la app de Instagram →
                </a>
              </div>
              <iframe
                src="https://www.instagram.com/coloryarte_manualidades/embed"
                title="Feed de Instagram de Color y Arte Manualidades"
                className="h-[540px] w-full rounded-xl border-0 bg-stone-50"
                loading="lazy"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-linear-to-r from-rose-50 via-pink-50 to-amber-50 p-4 sm:px-6">
              <p className="text-xs font-bold text-stone-700 sm:text-sm">
                💕 ¿Fuiste a un taller o pintaste un kit en casa? Etiquétanos en <strong>@coloryarte_manualidades</strong> para compartir tu creación.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700 hover:underline"
              >
                Ir a https://www.instagram.com/coloryarte_manualidades <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section data-reveal aria-labelledby="testimonials-title" className="border-t border-rose-200/60 bg-linear-to-b from-[#fff0f5]/70 to-[#fef9f3] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1196px]"><div className="text-center"><p className="section-kicker mb-3 text-rose-600">HISTORIAS DE MUJERES Y FAMILIAS</p><h2 id="testimonials-title" className="text-[28px] font-extrabold leading-tight tracking-[-.045em] sm:text-[35px]">El mejor resultado es cómo te sientes al terminar<span className="text-rose-500">.</span></h2><p className="mt-3 text-xs text-stone-500">Historias de ejemplo que imaginan la experiencia Color & Arte.</p></div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">{testimonials.map((testimonial) => <figure key={testimonial.id} className="flex flex-col rounded-[24px] border-2 border-rose-100 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center gap-1 text-amber-500" aria-hidden="true">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-3.5" fill="currentColor" strokeWidth={0} />)}</div><blockquote className="mb-6 text-[13px] leading-[1.85] text-stone-600">“{testimonial.quote}”</blockquote><figcaption className="mt-auto flex items-center gap-2.5"><span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${testimonial.color}`}>{testimonial.initials}</span><div><p className="text-xs font-extrabold">{testimonial.name}</p><p className="mt-0.5 text-[10px] font-semibold text-rose-600">{testimonial.context}</p></div><Heart className="ml-auto size-4 text-rose-400" fill="currentColor" strokeWidth={1.5} aria-hidden="true" /></figcaption></figure>)}</div><p className="mt-4 text-center text-[9px] text-stone-500">Testimonios ilustrativos; no corresponden a reseñas de clientes reales.</p>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="mx-auto max-w-[1260px] px-5 py-12 md:px-8 md:py-14"><div className="relative overflow-hidden rounded-[28px] border-2 border-rose-200 bg-linear-to-r from-[#ffe4ec] via-[#fff5e4] to-[#e4f5ea] px-7 py-10 sm:px-10 md:flex md:items-center md:justify-between md:gap-7 md:py-9"><ButterflyIcon className="pointer-events-none absolute -bottom-9 left-[47%] size-36 rotate-12 text-rose-300/40" strokeWidth={.7} aria-hidden="true" /><div className="relative"><p className="section-kicker mb-2 text-rose-700">HAGAMOS ALGO BONITO JUNTAS</p><h2 id="contact-title" className="text-[28px] font-extrabold tracking-[-.045em] text-ink sm:text-[32px]">¿Reservamos tu taller en Lo Barnechea o tu kit familiar?</h2><p className="mt-2.5 max-w-lg text-xs leading-relaxed text-stone-600 sm:text-sm">Escríbenos directo por WhatsApp. Te ayudamos a elegir fecha en Lo Barnechea, armar un pack para tus hijos o coordinar un regalo inolvidable.</p></div><WhatsAppLink message={GENERAL_MESSAGE} className={`${buttonBase} relative mt-6 shrink-0 bg-rose-600 px-6 py-3.5 text-xs text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 md:mt-0`}><WhatsAppIcon className="size-4" />Escríbenos por WhatsApp<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink></div></section>

        <section aria-labelledby="faq-title" className="mx-auto max-w-[900px] px-5 pb-14 md:px-8"><h2 id="faq-title" className="mb-5 text-center text-2xl font-extrabold tracking-tight">Preguntas frecuentes de mamás y participantes</h2>{[
          { question: "¿Dónde se realizan los talleres presenciales?", answer: "Nuestros talleres de esta programación ilustrativa se realizan en cafeterías y espacios creativos en Lo Barnechea, Chile (sectores La Dehesa, Los Trapenses, El Rodeo, Pie Andino y El Huinganal). Al reservar por WhatsApp te enviamos la ubicación exacta y referencias de estacionamiento." },
          { question: "¿Necesito experiencia o llevar materiales?", answer: "No necesitas experiencia previa. Los talleres incluyen todos los materiales, herramientas y una bebida de cafetería para disfrutar durante la sesión. Solo trae tus ganas de desconectar y crear." },
          { question: "¿Puedo ir con niños o niñas?", answer: "El taller de pintura en yeso, Kinusaiga y los kits familiares están pensados desde los 6 años (y nuestros Kits Pinta y Celebra desde los 4 años), siempre con una persona adulta responsable. Repujado y Decoupage se recomiendan desde los 14 años. Confirma las edades y los cupos antes de reservar." },
          { question: "¿Cómo confirmo una reserva o una compra?", answer: "Elige tu fecha de taller o prepara tu bolsa de kits y escríbenos por WhatsApp. Allí confirmamos disponibilidad, dirección en Lo Barnechea o despacho a domicilio, valor final y forma de pago." },
        ].map((item) => <details key={item.question} className="group border-b border-rose-200/70 py-4"><summary className="flex min-h-8 list-none items-center justify-between gap-4 text-xs font-extrabold [&::-webkit-details-marker]:hidden">{item.question}<ChevronDown className="size-4 shrink-0 text-rose-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" /></summary><p className="mt-3 max-w-[700px] pr-5 text-xs leading-[1.9] text-stone-600">{item.answer}</p></details>)}</section>
  </>;
}
