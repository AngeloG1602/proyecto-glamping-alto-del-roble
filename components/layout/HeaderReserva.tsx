import { ShieldCheck } from "lucide-react";
import { ICONO } from "@/components/ui/icono";
import { Logo } from "./Logo";

/** Header del flujo de reserva: sin menú que distraiga (F1-06 §2) */
export function HeaderReserva() {
  return (
    <header className="bg-bosque text-blanco">
      <div className="contenedor flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />
        <p className="hidden items-center gap-2 text-pequeno sm:flex">
          <ShieldCheck {...ICONO} />
          Reserva directa, sin intermediarios
        </p>
      </div>
    </header>
  );
}
