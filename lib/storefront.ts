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
export type KitGroup = "cajas-familiares" | "pinta-y-celebra";
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
  tagline?: string;
  familyAudience?: string;
  occasionTag?: string;
  highlights?: string[];
  kitGroup?: KitGroup;
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
    id: "repujado-0711", title: "Flores y relieves que cobran vida", technique: "Repujado",
    description: "Un hobby relajante para ti: aprende a dar relieve en aluminio paso a paso mientras disfrutas un rico café en Lo Barnechea.",
    date: "2026-11-07", time: "11:00", duration: "2 h 30 min", venue: "Café Zia Bistro · Lo Barnechea",
    location: "Av. La Dehesa 1822, Lo Barnechea, Chile", price: 28000, capacity: 12, booked: 8,
    audience: "Para ti", age: "Desde 14 años · Ideal mujeres y mamás", image: "/images/talleres/Taller de Repujado en aluminio.jpeg",
    imageAlt: "Taller de Repujado en aluminio de Color y Arte con cuadro en relieve",
    includes: ["Lámina de aluminio y herramientas", "Guía paso a paso sin experiencia", "Una bebida rica de la cafetería", "Tu obra terminada lista para lucir"],
  },
  {
    id: "miyuki-1411", title: "Decoupage y Puntillismo: Mañana para Ti", technique: "Joyería Miyuki",
    description: "Desconecta de la rutina, comparte entre mujeres y descubre tu nuevo hobby favorito lleno de color en Lo Barnechea.",
    date: "2026-11-14", time: "16:00", duration: "3 horas", venue: "Espacio Los Trapenses · Lo Barnechea",
    location: "Camino Los Trapenses 3515, Lo Barnechea, Chile", price: 32000, capacity: 10, booked: 4,
    audience: "Para ti", age: "Desde 14 años · Tu pausa creativa", image: "/images/talleres/Taller de Decoupage.jpeg",
    imageAlt: "Taller de Decoupage Color y Arte con bandeja de madera decorada con limones y pájaro azul",
    includes: ["Todos los materiales incluidos", "Herramientas durante el taller", "Una bebida de la cafetería", "Tu pieza decorada por ti"],
  },
  {
    id: "pintura-2111", title: "Una tarde para pintar juntos", technique: "Pintura en yeso",
    description: "Corazones, calabacitas, pinceles y una tarde llena de color para disfrutar mamá, papá e hijos en Lo Barnechea.",
    date: "2026-11-21", time: "11:00", duration: "2 horas", venue: "Casa Taller El Rodeo · Lo Barnechea",
    location: "Av. El Rodeo 12850, Lo Barnechea, Chile", price: 22000, capacity: 16, booked: 11,
    audience: "En familia", age: "Desde 6 años con un adulto", image: "/images/talleres/Taller de pinta tu corazon en yeso.jpeg",
    imageAlt: "Taller de Pinta tu Corazón en yeso de Color y Arte con flores pintadas a mano",
    includes: ["Figuras de yeso listas para pintar", "Pinturas acrílicas, pinceles y delantal", "Una bebida de la cafetería", "Acompañamiento cariñoso en cada paso"],
  },
  {
    id: "pintura-0512", title: "Diciembre se pinta en familia", technique: "Pintura en yeso",
    description: "Una pausa mágica entre pinceles para crear cofres, corazones y recuerdos con quienes más quieres en Lo Barnechea.",
    date: "2026-12-05", time: "11:00", duration: "2 horas", venue: "Rincón Botánico El Huinganal · Lo Barnechea",
    location: "Av. El Huinganal 2940, Lo Barnechea, Chile", price: 24000, capacity: 16, booked: 6,
    audience: "En familia", age: "Desde 6 años con un adulto", image: "/images/talleres/Taller de pinta tu calabaza.jpeg",
    imageAlt: "Taller de Pinta tu Calabaza cofre creativo de Color y Arte",
    includes: ["Figuras por participante", "Todos los materiales incluidos", "Una bebida de la cafetería", "Guía fácil para grandes y chicos"],
  },
  {
    id: "repujado-1212", title: "Un regalo hecho por ti", technique: "Repujado",
    description: "Transforma el arte manual en un detalle único hecho por tus manos para regalar o decorar tu hogar.",
    date: "2026-12-12", time: "16:00", duration: "2 h 30 min", venue: "Terraza La Dehesa · Lo Barnechea",
    location: "Av. Las Condes 14890, Pueblo de Lo Barnechea, Chile", price: 28000, capacity: 12, booked: 12,
    audience: "Para ti", age: "Desde 14 años · Especial mujeres", image: "/images/talleres/taller pintar corazon de madera.jpeg",
    imageAlt: "Taller Pinta tu Corazón en madera de Color y Arte",
    includes: ["Todos los materiales", "Herramientas durante el taller", "Una bebida de la cafetería", "Envoltorio especial para regalo"],
  },
];

