import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/caveat/600.css";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Color & Arte | Un momento para crear y conectar",
  description:
    "Descubre talleres creativos, kits para disfrutar en familia y piezas artesanales de Color & Arte. Consulta y reserva por WhatsApp.",
  icons: { icon: "/logo-color-arte.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CL" data-scroll-behavior="smooth"><body><SiteShell>{children}</SiteShell></body></html>;
}
