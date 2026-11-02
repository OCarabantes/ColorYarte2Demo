import type { ProductCategory } from "@/lib/storefront";

export type Campaign = {
  id: string;
  category: ProductCategory | "talleres";
  label: string;
  announcement: string;
  title: string;
  description: string;
  offer: string;
  code: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  theme: "mint" | "rose" | "amber" | "lilac";
};

// Campañas ficticias: listas para sustituir por promociones de un CMS.
// No alteran precios, existencias ni condiciones de compra.
export const campaigns: Campaign[] = [
  {
    id: "tarde-en-casa", category: "kits", label: "Para crear en casa",
    announcement: "15% en kits · código CREA15", title: "La mejor tarde cabe en una caja.",
    description: "Pon tu música favorita, despeja la mesa y hagan algo bonito juntos. Nosotros ponemos los materiales; ustedes, las historias.",
    offer: "15% en tu próximo kit", code: "CREA15", href: "/kits", cta: "Encuentra tu kit",
    image: "/images/pintura.webp", imageAlt: "Calabazas de yeso, pinturas y pinceles para una tarde creativa en casa", theme: "mint",
  },
  {
    id: "ven-con-alguien", category: "talleres", label: "Para compartir un taller",
    announcement: "Ven en dupla · código DUPLA20", title: "El próximo café, con una dosis de arte.",
    description: "Invita a esa persona con la que siempre dices «tenemos que hacer algo». Una pausa, dos pinceles y un recuerdo para llevarse.",
    offer: "20% en el segundo cupo", code: "DUPLA20", href: "/talleres", cta: "Elige una experiencia",
    image: "/images/familia-creativa.webp", imageAlt: "Ambientación de una madre y su hija disfrutando una experiencia creativa", theme: "rose",
  },
  {
    id: "regala-una-historia", category: "obras", label: "Para regalar con intención",
    announcement: "Un regalo con cariño · código REGALO", title: "Los mejores regalos tienen una historia.",
    description: "Pequeñas cuentas, detalles botánicos y piezas hechas sin prisa. Encuentra ese detalle que se siente tan especial como quien lo recibe.",
    offer: "Envoltorio de regalo sin costo", code: "REGALO", href: "/obras", cta: "Descubre las piezas",
    image: "/images/miyuki.webp", imageAlt: "Pulseras artesanales de Miyuki en tonos coral, menta y marfil", theme: "amber",
  },
  {
    id: "una-idea-mas", category: "guias", label: "Para seguir aprendiendo",
    announcement: "2×1 en guías · código APRENDE2", title: "Ese «quiero aprender» empieza aquí.",
    description: "Una idea nueva, un paso a la vez. Explora técnicas y proyectos para seguir creando a tu propio ritmo, desde tu rincón favorito.",
    offer: "2×1 en guías seleccionadas", code: "APRENDE2", href: "/guias", cta: "Inspírate con una guía",
    image: "/images/repujado.webp", imageAlt: "Flor botánica de cobre repujado como inspiración para aprender una nueva técnica", theme: "lilac",
  },
];
