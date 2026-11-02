// Sustituye estos arrays por la respuesta de tu CMS/API. Los datos son ilustrativos.
export type Workshop = {
  id: string;
  title: string;
  technique: "Repujado" | "Joyería Miyuki" | "Pintura en yeso";
  description: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  location: string;
  price: number;
  capacity: number;
  booked: number;
  audience: "Para ti" | "En familia";
  age: string;
  image: string;
  imageAlt: string;
  includes: string[];
};

export type ProductCategory = "kits" | "obras" | "guias";
export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  badge: "Materiales Completos" | "100% Hecho a Mano" | "Descarga Inmediata";
  detail: string;
  includes: string[];
  stock: number | null;
};

export type Testimonial = {
  id: string;
  name: string;
  context: string;
  quote: string;
  initials: string;
  color: string;
};

export const workshops: Workshop[] = [
  {
    id: "repujado-0711", title: "Flores que cobran vida", technique: "Repujado",
    description: "Dale relieve a una lámina de cobre y descubre la calma de crear con tus manos.",
    date: "2026-11-07", time: "11:00", duration: "2 h 30 min", venue: "Zia Bistro",
    location: "Dirección por confirmar al reservar", price: 28000, capacity: 12, booked: 8,
    audience: "Para ti", age: "Desde 14 años", image: "/images/repujado.webp",
    imageAlt: "Flor y hojas en relieve sobre una lámina de cobre con herramientas de repujado",
    includes: ["Lámina de cobre y herramientas", "Guía paso a paso", "Una bebida de la cafetería", "Tu pieza terminada para llevar"],
  },
  {
    id: "miyuki-1411", title: "Pequeñas cuentas, mucha magia", technique: "Joyería Miyuki",
    description: "Elige tus colores, aprende a tejer y crea una pulsera tan única como tú.",
    date: "2026-11-14", time: "16:00", duration: "3 horas", venue: "Zia Bistro",
    location: "Dirección por confirmar al reservar", price: 32000, capacity: 10, booked: 4,
    audience: "Para ti", age: "Desde 14 años", image: "/images/miyuki.webp",
    imageAlt: "Pulseras de mostacillas Miyuki tejidas con flores coral, menta y doradas",
    includes: ["Mostacillas Miyuki e hilo", "Herramientas para el taller", "Una bebida de la cafetería", "Tu pulsera terminada"],
  },
  {
    id: "pintura-2111", title: "Una tarde para pintar juntos", technique: "Pintura en yeso",
    description: "Calabacitas, pinceles y una tarde llena de color para compartir en familia.",
    date: "2026-11-21", time: "11:00", duration: "2 horas", venue: "Cafetería aliada",
    location: "Lugar por confirmar al reservar", price: 22000, capacity: 16, booked: 11,
    audience: "En familia", age: "Desde 6 años con un adulto", image: "/images/pintura.webp",
    imageAlt: "Calabazas de yeso pintadas en tonos pastel con pinceles y frascos de pintura",
    includes: ["Dos figuras de yeso por persona", "Pinturas, pinceles y delantal", "Una bebida de la cafetería", "Acompañamiento en cada paso"],
  },
  {
    id: "pintura-0512", title: "Diciembre se pinta en familia", technique: "Pintura en yeso",
    description: "Una pausa entre pinceles para crear adornos y recuerdos con quienes más quieres.",
    date: "2026-12-05", time: "11:00", duration: "2 horas", venue: "Cafetería aliada",
    location: "Lugar por confirmar al reservar", price: 24000, capacity: 16, booked: 6,
    audience: "En familia", age: "Desde 6 años con un adulto", image: "/images/pintura.webp",
    imageAlt: "Materiales de pintura en yeso y calabazas de colores suaves",
    includes: ["Dos figuras por persona", "Todos los materiales", "Una bebida de la cafetería", "Guía para principiantes"],
  },
  {
    id: "repujado-1212", title: "Un regalo hecho por ti", technique: "Repujado",
    description: "Transforma una lámina de cobre en un detalle botánico con mucho significado.",
    date: "2026-12-12", time: "16:00", duration: "2 h 30 min", venue: "Zia Bistro",
    location: "Dirección por confirmar al reservar", price: 28000, capacity: 12, booked: 12,
    audience: "Para ti", age: "Desde 14 años", image: "/images/repujado.webp",
    imageAlt: "Detalle botánico artesanal en cobre repujado",
    includes: ["Todos los materiales", "Herramientas durante el taller", "Una bebida de la cafetería", "Envoltorio para tu regalo"],
  },
];