export const homeFeaturedWorkshops: Workshop[] = [
  ...workshops,
  {
    id: "puntillismo-1811", title: "Mandalas y Puntillismo: Calma para Ti", technique: "Pintura en yeso",
    description: "Aprende el arte de crear punto a punto mientras disfrutas un café entre mujeres en Lo Barnechea.",
    date: "2026-11-18", time: "17:30", duration: "2 h 30 min", venue: "Café Paseo Pie Andino · Lo Barnechea",
    location: "Paseo Pie Andino 4800, Lo Barnechea, Chile", price: 26000, capacity: 12, booked: 7,
    audience: "Para ti", age: "Desde 14 años · Especial hobby y relajo", image: "/images/talleres/Taller de Puntillismo.jpeg",
    imageAlt: "Taller de Puntillismo Color y Arte con mandala multicolor",
    includes: ["Disco de madera, acrílicos y punzones", "Guía de patrones paso a paso", "Café o té e infusiones", "Tu mandala listo para decorar"],
  },
  {
    id: "kinusaiga-2811", title: "Kinusaiga: Cuadros con Telas sin Coser", technique: "Joyería Miyuki",
    description: "Descubre esta fascinante técnica japonesa sin agujas ni hilos. Ideal para venir sola, con amigas o con tus hijos.",
    date: "2026-11-28", time: "11:00", duration: "2 h 30 min", venue: "Espacio Los Trapenses · Lo Barnechea",
    location: "Camino Los Trapenses 3515, Lo Barnechea, Chile", price: 29000, capacity: 14, booked: 9,
    audience: "En familia", age: "Desde 8 años y adultos", image: "/images/talleres/Taller de Kinusaiga.jpeg",
    imageAlt: "Taller de Kinusaiga arte con telas sin coser de Color y Arte",
    includes: ["Marco, base ranurada y telas", "Herramientas de encaje", "Merienda y bebida en cafetería", "Tu cuadro enmarcado"],
  },
  {
    id: "decoupage-vidrio-2911", title: "Decoupage Botánico en Vidrio", technique: "Repujado",
    description: "Transforma frascos y bandejas de vidrio en piezas de decoración primaveral hechas por ti.",
    date: "2026-11-29", time: "16:30", duration: "2 h 30 min", venue: "Café Zia Bistro · Lo Barnechea",
    location: "Av. La Dehesa 1822, Lo Barnechea, Chile", price: 27000, capacity: 10, booked: 6,
    audience: "Para ti", age: "Desde 14 años · Especial mujeres y mamás", image: "/images/talleres/Taller de decoupage en vidrio.jpeg",
    imageAlt: "Taller de Decoupage en vidrio de Color y Arte",
    includes: ["Frascos de vidrio y servilletas botánicas", "Adhesivos y barniz protector", "Una bebida de la cafetería", "Tus piezas listas para lucir"],
  },
];

export type InstagramPost = {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
};

