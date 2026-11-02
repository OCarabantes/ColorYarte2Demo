import type { Metadata } from "next";
import { CatalogueContent } from "@/components/catalogue-content";

export const metadata: Metadata = {
  title: "Guías PDF | Color & Arte",
  description: "Explora guías digitales de manualidades, repujado y pintura para aprender paso a paso a tu propio ritmo.",
};

export default function GuidesPage() {
  return <CatalogueContent category="guias" />;
}