export const products: Product[] = [
  {
    id: "kit-calabazas", name: "Kit · Una tarde de colores", category: "kits",
    description: "Todo para pintar, reír y crear en casa.", price: 18900,
    image: "/images/pintura.webp", imageAlt: "Kit de calabazas de yeso, pinturas y pinceles",
    badge: "Materiales Completos", detail: "Un pequeño taller dentro de una caja. Comparte una tarde creativa con cuatro calabacitas de yeso listas para pintar. Para dos personas, desde 6 años con supervisión adulta.",
    includes: ["4 calabazas de yeso", "6 colores de pintura", "2 pinceles y una paleta", "Instrucciones impresas"], stock: 8,
  },
  {
    id: "pulsera-jardin", name: "Pulsera · Jardín de colores", category: "obras",
    description: "Pequeños detalles que dicen mucho.", price: 14900,
    image: "/images/miyuki.webp", imageAlt: "Pulseras florales de Miyuki sobre un plato de cerámica",
    badge: "100% Hecho a Mano", detail: "Pulsera tejida a mano con mostacillas de vidrio Miyuki. Una pequeña flor para acompañarte cada día. Consulta por tu combinación favorita: coral, menta o marfil.",
    includes: ["Una pulsera de cierre ajustable", "Mostacillas de vidrio Miyuki", "Bolsita de tela para regalo", "Tarjeta de cuidados"], stock: 5,
  },
  {
    id: "guia-repujado", name: "Guía PDF · Mi primer repujado", category: "guias",
    description: "La magia del relieve, paso a paso.", price: 5900,
    image: "/images/repujado.webp", imageAlt: "Diseño floral repujado en cobre, referencia de la guía digital",
    badge: "Descarga Inmediata", detail: "Guía digital ilustrada de demostración para conocer las herramientas y los pasos básicos del repujado. Incluye un diseño botánico para practicar a tu ritmo. No incluye materiales físicos.",
    includes: ["Formato PDF en español", "Lista de herramientas y materiales", "Ejercicios para principiantes", "Plantilla botánica imprimible"], stock: null,
  },
  {
    id: "kit-miyuki", name: "Kit · Teje tu propia magia", category: "kits",
    description: "Tu primera pulsera, hecha por ti.", price: 22900,
    image: "/images/miyuki.webp", imageAlt: "Mostacillas, aguja e inspiración de pulseras para un kit Miyuki",
    badge: "Materiales Completos", detail: "Un proyecto pequeño para regalarte un gran momento. Aprende el tejido básico de una pulsera floral con materiales seleccionados y un patrón fácil de seguir. Recomendado desde 14 años.",
    includes: ["Mostacillas en 3 colores", "Hilo, aguja y cierre", "Patrón floral impreso", "Bolsa para guardar tu proyecto"], stock: 6,
  },
  {
    id: "obra-botanica", name: "Obra · Flor de cobre", category: "obras",
    description: "Una pieza de naturaleza para tu rincón.", price: 34900,
    image: "/images/repujado.webp", imageAlt: "Pieza artesanal de cobre con relieve botánico",
    badge: "100% Hecho a Mano", detail: "Una composición botánica de cobre repujada a mano. Cada relieve conserva las pequeñas huellas del proceso artesanal. Pieza decorativa de aproximadamente 20 × 20 cm; consulta por las terminaciones disponibles.",
    includes: ["Una pieza de cobre repujado", "Soporte decorativo", "Embalaje protector", "Instrucciones de cuidado"], stock: 1,
  },
  {
    id: "guia-pintura", name: "Guía PDF · Colores en familia", category: "guias",
    description: "Ideas bonitas para una tarde sin pantallas.", price: 4900,
    image: "/images/pintura.webp", imageAlt: "Calabazas en colores pastel como referencia de pintura en familia",
    badge: "Descarga Inmediata", detail: "Una guía digital de demostración para organizar una sesión de pintura en familia. Explora mezclas, patrones sencillos y actividades para compartir con niños y niñas desde 6 años. No incluye materiales físicos.",
    includes: ["PDF imprimible en español", "6 actividades creativas", "Guía de mezclas de color", "Lista de preparación"], stock: null,
  },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Daniela M.", context: "Una tarde con su hija", quote: "Llegamos pensando que no sabíamos pintar y nos fuimos con nuestras creaciones y un recuerdo precioso. Qué lindo compartir algo así juntas.", initials: "DM", color: "bg-rose-100 text-rose-700" },
  { id: "t2", name: "Carolina R.", context: "Un momento para ella", quote: "Entre el café, la conversación y las mostacillas, me olvidé del reloj. Ese ratito para mí era justo lo que necesitaba.", initials: "CR", color: "bg-emerald-100 text-emerald-800" },
  { id: "t3", name: "Javier y Sofía", context: "Creatividad en familia", quote: "Abrimos el kit un domingo y la mesa se llenó de colores. Nos encantó hacer algo con las manos y tener tiempo para conversar.", initials: "JS", color: "bg-amber-100 text-amber-800" },
];