export const instagramFeedPosts: InstagramPost[] = [
  {
    id: "ig-1",
    image: "/images/talleres/taller pintar corazon de madera.jpeg",
    caption: "💖 Taller Pinta tu Corazón en madera · Una tarde entre pinceles, flores y buena compañía en Lo Barnechea. #coloryarte #tallereslobarnechea",
    likes: 148,
    comments: 24,
    tag: "Taller Presencial",
  },
  {
    id: "ig-2",
    image: "/images/kits/Kit de kinusaiga.jpeg",
    caption: "✨ ¡Nuevo Kit de Kinusaiga! Crea arte con telas sin coser. Todos los materiales incluidos para disfrutar en familia. 🦎🌈",
    likes: 192,
    comments: 31,
    tag: "Kit Familiar",
  },
  {
    id: "ig-3",
    image: "/images/talleres/Taller de Decoupage.jpeg",
    caption: "🍋🐦 Taller de Decoupage · Transforma objetos con recortes y servilletas botánicas. ¡Mira qué linda quedó esta bandeja!",
    likes: 164,
    comments: 19,
    tag: "Hobby & Café",
  },
  {
    id: "ig-4",
    image: "/images/kits/kit de puntillismo.jpeg",
    caption: "🌈 Kit de Puntillismo · Crea arte punto a punto desde casa. Incluye lienzo circular, 10 pinturas, punzones y guía paso a paso.",
    likes: 215,
    comments: 38,
    tag: "Kit en Casa",
  },
  {
    id: "ig-5",
    image: "/images/talleres/Taller de Kinusaiga.jpeg",
    caption: "⛵ Taller de Kinusaiga · Arte japonés con telas sin aguja ni hilo. ¡Inscripciones abiertas en Lo Barnechea!",
    likes: 139,
    comments: 17,
    tag: "Taller Lo Barnechea",
  },
  {
    id: "ig-6",
    image: "/images/kits/Kit pinta tu corazon.jpeg",
    caption: "🎨 Kit Pinta tu Corazón · Dale color a un momento para ti o compártelo con tus hijos este fin de semana. 💕",
    likes: 183,
    comments: 29,
    tag: "Favorito Mamás",
  },
  {
    id: "ig-7",
    image: "/images/talleres/Taller de decoupage en vidrio.jpeg",
    caption: "🦋 Taller de Decoupage en Vidrio · Transforma frascos en arte botánico para iluminar tu rincón favorito.",
    likes: 156,
    comments: 22,
    tag: "Decoración",
  },
  {
    id: "ig-8",
    image: "/images/kits/Kit de repujado.jpeg",
    caption: "💎 Kit de Repujado en Aluminio · ¡Incluye 4 láminas, 4 bocetos y 10 pinturas para crear en familia!",
    likes: 171,
    comments: 26,
    tag: "4 Proyectos en 1",
  },
  {
    id: "ig-9",
    image: "/images/talleres/Taller de pinta tu calabaza.jpeg",
    caption: "🎃🌸 Taller Pinta tu Calabaza · Un cofre lleno de creatividad y flores pintadas a mano por nuestras alumnas.",
    likes: 128,
    comments: 15,
    tag: "Tarde Creativa",
  },
  {
    id: "ig-10",
    image: "/images/kits/Kit para pintar Mariposa.jpeg",
    caption: "🦋 Kit para Pintar Mariposa · Ideal para actividades de niños, cumpleaños, días de lluvia y regalos especiales.",
    likes: 144,
    comments: 21,
    tag: "Especial Peques",
  },
  {
    id: "ig-11",
    image: "/images/talleres/Taller de Puntillismo.jpeg",
    caption: "✨ El arte de crear con puntos · Ven a relajarte y pintar tu propio mandala en nuestros talleres en Lo Barnechea.",
    likes: 177,
    comments: 27,
    tag: "Terapia de Color",
  },
  {
    id: "ig-12",
    image: "/images/kits/Kit para pintar OSO.2.jpeg",
    caption: "🧸🌈 Kit para Pintar Osito · ¡Crea, pinta y celebra! Con 3 pinceles y pinturas listas para abrir y disfrutar.",
    likes: 162,
    comments: 20,
    tag: "Cumpleaños & Regalos",
  },
];

export type WorkshopTechniqueShowcase = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  audience: string;
  description: string;
  image: string;
  accent: string;
};

