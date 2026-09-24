import type { Metadata } from "next";
import { Comprobante } from "@/components/reserva/Comprobante";

export const metadata: Metadata = {
  title: "Reserva confirmada",
  robots: { index: false },
};

export default function Confirmacion() {
  return <Comprobante />;
}
