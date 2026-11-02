import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Brush, Check, ChevronDown, Coffee, FileDown,
  Flower2, Heart, HeartHandshake, Leaf, PackageCheck, Palette, Scissors,
  Sparkles, Star, Users,
} from "lucide-react";
import { testimonials, GENERAL_MESSAGE, buttonBase } from "@/lib/storefront";
import { WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";

export function HomeContent() {
  return <>
        <section id="inicio" aria-labelledby="hero-title" className="home-hero-section mx-auto max-w-[1320px]">
          <div className="home-hero hero-gradient hero-grain relative isolate text-white">
            <svg className="pointer-events-none absolute -left-14 bottom-[-70px] size-72 text-white/10" viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M0 100C45 20 155 20 200 100M0 130C45 50 155 50 200 130M0 160C45 80 155 80 200 160M0 190C45 110 155 110 200 190" stroke="currentColor" strokeWidth="2" /></svg>
            <div className="home-hero-layout">
              <div className="home-hero-copy">
                <div className="home-hero-eyebrow"><Sparkles aria-hidden="true" />HECHO A MANO. VIVIDO CON EL CORAZÓN.</div>
                <h1 id="hero-title" className="home-hero-title">Crea, comparte<br />y regálate un<br /><span>momento para ti.<svg viewBox="0 0 420 14" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M3 9C85 1 280 1 416 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span></h1>
                <p className="home-hero-description">Un taller, un café, una tarde en familia. Descubre lo bonito que se siente bajar el ritmo y dejar que tus manos cuenten su historia.</p>
                <div className="home-hero-actions">
                  <Link href="/talleres" className="home-hero-cta home-hero-cta-primary"><Brush aria-hidden="true" /><span>Encuentra tu taller</span><ArrowUpRight aria-hidden="true" /></Link>
                  <Link href="/kits" className="home-hero-cta home-hero-cta-secondary"><span>Crea en casa</span><ArrowRight aria-hidden="true" /></Link>
                </div>
                <div className="home-hero-trust"><span><Check aria-hidden="true" />Sin experiencia previa</span><span><Check aria-hidden="true" />Materiales incluidos</span><span><Heart aria-hidden="true" />Para todas las inspiraciones</span></div>
              </div>
              <figure className="home-hero-visual">
                <div className="home-hero-photo"><img src="/images/familia-creativa.webp" alt="Imagen de ambientación: madre e hija disfrutan pintando calabazas de yeso en una mesa creativa" width={1500} height={1000} fetchPriority="high" /></div>
                <div className="home-hero-seal" aria-label="Crear hace bien"><Flower2 aria-hidden="true" /><span>CREAR<br />HACE BIEN</span></div>
                <figcaption className="home-hero-caption handwritten"><HeartHandshake aria-hidden="true" /><span>Pequeños momentos,<br /><strong>grandes recuerdos.</strong></span></figcaption>
              </figure>
            </div>
          </div>
          <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-x-4 gap-y-5 border-b border-stone-200/80 px-1 py-6 sm:grid-cols-4 sm:gap-5 sm:py-7">
            {[{ icon: HeartHandshake, title: "Tiempo para conectar", text: "Contigo y con quienes quieres", color: "text-rose-500 bg-rose-50" }, { icon: Scissors, title: "Todo listo para crear", text: "Tú solo trae las ganas", color: "text-amber-700 bg-amber-50" }, { icon: Coffee, title: "Arte, café y buena compañía", text: "Una experiencia para disfrutar", color: "text-purple-600 bg-purple-50" }, { icon: Leaf, title: "Una pausa que hace bien", text: "Sin prisa, sin exigencias", color: "text-emerald-700 bg-emerald-50" }].map(({ icon: Icon, title, text, color }) => <div key={title} className="flex items-center gap-2.5 sm:justify-center"><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="size-[18px]" strokeWidth={1.5} aria-hidden="true" /></span><div><p className="text-[10px] font-extrabold leading-snug">{title}</p><p className="mt-1 text-[8px] leading-relaxed text-stone-500 sm:text-[9px]">{text}</p></div></div>)}
          </div>
        </section>


        <section aria-labelledby="discover-title" className="mx-auto max-w-[1260px] px-5 py-12 md:px-8 md:py-16">
          <p className="section-kicker mb-3 text-rose-600">ELIGE CÓMO QUIERES CREAR</p>
          <h2 id="discover-title" className="text-3xl font-extrabold tracking-tight sm:text-[35px]">Un mundo de posibilidades<span className="text-rose-500">.</span></h2>
          <p className="mt-3 text-sm text-stone-500">Cada camino tiene su propio espacio. Encuentra el tuyo.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/talleres", title: "Talleres Presenciales", text: "Un encuentro con el arte, el café y la buena compañía.", icon: Brush, color: "bg-rose-50 text-rose-700" },
              { href: "/kits", title: "Kits DIY Familiares", text: "Abre la caja y comparte una tarde creativa en casa.", icon: Scissors, color: "bg-emerald-50 text-emerald-800" },
              { href: "/obras", title: "Obras Únicas", text: "Piezas de autor para regalar o hacer tu rincón más bonito.", icon: Heart, color: "bg-amber-50 text-amber-800" },
              { href: "/guias", title: "Guías PDF", text: "Descubre nuevas técnicas y aprende a tu propio ritmo.", icon: FileDown, color: "bg-purple-50 text-purple-800" },
            ].map(({ href, title, text, icon: Icon, color }) => <Link key={href} href={href} className="group rounded-3xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg"><span className={"mb-5 flex size-11 items-center justify-center rounded-2xl " + color}><Icon className="size-5" strokeWidth={1.5} aria-hidden="true" /></span><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-stone-500">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-rose-700">Explorar<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}
          </div>
        </section>
        <section aria-labelledby="family-title" className="mx-auto max-w-[1260px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid items-center gap-9 md:grid-cols-[.9fr_1fr] md:gap-14">
            <div className="relative mx-auto w-full max-w-[510px] px-4 pb-4 sm:px-7 md:px-3">
              <div className="absolute inset-x-0 bottom-0 top-6 rotate-[-5deg] rounded-[30px] bg-[#e8eedf]" />
              <div className="relative aspect-[1.28] overflow-hidden rounded-[25px] bg-stone-200"><img src="/images/familia-creativa.webp" alt="Ambientación creativa: una madre y su hija pintan juntas sin prisa" width={1500} height={1000} loading="lazy" className="h-full w-full object-cover object-center" /></div>
              <div className="absolute -bottom-3 right-2 rotate-[5deg] rounded-xl border border-amber-100 bg-[#fff2c8] px-5 py-3 shadow-md"><p className="handwritten text-[25px] leading-tight text-[#876334]">Lo más bonito no es la pieza,<br />es el momento que compartimos.</p></div>
              <Flower2 className="absolute -left-3 -top-4 size-12 -rotate-12 text-[#d78c99]" strokeWidth={1.2} aria-hidden="true" />
            </div>
            <div className="pt-4 md:pt-0"><p className="section-kicker mb-3 text-emerald-700">MÁS QUE MANUALIDADES</p><h2 id="family-title" className="max-w-lg text-[31px] font-extrabold leading-[1.2] tracking-[-.045em] sm:text-[37px]">Aquí las manos crean.<br />Y los corazones <span className="text-rose-600">conectan.</span></h2><p className="mt-5 max-w-[460px] text-[13px] leading-[1.9] text-stone-500">En Color & Arte creemos en esas pequeñas pausas que le dan color a la vida. En aprender sin miedo a equivocarse y en descubrir que, cuando creamos juntos, también nos acercamos.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{[{ icon: HeartHandshake, title: "Acompañamiento cercano", text: "Cada paso cuenta, a tu ritmo." }, { icon: Palette, title: "No necesitas saber antes", text: "Aquí empezamos contigo." }, { icon: Users, title: "Espacio para compartir", text: "Ven sola, en pareja o en familia." }, { icon: PackageCheck, title: "Materiales incluidos", text: "Todo preparado para disfrutar." }].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-2.5"><Icon className="mt-0.5 size-4 shrink-0 text-rose-500" strokeWidth={1.5} aria-hidden="true" /><div><p className="text-[10px] font-extrabold">{title}</p><p className="mt-1 text-[10px] leading-relaxed text-stone-500">{text}</p></div></div>)}</div></div>
          </div>
        </section>

        <section aria-labelledby="testimonials-title" className="border-t border-stone-200/80 bg-[#f8f4f0] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1196px]"><div className="text-center"><p className="section-kicker mb-3 text-rose-600">RECUERDOS QUE SE QUEDAN</p><h2 id="testimonials-title" className="text-[28px] font-extrabold leading-tight tracking-[-.045em] sm:text-[35px]">El mejor resultado es cómo te sientes<span className="text-rose-500">.</span></h2><p className="mt-3 text-xs text-stone-500">Historias de ejemplo que imaginan la experiencia Color & Arte.</p></div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">{testimonials.map((testimonial) => <figure key={testimonial.id} className="flex flex-col rounded-[22px] border border-stone-200/70 bg-cream p-6"><div className="mb-4 flex items-center gap-1 text-[#c48b30]" aria-hidden="true">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-3" fill="currentColor" strokeWidth={0} />)}</div><blockquote className="mb-6 text-[12px] leading-[1.9] text-stone-600">“{testimonial.quote}”</blockquote><figcaption className="mt-auto flex items-center gap-2.5"><span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${testimonial.color}`}>{testimonial.initials}</span><div><p className="text-[11px] font-extrabold">{testimonial.name}</p><p className="mt-0.5 text-[9px] text-stone-500">{testimonial.context}</p></div><Heart className="ml-auto size-4 text-rose-300" strokeWidth={1.5} aria-hidden="true" /></figcaption></figure>)}</div><p className="mt-4 text-center text-[9px] text-stone-500">Testimonios ilustrativos; no corresponden a reseñas de clientes reales.</p>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="mx-auto max-w-[1260px] px-5 py-12 md:px-8 md:py-14"><div className="relative overflow-hidden rounded-[28px] bg-[#e9efdf] px-7 py-10 sm:px-10 md:flex md:items-center md:justify-between md:gap-7 md:py-9"><Flower2 className="pointer-events-none absolute -bottom-9 left-[47%] size-36 rotate-12 text-[#d4ddc2]" strokeWidth={.7} aria-hidden="true" /><div className="relative"><p className="section-kicker mb-2 text-emerald-800">HAGAMOS ALGO BONITO</p><h2 id="contact-title" className="text-[28px] font-extrabold tracking-[-.045em] sm:text-[32px]">¿Creamos un momento para ti?</h2><p className="mt-2.5 max-w-lg text-xs leading-relaxed text-[#62705e]">¿Dudas, un regalo especial o un taller para tu grupo? Conversemos.<br className="hidden sm:block" /> Nos encantará ayudarte a encontrar tu próxima experiencia creativa.</p></div><WhatsAppLink message={GENERAL_MESSAGE} className={`${buttonBase} relative mt-6 shrink-0 bg-emerald-800 px-6 py-3.5 text-xs text-white hover:bg-emerald-900 md:mt-0`}><WhatsAppIcon className="size-4" />Escríbenos por WhatsApp<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink></div></section>

        <section aria-labelledby="faq-title" className="mx-auto max-w-[900px] px-5 pb-14 md:px-8"><h2 id="faq-title" className="mb-5 text-center text-2xl font-extrabold tracking-tight">Unas cositas antes de crear</h2>{[
          { question: "¿Necesito experiencia o llevar materiales?", answer: "No necesitas experiencia previa. Los talleres de esta programación de ejemplo incluyen los materiales y herramientas para trabajar durante la sesión. Consulta por WhatsApp qué incluye tu experiencia y qué ropa cómoda te recomendamos llevar." },
          { question: "¿Puedo ir con niños o niñas?", answer: "El taller de pintura en yeso y los kits familiares están pensados desde los 6 años, siempre con una persona adulta responsable. Repujado y Miyuki se recomiendan desde los 14 años. Confirma las edades y los cupos para cada participante antes de reservar." },
          { question: "¿Cómo confirmo una reserva o una compra?", answer: "Elige tu taller o prepara tu bolsa y escríbenos por WhatsApp. Allí confirmamos disponibilidad, ubicación, entrega, valor final y forma de pago. Abrir una conversación o agregar un producto a la bolsa no reserva cupos ni genera cobros." },
          { question: "¿Cómo recibo una guía PDF?", answer: "Las fichas de guías son una demostración del catálogo digital. En esta versión no hay cobro ni descarga automática. Consulta la disponibilidad y entrega del archivo por WhatsApp antes de comprar. Los kits y las piezas físicas coordinan su envío por separado." },
        ].map((item) => <details key={item.question} className="group border-b border-stone-200 py-4"><summary className="flex min-h-8 list-none items-center justify-between gap-4 text-xs font-bold [&::-webkit-details-marker]:hidden">{item.question}<ChevronDown className="size-4 shrink-0 text-rose-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" /></summary><p className="mt-3 max-w-[700px] pr-5 text-xs leading-[1.9] text-stone-500">{item.answer}</p></details>)}</section>
  </>;
}
