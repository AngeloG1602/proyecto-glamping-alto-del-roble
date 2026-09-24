import { Check, Minus } from "lucide-react";
import { ICONO } from "@/components/ui/icono";
import { INCLUIDO, NO_INCLUIDO } from "@/lib/data/negocio";

/** F2-01 §4 · Responde la objeción #3 "¿Qué incluye?" (F1-05 §4) */
export function TablaIncluidoNoIncluido() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-tarjeta border border-borde bg-blanco p-6">
        <h3 className="text-h3 text-bosque">Incluido en tu noche</h3>
        <ul className="mt-4 space-y-3">
          {INCLUIDO.map((item) => (
            <li key={item} className="flex gap-3">
              <Check {...ICONO} className="mt-0.5 shrink-0 text-exito" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-tarjeta border border-borde bg-blanco p-6">
        <h3 className="text-h3 text-bosque">No incluido</h3>
        <ul className="mt-4 space-y-3 text-marron">
          {NO_INCLUIDO.map((item) => (
            <li key={item} className="flex gap-3">
              <Minus {...ICONO} className="mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
