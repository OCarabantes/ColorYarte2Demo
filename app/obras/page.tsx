import type { Metadata } from "next";
import { CatalogueContent } from "@/components/catalogue-content";

export const metadata: Metadata = {
  title: "Obras Únicas | Color & Arte",
  description: "Descubre joyería Miyuki y obras artesanales de repujado, hechas a mano para regalar o decorar tu rincón favorito.",
};

export default function ArtworksPage() {
  return <CatalogueContent category="obras" />;
}
