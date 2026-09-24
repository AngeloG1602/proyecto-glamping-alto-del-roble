import { BadgeCheck } from "lucide-react";
import { ICONO } from "@/components/ui/icono";
import { NEGOCIO } from "@/lib/data/negocio";

/** Sello RNT en miniatura (F1-06 §3: señal de confianza above the fold) */
export function SelloConfianza({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-boton border border-borde bg-blanco px-3 py-1.5 text-pequeno text-marron ${className}`}
    >
      <BadgeCheck {...ICONO} className="text-bosque" />
      Registro Nacional de Turismo {NEGOCIO.rnt}
    </p>
  );
}