export const WHATSAPP_NUMBER = "56983855951";
export const GENERAL_MESSAGE = "¡Hola, Color & Arte! Me gustaría conocer más sobre sus talleres y productos creativos. 🌷";
export const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
export const remainingSeats = (workshop: Workshop) => Math.max(0, workshop.capacity - workshop.booked);
// UTC evita que una fecha sin hora cambie de día según la zona del navegador.
export const dateFormatter = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", weekday: "long", timeZone: "UTC" });
export const dateLabel = (date: string) => dateFormatter.format(new Date(`${date}T12:00:00Z`));
export const workshopMessage = (workshop: Workshop) => remainingSeats(workshop) > 0
  ? `¡Hola, Color & Arte! 🌷 Quiero reservar el taller «${workshop.title}» de ${workshop.technique}, el ${dateLabel(workshop.date)} de ${workshop.date.slice(0, 4)} a las ${workshop.time}, en ${workshop.venue}. Valor de referencia: ${formatPrice(workshop.price)} CLP por persona. ¿Me confirman disponibilidad, dirección y cómo reservar?`
  : `¡Hola, Color & Arte! 🌷 Me interesa la lista de espera del taller «${workshop.title}», el ${dateLabel(workshop.date)} de ${workshop.date.slice(0, 4)} a las ${workshop.time}. ¿Me avisan si se libera un cupo?`;

export type NavId = "inicio" | "talleres" | ProductCategory;
export type CartItem = { productId: string; quantity: number };
export const CART_KEY = "color-arte-bag-v1";
export const navigation: { id: NavId; label: string; href: string }[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "talleres", label: "Talleres Presenciales", href: "/talleres" },
  { id: "kits", label: "Kits DIY Familiares", href: "/kits" },
  { id: "obras", label: "Obras Únicas", href: "/obras" },
  { id: "guias", label: "Guías PDF", href: "/guias" },
];
export const buttonBase = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-300 active:scale-[.97]";
export const primaryButton = `${buttonBase} bg-rose-600 px-6 py-3.5 text-white shadow-sm hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-900/10`;
export const outlineButton = `${buttonBase} border border-stone-200 bg-white px-5 py-3 text-ink hover:border-rose-300 hover:bg-rose-50`;

