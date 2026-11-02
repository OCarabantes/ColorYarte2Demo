import type { Metadata } from "next";
import { WorkshopsContent } from "@/components/workshops-content";

export const metadata: Metadata = { title: "Talleres Presenciales | Color & Arte", description: "Encuentra tu próxima pausa creativa: repujado, Miyuki y pintura en familia. Consulta fechas, cupos y reserva por WhatsApp." };

export default function WorkshopsPage() {
  return <WorkshopsContent />;
}