export const workshopShowcase: WorkshopTechniqueShowcase[] = [
  {
    id: "taller-decoupage-madera",
    title: "Taller de Decoupage en Bandeja",
    subtitle: "El arte de decorar con papel",
    badge: "🌸 Favorito Mamás & Hobby",
    audience: "Para ti o con amigas",
    description: "Transforma una bandeja de madera con diseños botánicos y acabado tipo pintura. Ideal para desconectar y llevarte algo precioso para tu casa.",
    image: "/images/talleres/Taller de Decoupage.jpeg",
    accent: "from-rose-500/15 to-amber-500/15 border-rose-200",
  },
  {
    id: "taller-puntillismo",
    title: "Taller de Puntillismo & Mandalas",
    subtitle: "El arte de crear punto a punto",
    badge: "🌈 Terapia de color y calma",
    audience: "Para ti y en familia",
    description: "Una técnica relajante y adictiva: aprende a usar punzones y acrílicos para formar mandalas vibrantes que llenan de paz tu semana.",
    image: "/images/talleres/Taller de Puntillismo.jpeg",
    accent: "from-purple-500/15 to-rose-500/15 border-purple-200",
  },
  {
    id: "taller-kinusaiga",
    title: "Taller de Kinusaiga Japonés",
    subtitle: "Arte con telas, ¡sin coser!",
    badge: "✨ Sin agujas · Sorprendente",
    audience: "Para todas las edades",
    description: "Crea cuadros llenos de textura encajando retazos de tela en ranuras, sin aguja ni hilo. ¡Un hobby original que enamora a primera vista!",
    image: "/images/talleres/Taller de Kinusaiga.jpeg",
    accent: "from-sky-500/15 to-emerald-500/15 border-emerald-200",
  },
  {
    id: "taller-corazon-madera",
    title: "Taller Pinta tu Corazón en Madera",
    subtitle: "Dale color y alegría a tu rincón",
    badge: "💖 Pinceladas con alma",
    audience: "Especial mujeres y familia",
    description: "Decoramos corazones de madera con flores vibrantes, detalles luminosos y barniz protector. El plan perfecto para una tarde entre risas.",
    image: "/images/talleres/taller pintar corazon de madera.jpeg",
    accent: "from-pink-500/15 to-amber-500/15 border-pink-200",
  },
  {
    id: "taller-decoupage-vidrio",
    title: "Taller de Decoupage en Frascos de Vidrio",
    subtitle: "Transforma frascos en arte",
    badge: "🦋 Decoración botánica",
    audience: "Tu momento creativo",
    description: "Aprende a decorar frascos y botellas con motivos florales, aves y mariposas que lucen increíbles en tu cocina o terraza.",
    image: "/images/talleres/Taller de decoupage en vidrio.jpeg",
    accent: "from-amber-500/15 to-emerald-500/15 border-amber-200",
  },
  {
    id: "taller-decoupage-bandeja-vidrio",
    title: "Taller de Decoupage en Bandeja de Vidrio",
    subtitle: "Brillo y color por el reverso",
    badge: "🌻 Técnica paso a paso",
    audience: "Para ti · Sin experiencia",
    description: "Aplica diseños florales por el reverso del vidrio para apreciarlos a través del brillo transparente. ¡Queda como de tienda boutique!",
    image: "/images/talleres/Taller de decoupage en vidrio con papel.jpeg",
    accent: "from-amber-500/15 to-rose-500/15 border-amber-200",
  },
  {
    id: "taller-repujado-aluminio",
    title: "Taller de Repujado en Aluminio",
    subtitle: "Relieve artesanal con tus manos",
    badge: "💎 Pieza de colección",
    audience: "Para ti · Desde 14 años",
    description: "Descubre cómo dar volumen a una lámina de aluminio paso a paso hasta lograr un cuadro en relieve lleno de delicadeza y significado.",
    image: "/images/talleres/Taller de Repujado en aluminio.jpeg",
    accent: "from-stone-400/15 to-amber-500/15 border-stone-300",
  },
  {
    id: "taller-corazon-yeso",
    title: "Taller Pinta tu Corazón en Yeso",
    subtitle: "Tarde creativa mamá e hijos",
    badge: "👩‍👧‍👦 Ideal en familia",
    audience: "Desde 6 años con adulto",
    description: "Cada participante pinta su corazón de yeso con flores y colores vibrantes. Una experiencia tierna para guardar un recuerdo hecho juntos.",
    image: "/images/talleres/Taller de pinta tu corazon en yeso.jpeg",
    accent: "from-rose-500/15 to-pink-500/15 border-rose-200",
  },
  {
    id: "taller-calabaza-yeso",
    title: "Taller Pinta tu Calabaza Cofre",
    subtitle: "Un cofre lleno de creatividad",
    badge: "🎨 Favorito familiar",
    audience: "Grandes y chicos",
    description: "Transformamos calabazas de yeso con tapa en cofres decorativos pintados a mano y sellados con barniz al agua.",
    image: "/images/talleres/Taller de pinta tu calabaza.jpeg",
    accent: "from-orange-500/15 to-rose-500/15 border-orange-200",
  },
];

