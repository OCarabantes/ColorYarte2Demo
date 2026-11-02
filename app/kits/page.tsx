import type { Metadata } from "next";
import { CatalogueContent } from "@/components/catalogue-content";

export const metadata: Metadata = {
  title: "Kits DIY Familiares | Color & Arte",
  description: "Kits creativos con materiales e instrucciones para disfrutar una tarde de manualidades en casa y en familia.",
};

export default function KitsPage() {
  return <CatalogueContent category="kits" />;
}
