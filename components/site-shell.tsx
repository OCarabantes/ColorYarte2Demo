"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Instagram, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { products, GENERAL_MESSAGE, formatPrice, CART_KEY, navigation, buttonBase, primaryButton, type Product, type CartItem } from "@/lib/storefront";
import { WhatsAppIcon, WhatsAppLink } from "@/components/storefront-ui";
import { CategoryCraftIcon } from "@/components/craft-icons";
import { AnnouncementBar } from "@/components/announcement-bar";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const elements = [...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex='0']")]
    .filter((element) => element.getClientRects().length > 0);
  const first = elements[0];
  const last = elements[elements.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  }
}


const StorefrontContext = createContext<{ addToCart: (product: Product) => void; openProduct: (product: Product) => void } | null>(null);

export function useStorefront() {
  const value = useContext(StorefrontContext);
  if (!value) throw new Error("useStorefront requiere SiteShell");
  return value;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [dialog, setDialog] = useState<"cart" | "product" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
      if (Array.isArray(saved)) {
        const validated = new Map<string, CartItem>();
        for (const entry of saved) {
          if (!entry || typeof entry !== "object" || typeof entry.productId !== "string" || !Number.isInteger(entry.quantity) || entry.quantity <= 0) continue;
          const product = products.find((item) => item.id === entry.productId);
          if (product && product.stock !== 0) validated.set(product.id, { productId: product.id, quantity: product.category === "guias" ? 1 : Math.min(entry.quantity, product.stock ?? 99, 99) });
        }
        setCart([...validated.values()]);
      }
    } catch { /* El almacenamiento privado o dañado no impide comprar. */ }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* La bolsa sigue funcionando en memoria. */ }
  }, [cart, cartLoaded]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;
    if (dialog) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      if (!element.open) element.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
        if (element.open) element.close();
        previousFocus.current?.focus();
      };
    }
  }, [dialog]);

  const notify = (message: string) => { setAnnouncement(message); setToast(message); };
  function addToCart(product: Product) {
    const existing = cart.find((item) => item.productId === product.id);
    const limit = product.category === "guias" ? 1 : product.stock ?? 99;
    if ((existing?.quantity ?? 0) >= limit) {
      notify(product.category === "guias" ? "Esta guía ya está en tu bolsa." : "Ya agregaste todas las unidades disponibles de esta pieza.");
      return;
    }
    setCart((current) => {
      const entry = current.find((item) => item.productId === product.id);
      if (entry) return current.map((item) => item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + 1, limit) } : item);
      return [...current, { productId: product.id, quantity: 1 }];
    });
    notify(`Agregado a tu bolsa: ${product.name}`);
  }

  function updateQuantity(productId: string, change: number) {
    setCart((current) => current.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, product.stock ?? 99)) } : item;
    }));
  }

  function openProduct(product: Product) { setSelectedProduct(product); setDialog("product"); }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + products.find((product) => product.id === item.productId)!.price * item.quantity, 0);
  const cartMessage = `¡Hola, Color & Arte! 🌷 Me gustaría consultar este pedido:\n${cart.map((item) => { const product = products.find((p) => p.id === item.productId)!; return `• ${item.quantity} × ${product.name} — ${formatPrice(product.price * item.quantity)} CLP`; }).join("\n")}\n\nSubtotal de referencia: ${formatPrice(cartTotal)} CLP (sin envío). ¿Me confirman disponibilidad, entrega y medios de pago?`;


  useEffect(() => {
    setDialog(null);
    setToast("");
    const active = document.querySelector<HTMLElement>('nav [aria-current="page"]');
    const nav = active?.parentElement;
    if (active && nav) nav.scrollTo({ left: Math.max(0, active.offsetLeft - nav.offsetLeft - 12), behavior: "instant" });
  }, [pathname]);

  return (
    <StorefrontContext.Provider value={{ addToCart, openProduct }}>
      <a href="#contenido" className="sr-only fixed left-4 top-4 z-100 rounded-full bg-white px-5 py-3 text-sm font-bold text-rose-700 shadow-xl focus:not-sr-only">Saltar al contenido</a>
      <AnnouncementBar />
      <RevealOnScroll />

      <header className="site-header sticky top-0 z-40 border-b border-stone-200/70 bg-cream/95 backdrop-blur-xl">
        <div className="site-header-inner mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-4 px-5 py-3 md:px-8 lg:flex-nowrap lg:py-4">
          <Link href="/" aria-label="Color & Arte, inicio" className="flex shrink-0 items-center gap-2.5">
            <img src="/logo-color-arte.jpg" alt="" width={54} height={54} className="site-logo size-[49px] rounded-full border border-stone-200 bg-white object-cover lg:size-[54px]" />
            <div><span className="text-[20px] font-extrabold tracking-[-1.2px]">color<span className="font-medium text-rose-600">&</span>arte<span className="text-rose-500">.</span></span><span className="mt-0.5 block text-[7px] font-bold uppercase tracking-[.2em] text-stone-500">Un espacio para crear</span></div>
          </Link>
          <nav aria-label="Navegación principal" className="nav-scroll order-3 -mx-1 mt-3 flex w-[calc(100%+8px)] gap-0.5 overflow-x-auto rounded-full bg-[#f0ede9] p-1 lg:order-0 lg:mx-auto lg:mt-0 lg:w-auto lg:gap-0">
            {navigation.map((item) => <Link key={item.id} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-[10px] font-bold transition-all duration-300 xl:px-3.5 ${pathname === item.href ? "bg-white text-rose-700 shadow-sm" : "text-stone-600 hover:bg-white/65 hover:text-rose-700"}`}><CategoryCraftIcon category={item.id} className="size-4" />{item.label}</Link>)}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
            <button type="button" onClick={() => setDialog("cart")} className="relative flex size-11 items-center justify-center rounded-full text-stone-600 transition-all duration-300 hover:bg-rose-50 hover:text-rose-600" aria-label={`Abrir mi bolsa, ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`}><ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden="true" />{cartCount > 0 && <span className="absolute right-0 top-0 flex min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white">{cartCount}</span>}</button>
            <WhatsAppLink message={GENERAL_MESSAGE} className={`hidden min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#e8f1e8] px-4 py-2.5 text-[10px] font-bold text-emerald-900 transition-all duration-300 hover:bg-emerald-100 sm:inline-flex`}><WhatsAppIcon className="size-4" />Conversemos</WhatsAppLink>
          </div>
        </div>
      </header>


      <main id="contenido" tabIndex={-1}>{children}</main>

      <footer className="border-t border-stone-200 bg-[#f1ede7] px-5 pb-6 pt-9 md:px-8"><div className="mx-auto max-w-[1196px]"><div className="flex flex-wrap items-start justify-between gap-7"><Link href="/" className="flex items-center gap-3"><img src="/logo-color-arte.jpg" alt="Logo de Color & Arte: una mariposa multicolor" width={48} height={48} className="size-12 rounded-full border border-stone-200" /><div><span className="text-xl font-extrabold tracking-[-1px]">color<span className="font-medium text-rose-600">&</span>arte.</span><p className="mt-1 text-[10px] text-stone-500">Creamos con las manos. Conectamos con el corazón.</p></div></Link><div className="flex gap-6 text-[10px] font-bold text-stone-600"><Link href="/talleres" className="py-3 transition-colors hover:text-rose-600">Los talleres</Link><Link href="/kits" className="py-3 transition-colors hover:text-rose-600">La tiendita</Link><a href="https://www.instagram.com/coloryarte_manualidades/" target="_blank" rel="noopener noreferrer" aria-label="Color & Arte en Instagram (abre en otra pestaña)" className="flex size-10 items-center justify-center rounded-full border border-stone-300 transition-colors hover:bg-white hover:text-rose-600"><Instagram className="size-4" aria-hidden="true" /></a></div></div><div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-stone-300/60 pt-5 text-[9px] leading-relaxed text-stone-500"><p>© {new Date().getFullYear()} Color & Arte · Hecho con cariño en Chile.</p><WhatsAppLink message={GENERAL_MESSAGE} className="inline-flex min-h-8 items-center gap-1.5 hover:text-rose-600"><WhatsAppIcon className="size-3" />+56 9 8385 5951</WhatsAppLink></div><p id="demo-notice" className="mt-3 max-w-4xl text-[9px] leading-relaxed text-stone-500">Vista de demostración: fechas, sedes, precios, existencias, cupos y testimonios son ilustrativos. Imágenes de ambientación generadas con IA; logo proporcionado por la marca. Confirma los detalles reales por WhatsApp. No se procesan pagos ni se realizan reservas automáticas en esta página.</p></div></footer>

      <WhatsAppLink message={GENERAL_MESSAGE} label="Hablemos por WhatsApp" className="group fixed bottom-6 right-5 z-40 flex size-[54px] items-center justify-center rounded-full border-[4px] border-cream bg-[#27885b] text-white shadow-xl shadow-emerald-950/15 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 active:scale-95 sm:bottom-7 sm:right-7"><span role="tooltip" className="pointer-events-none absolute right-[62px] hidden w-max rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[11px] font-semibold text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">¿Creamos algo bonito? 🌷</span><WhatsAppIcon className="size-6" /></WhatsAppLink>

      <div role="status" aria-label="Avisos de la bolsa" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {toast && <div className="fixed bottom-24 left-1/2 z-60 flex w-[calc(100%-40px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-ink shadow-xl"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check className="size-4" /></span><span className="flex-1">{toast}</span><button type="button" aria-label="Cerrar aviso" onClick={() => setToast("")} className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-stone-100"><X className="size-3.5" /></button></div>}

      <dialog ref={dialogRef} onKeyDown={trapDialogFocus} onCancel={() => setDialog(null)} onClose={() => setDialog(null)} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setDialog(null); } }} aria-labelledby="dialog-title" className="dialog-panel fixed inset-0 m-auto max-h-[88dvh] w-[calc(100%-32px)] max-w-[680px] overflow-y-auto rounded-[26px] border-0 bg-cream p-0 text-ink shadow-2xl backdrop:bg-[#24192e]/50 backdrop:backdrop-blur-sm">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-stone-200 bg-cream/95 px-5 py-4 backdrop-blur-md"><h2 id="dialog-title" className="text-sm font-extrabold">{dialog === "cart" ? `Tu bolsa creativa (${cartCount})` : "Un detalle hecho para ti"}</h2><button type="button" onClick={() => setDialog(null)} aria-label="Cerrar ventana" className="flex size-9 items-center justify-center rounded-full bg-white text-stone-500 transition-colors hover:bg-rose-100 hover:text-rose-700"><X className="size-4" aria-hidden="true" /></button></div>
        {dialog === "product" && selectedProduct && <div className="p-5 sm:p-7"><img src={selectedProduct.image} alt={selectedProduct.imageAlt} width={1100} height={733} className="aspect-[1.8] w-full rounded-2xl object-cover" /><p className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600">{selectedProduct.badge}</p><h3 className="mt-2 text-2xl font-extrabold tracking-tight">{selectedProduct.name}</h3><p className="mt-3 text-sm leading-relaxed text-stone-500">{selectedProduct.detail}</p><h4 className="mb-3 mt-5 text-xs font-extrabold">Lo que viene contigo</h4><ul className="grid gap-2 sm:grid-cols-2">{selectedProduct.includes.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-stone-600"><Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5"><span className="text-2xl font-extrabold">{formatPrice(selectedProduct.price)}<span className="ml-1 text-[10px] font-normal text-stone-500">CLP</span></span><button type="button" onClick={() => addToCart(selectedProduct)} className={primaryButton}><ShoppingBag className="size-4" aria-hidden="true" />Agregar a mi bolsa</button></div><WhatsAppLink message={`¡Hola, Color & Arte! 🌷 Me interesa «${selectedProduct.name}» (${formatPrice(selectedProduct.price)} CLP). ¿Me confirman disponibilidad${selectedProduct.category === "guias" ? " y cómo recibir el PDF" : ", entrega y formas de pago"}?`} className="mt-4 flex min-h-11 items-center justify-center gap-2 text-xs font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4"><WhatsAppIcon className="size-4" />{selectedProduct.category === "guias" ? "Consultar guía por WhatsApp" : "Consultar esta pieza por WhatsApp"}</WhatsAppLink><p className="mt-3 text-center text-[10px] leading-relaxed text-stone-500">{selectedProduct.category === "guias" ? "Guía de demostración. Consulta su disponibilidad; no hay descarga ni cobro automático en esta versión." : "Producto ilustrativo. Confirma existencias y costo de envío antes de pagar."}</p></div>}
        {dialog === "cart" && <div className="p-5 sm:p-7">{cart.length === 0 ? <div className="px-2 py-10 text-center"><ShoppingBag className="mx-auto mb-5 size-12 text-rose-300" strokeWidth={1} aria-hidden="true" /><h3 className="text-xl font-extrabold tracking-tight">Aquí empieza algo bonito</h3><p className="mx-auto mb-6 mt-3 max-w-xs text-sm leading-relaxed text-stone-500">Tu bolsa está esperando un poquito de color. Descubre kits, piezas y guías para tu próximo proyecto.</p><button type="button" onClick={() => { setDialog(null); router.push("/kits"); }} className={primaryButton}>Explorar la tiendita<ArrowRight className="size-4" aria-hidden="true" /></button></div> : <><ul className="divide-y divide-stone-200">{cart.map((item) => { const product = products.find((p) => p.id === item.productId)!; return <li key={item.productId} className="flex items-start gap-3 py-4 first:pt-0"><img src={product.image} alt="" width={76} height={76} className="size-16 shrink-0 rounded-xl object-cover sm:size-[76px]" /><div className="min-w-0 flex-1"><h3 className="pr-1 text-xs font-extrabold leading-relaxed">{product.name}</h3><p className="mt-1 text-xs text-stone-500">{formatPrice(product.price)} CLP / unidad</p><div className="mt-3 flex items-center gap-1">{product.category !== "guias" ? <><button type="button" onClick={() => updateQuantity(product.id, -1)} disabled={item.quantity <= 1} aria-label={`Quitar una unidad de ${product.name}`} className="flex size-8 items-center justify-center rounded-full border border-stone-200 bg-white disabled:cursor-not-allowed disabled:opacity-30"><Minus className="size-3" aria-hidden="true" /></button><span className="min-w-7 text-center text-xs font-bold" aria-label={`${item.quantity} unidades`}>{item.quantity}</span><button type="button" onClick={() => updateQuantity(product.id, 1)} disabled={item.quantity >= (product.stock ?? 99)} aria-label={`Sumar una unidad de ${product.name}`} className="flex size-8 items-center justify-center rounded-full border border-stone-200 bg-white disabled:cursor-not-allowed disabled:opacity-30"><Plus className="size-3" aria-hidden="true" /></button></> : <span className="text-[10px] text-purple-700">1 guía digital · PDF</span>}<button type="button" onClick={() => { setCart((current) => current.filter((entry) => entry.productId !== product.id)); setAnnouncement(`${product.name} eliminado de tu bolsa.`); }} aria-label={`Eliminar ${product.name} de la bolsa`} className="ml-2 flex size-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-3.5" aria-hidden="true" /></button></div></div><span className="shrink-0 text-xs font-extrabold">{formatPrice(product.price * item.quantity)}</span></li>; })}</ul><div className="mt-4 rounded-2xl bg-white p-5"><div className="flex items-center justify-between gap-3 text-sm font-extrabold"><span>Subtotal de referencia</span><span>{formatPrice(cartTotal)} CLP</span></div><p className="mt-2 text-[10px] leading-relaxed text-stone-500">Envío no incluido. Disponibilidad, valor final y forma de entrega a confirmar por WhatsApp.</p></div><WhatsAppLink message={cartMessage} className={`${buttonBase} mt-5 w-full bg-emerald-800 px-6 py-3.5 text-white hover:bg-emerald-900`}><WhatsAppIcon className="size-5" />Consultar pedido por WhatsApp<ArrowUpRight className="size-4" aria-hidden="true" /></WhatsAppLink><p className="mt-3 text-center text-[10px] leading-relaxed text-stone-500">Tu bolsa se guarda en este navegador. No se ha realizado ningún cobro.</p></>}</div>}
      </dialog>
    </StorefrontContext.Provider>
  );
}