export const products: Product[] = [
  {
    id: "kit-kinusaiga", name: "Kit · Arte Kinusaiga en Familia", category: "kits",
    description: "Crea arte con telas vibrantes, ¡sin usar ni una sola aguja! El cuadro que toda la familia querrá colgar en casa.",
    price: 24900,
    image: "/images/kits/Kit de kinusaiga.jpeg",
    imageAlt: "Kit de Kinusaiga Color y Arte con cuadro de camaleón en telas de colores, base de plumavit, moldes y herramientas",
    badge: "Materiales Completos",
    tagline: "¡Crea un cuadro increíble con telas de colores y sin coser!",
    familyAudience: "Ideal en familia · Desde 7 años, jóvenes y adultos",
    occasionTag: "✨ Magia sin agujas",
    kitGroup: "cajas-familiares",
    highlights: [
      "Técnica japonesa segura y sin agujas: perfecta para grandes y chicos",
      "Despierta la concentración, la paciencia y el orgullo de crear juntos",
      "Resultado espectacular: un cuadro lleno de textura listo para lucir",
    ],
    detail: "Descubre en la mesa de tu comedor el fascinante arte japonés del Kinusaiga: vestir un diseño ranurado con retazos de tela llenos de color, sin coser ni usar agujas. Es el panorama perfecto para una tarde de fin de semana donde papás, hijos y abuelos conversan, eligen combinaciones de telas y ven aparecer un camaleón vibrante hecho por sus propias manos.",
    includes: [
      "Base de plumavit ranurada lista para trabajar",
      "Selección de telas coloridas y texturizadas",
      "Molde del diseño y molde impreso de guía",
      "Set de herramientas (insertador, esteca y cortador)",
      "Guía paso a paso para disfrutar sin experiencia previa",
    ],
    stock: 8,
  },
  {
    id: "kit-puntillismo", name: "Kit · Puntillismo Punto a Punto", category: "kits",
    description: "Baja el ritmo de toda la casa y llenen la mesa de mandalas, color y calma compartida.",
    price: 21900,
    image: "/images/kits/kit de puntillismo.jpeg",
    imageAlt: "Kit de Puntillismo Color y Arte con caja creativa, mandala pintado sobre disco negro, 10 pinturas acrílicas, punzones y paleta",
    badge: "Materiales Completos",
    tagline: "Relájate, conversa y disfruta pintando punto a punto.",
    familyAudience: "Para toda la familia · Desde 6 años hasta abuelos",
    occasionTag: "🌈 Calma y conexión",
    kitGroup: "cajas-familiares",
    highlights: [
      "No necesitas saber dibujar: cada punto guía tus manos de forma natural",
      "10 colores vibrantes para mezclar y crear diseños infinitos en familia",
      "Punzones dobles reutilizables para seguir creando más obras en casa",
    ],
    detail: "Un verdadero taller de mindfulness y alegría dentro de una caja. El puntillismo tiene un efecto mágico en casa: los niños se concentran con entusiasmo y los adultos sueltan el estrés de la semana. Con su lienzo circular negro y 10 pinturas acrílicas de alto contraste, cada punto brilla desde el primer minuto.",
    includes: [
      "Lienzo circular negro para pintar tu mandala",
      "10 pinturas acrílicas brillantes y cubritivas",
      "3 punzones dobles profesionales para puntillismo",
      "Paleta mezcladora de flor, lápiz de trazado y papel absorbente",
      "Guía paso a paso hecha para inspirar tu creatividad",
    ],
    stock: 10,
  },
  {
    id: "kit-repujado", name: "Kit · Repujado Familiar (4 Láminas)", category: "kits",
    description: "¡Incluye 4 láminas de aluminio y 4 bocetos para que nadie en la mesa se quede solo mirando!",
    price: 26900,
    image: "/images/kits/Kit de repujado.jpeg",
    imageAlt: "Kit de Repujado Color y Arte con flor en relieve sobre aluminio, caja del kit, 10 pinturas acrílicas, pinceles y esfuminos",
    badge: "Materiales Completos",
    tagline: "Da relieve a tus ideas y creen 4 piezas únicas juntos.",
    familyAudience: "Para compartir entre 2 a 4 personas · Todas las edades",
    occasionTag: "💎 4 proyectos en 1 caja",
    kitGroup: "cajas-familiares",
    highlights: [
      "¡Vienen 4 láminas y 4 bocetos! Alcanza para crear en equipo familiar",
      "Combina el asombro del relieve en metal con 10 pinturas acrílicas",
      "Desarrolla la creatividad y deja recuerdos eternos para regalar",
    ],
    detail: "El favorito cuando toda la familia quiere meter las manos al arte al mismo tiempo. Gracias a sus 4 láminas de aluminio, 4 bocetos diferentes y sets de 3 esfuminos y 3 pinceles, pueden sentarse juntos a dar volumen a flores y mariposas, y luego darles color a gusto. Ideal para compartir en familia o crear regalos inolvidables hechos a mano.",
    includes: [
      "4 láminas de aluminio listas para repujar",
      "4 bocetos con diseños florales y de mariposa",
      "2 láminas de goma Eva para trabajar el relieve",
      "3 esfuminos, 3 pinceles y 1 lápiz mina",
      "10 pinturas acrílicas para personalizar tus obras",
    ],
    stock: 7,
  },
  {
    id: "kit-corazon", name: "Kit · Pinta tu Corazón en Familia", category: "kits",
    description: "Un corazón artesanal en relieve y 10 colores vibrantes para transformar cualquier tarde en un recuerdo imborrable.",
    price: 18900,
    image: "/images/kits/Kit pinta tu corazon.jpeg",
    imageAlt: "Kit Pinta tu Corazón de Color y Arte con corazón de yeso floral en blanco y pintado, 10 pinturas acrílicas, 3 pinceles y paleta",
    badge: "Materiales Completos",
    tagline: "Colores que llenan el alma · Crea, relájate y disfruta.",
    familyAudience: "Para todas las edades · Especial mamá, papá e hijos",
    occasionTag: "💖 Favorito familiar",
    kitGroup: "cajas-familiares",
    highlights: [
      "Relieve floral profundo que hace muy fácil y placentero pintar sin salirse",
      "Incluye 10 pinturas acrílicas y 3 pinceles para pintar a dúo",
      "El regalo con más sentido para cumpleaños, Día de la Madre o abuelos",
    ],
    detail: "Hay tardes que se quedan guardadas en la memoria para siempre. Con el Kit Pinta tu Corazón tienes todo listo para preparar algo rico, poner música suave y darle vida a un corazón de yeso con relieve floral artesanal. Sus bordes en relieve ayudan a que tanto niños como adultos logren un acabado precioso desde la primera pincelada.",
    includes: [
      "1 corazón de yeso artesanal con relieve floral",
      "10 pinturas acrílicas de tonos alegres y luminosos",
      "3 pinceles de distintos grosores para base y detalles",
      "Paleta de mezcla tipo flor y paño suave de limpieza",
      "Guía de diseños para inspirar tu combinación de colores",
    ],
    stock: 12,
  },
  {
    id: "kit-girasol", name: "Kit para Pintar · Girasol de la Alegría", category: "kits",
    description: "¡Crea, pinta y celebra! El panorama ideal para sacar a los niños de las pantallas en 1 minuto.",
    price: 10900,
    image: "/images/kits/Kit para pintar Girasol.jpeg",
    imageAlt: "Kit para pintar figura de Girasol en yeso con 3 pinturas, 3 pinceles y presentación festiva de Color y Arte",
    badge: "Materiales Completos",
    tagline: "¡Fomenta la creatividad de tus peques, una obra maestra a la vez!",
    familyAudience: "Niños y familia · Desde 4 años · Cumpleaños y tardes de lluvia",
    occasionTag: "🌻 Ideal peques y fiestas",
    kitGroup: "pinta-y-celebra",
    highlights: [
      "Empaque de fiesta con papel multicolor: emociona apenas lo reciben",
      "3 pinceles y 3 pinturas vibrantes listas para abrir y pintar al instante",
      "Ideal para días de lluvia, premios, cumpleaños o tardes con los primos",
    ],
    detail: "Pensado especialmente para encender la chispa creativa de los niños y niñas en casa. Su gran flor en relieve es cómoda para manos pequeñas y permite pintar pétalo por pétalo con total libertad. Es la sorpresa perfecta para tener guardada en casa para un día de lluvia o para regalar en cumpleaños infantiles.",
    includes: [
      "1 figura grande de girasol en yeso artesanal con relieve",
      "3 potes de pintura seleccionados (verde, amarillo sol y fucsia)",
      "3 pinceles de distintos tamaños (incluye pincel ancho para niños)",
      "Presentación de regalo con cama de serpentinas multicolores",
    ],
    stock: 15,
  },
  {
    id: "kit-mariposa", name: "Kit para Pintar · Mariposa Mágica", category: "kits",
    description: "Las alas de nuestra mariposa listas para llenarse con la imaginación de tus hijos en la mesa familiar.",
    price: 10900,
    image: "/images/kits/Kit para pintar Mariposa.jpeg",
    imageAlt: "Kit para pintar Mariposa de yeso con 3 colores de pintura, 3 pinceles y bolsa de regalo Color y Arte",
    badge: "Materiales Completos",
    tagline: "Alas de colores hechas por ellos mismos para decorar su rincón.",
    familyAudience: "Niños y familia · Desde 4 años · Regalos y pijamadas",
    occasionTag: "🦋 Favorito de niños y niñas",
    kitGroup: "pinta-y-celebra",
    highlights: [
      "Relieves en las alas que guían el pincel y llenan de orgullo a los peques",
      "Trae 3 pinceles para que un adulto pueda acompañar y pintar detalles juntos",
      "Excelente opción para sorpresas de cumpleaños creativas y sin pantallas",
    ],
    detail: "La mariposa insignia de Color & Arte lista para que los niños y niñas creen su propia versión llena de fantasía. Gracias a sus detalles en relieve, cada ala se convierte en un pequeño lienzo donde pueden experimentar mezclando amarillo, verde y fucsia mientras comparten una tarde alegre en familia.",
    includes: [
      "1 figura de mariposa en yeso artesanal con relieve en las alas",
      "3 potes de pintura (verde, amarillo y rosa intenso)",
      "Set de 3 pinceles para trazos amplios y pequeños puntos",
      "Empaque festivo listo para regalar o sorprender en casa",
    ],
    stock: 15,
  },
  {
    id: "kit-oso-pastel", name: "Kit para Pintar · Osito Dulzura", category: "kits",
    description: "El compañero 3D más tierno para que los más pequeños vivan su primera gran aventura con los pinceles.",
    price: 11900,
    image: "/images/kits/Kit para pintar OSO.2.jpeg",
    imageAlt: "Kit para pintar Osito 3D de yeso edición colores vibrantes con 3 pinturas y 3 pinceles",
    badge: "Materiales Completos",
    tagline: "Ternura en 3D para pintar, jugar y atesorar en su dormitorio.",
    familyAudience: "Peques y familia · Desde 4 años · Regalo lleno de cariño",
    occasionTag: "🧸 Figura 3D adorable",
    kitGroup: "pinta-y-celebra",
    highlights: [
      "Figura de osito en 3D que queda parada para decorar la pieza infantil",
      "Paleta alegre y luminosa para crear un osito lleno de fantasía",
      "Estimula la motricidad fina y la paciencia lejos del celular y la tablet",
    ],
    detail: "Cuando los niños ven este osito en 3D sobre su cama de papel multicolor, sus ojitos se iluminan de inmediato. Es una actividad cálida, entretenida y muy fácil de preparar: solo pon un individual en la mesa, un vasito con agua para los pinceles y disfruta viendo cómo le dan personalidad a su nuevo amigo.",
    includes: [
      "1 figura 3D de osito sentado en yeso suave de alta calidad",
      "3 potes de pintura alegre (verde, amarillo y fucsia)",
      "3 pinceles incluidos para cubrir el cuerpo y pintar carita",
      "Presentación de fiesta con diseño de corazones y estrellas",
    ],
    stock: 14,
  },
  {
    id: "kit-oso-aventura", name: "Kit para Pintar · Osito Aventura", category: "kits",
    description: "Tonos bosque y naturaleza para pintar en dupla de hermanos, primos o junto a papá y mamá.",
    price: 11900,
    image: "/images/kits/Kit para pintar OSO.jpeg",
    imageAlt: "Kit para pintar Osito 3D de yeso con pinturas tonos café, verde y negro y 3 pinceles en empaque celeste",
    badge: "Materiales Completos",
    tagline: "¡El par perfecto para que hermanos o primos pinten juntos sin pelear materiales!",
    familyAudience: "Peques, hermanos y familia · Desde 4 años",
    occasionTag: "🎨 Especial hermanos y primos",
    kitGroup: "pinta-y-celebra",
    highlights: [
      "Incluye tonos café, verde y negro ideales para un osito clásico y sus ojitos",
      "Cada niño tiene sus propios 3 pinceles y pinturas: cero peleas en la mesa",
      "Combínalo con el Osito Dulzura o la Mariposa para armar tu tarde familiar",
    ],
    detail: "Diseñado con una paleta de colores tierra y bosque (café, verde y negro) para los niños que quieren pintar un osito tradicional o lleno de detalles de naturaleza. Es el complemento favorito de las familias que llevan dos o más kits para que cada hermano o primo tenga su propia estación de arte completa.",
    includes: [
      "1 figura 3D de osito sentado en yeso artesanal",
      "3 potes de pintura (café osito, verde bosque y negro para detalles)",
      "Set de 3 pinceles listos para usar",
      "Presentación celeste estrellada con relleno multicolor de regalo",
    ],
    stock: 14,
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
    id: "obra-botanica", name: "Obra · Flor de cobre", category: "obras",
    description: "Una pieza de naturaleza para tu rincón.", price: 34900,
    image: "/images/repujado.webp", imageAlt: "Pieza artesanal de cobre con relieve botánico",
    badge: "100% Hecho a Mano", detail: "Una composición botánica de cobre repujada a mano. Cada relieve conserva las pequeñas huellas del proceso artesanal. Pieza decorativa de aproximadamente 20 × 20 cm; consulta por las terminaciones disponibles.",
    includes: ["Una pieza de cobre repujado", "Soporte decorativo", "Embalaje protector", "Instrucciones de cuidado"], stock: 1,
  },
  {
    id: "guia-pintura", name: "Guía PDF · Colores en familia", category: "guias",
    description: "Ideas y plantillas para una tarde creativa sin pantallas con tus hijos.", price: 4900,
    image: "/images/pintura.webp", imageAlt: "Calabazas en colores pastel como referencia de pintura en familia",
    badge: "Descarga Inmediata", detail: "Una guía digital de demostración para organizar una sesión de pintura en familia. Explora mezclas, patrones sencillos y actividades para compartir con niños y niñas desde 6 años. No incluye materiales físicos.",
    includes: ["PDF imprimible (18 págs.)", "6 actividades paso a paso", "Guía de mezcla de colores", "Checklist de materiales caseros"], stock: null,
  },
  {
    id: "guia-decoupage", name: "Guía PDF · Decoupage botánico desde cero", category: "guias",
    description: "Domina el pegado sin arrugas en madera y bandejas con acabado barnizado.", price: 5900,
    image: "/images/talleres/Taller de Decoupage.jpeg", imageAlt: "Bandeja decorada con decoupage botánico de limones y ave",
    badge: "Descarga Inmediata", detail: "Manual digital paso a paso pensado para mujeres y mamás que quieren aprender la técnica de decoupage en casa usando servilletas decorativas, pincel suave y barniz al agua. 100% digital en formato PDF.",
    includes: ["PDF ilustrado (22 págs.)", "Técnica anti-arrugas paso a paso", "Lista de materiales económicos", "3 plantillas botánicas imprimibles"], stock: null,
  },
  {
    id: "guia-puntillismo", name: "Guía PDF · Mandalas y puntillismo relajante", category: "guias",
    description: "Patrones guiados y ejercicios de simetría para desconectar punto a punto.", price: 5500,
    image: "/images/talleres/Taller de Puntillismo.jpeg", imageAlt: "Mandala colorido creado con técnica de puntillismo",
    badge: "Descarga Inmediata", detail: "Cuaderno digital descargable e imprimible con grillas de simetría, combinaciones armónicas de color y ejercicios de tamaños de punto para practicar con punzones o herramientas caseras.",
    includes: ["PDF descargable (24 págs.)", "5 plantillas de mandalas A4", "Guía de paletas de color", "Trucos con herramientas de casa"], stock: null,
  },
  {
    id: "guia-kinusaiga", name: "Guía PDF · Kinusaiga: arte con telas sin coser", category: "guias",
    description: "Aprende a trazar ranuras y encajar retazos textiles paso a paso en casa.", price: 6500,
    image: "/images/talleres/Taller de Kinusaiga.jpeg", imageAlt: "Cuadro textil de Kinusaiga japonés sin agujas",
    badge: "Descarga Inmediata", detail: "Guía digital con moldes descargables para reutilizar retazos de tela en casa y crear cuadros llenos de textura sin usar agujas ni hilo. Ideal para hacer sola o con niños desde los 8 años.",
    includes: ["PDF interactivo (20 págs.)", "4 moldes listos para imprimir", "Guía de telas recomendadas", "Secuencia fotográfica detallada"], stock: null,
  },
  {
    id: "guia-decoupage-vidrio", name: "Guía PDF · Decoupage en frascos y vidrio", category: "guias",
    description: "Recicla frascos y botellas transformándolos en piezas decorativas luminosas.", price: 5500,
    image: "/images/talleres/Taller de decoupage en vidrio.jpeg", imageAlt: "Frasco de vidrio decorado con decoupage floral",
    badge: "Descarga Inmediata", detail: "Aprende desde tu celular, tablet o computador cómo preparar superficies de vidrio, aplicar motivos por el derecho y por el reverso, y sellar para que duren años.",
    includes: ["PDF digital (16 págs.)", "Técnica en vidrio directo e inverso", "Fórmula de sellado duradero", "Ideas para reciclar frascos"], stock: null,
  },
  {
    id: "guia-corazones-madera", name: "Guía PDF · Pinta corazones y flores folk", category: "guias",
    description: "Trazos florales sencillos, hojas y puntos de luz para decorar madera o yeso.", price: 4900,
    image: "/images/talleres/taller pintar corazon de madera.jpeg", imageAlt: "Corazón de madera pintado a mano con flores coloridas",
    badge: "Descarga Inmediata", detail: "E-book práctico con hojas de práctica de pinceladas básicas para soltar la mano y pintar flores alegres aunque nunca hayas tomado un pincel.",
    includes: ["PDF imprimible (19 págs.)", "Hojas de práctica de pinceladas", "3 diseños de corazones a escala", "Guía de barnizado y protección"], stock: null,
  },
  {
    id: "guia-tarde-ninos", name: "Guía PDF · 10 tardes creativas para niños", category: "guias",
    description: "Manualidades fáciles para días de lluvia, vacaciones o cumpleaños en casa.", price: 4500,
    image: "/images/kits/Kit para pintar Girasol.jpeg", imageAlt: "Actividad creativa infantil de pintura en casa",
    badge: "Descarga Inmediata", detail: "Recetario digital pensado para mamás: 10 proyectos cortos de 30 a 45 minutos explicados paso a paso, con diplomas imprimibles para celebrar las obras de los niños.",
    includes: ["PDF familiar (26 págs.)", "10 proyectos por edades (4 a 12 años)", "Diplomas de pequeño artista imprimibles", "Tips para montar la mesa sin manchar"], stock: null,
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
export function shortDateLabel(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  const days = ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${days[d.getUTCDay()]} ${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
}
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

