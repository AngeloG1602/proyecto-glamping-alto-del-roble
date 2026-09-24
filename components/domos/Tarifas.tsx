import { formatearPesos } from "@/lib/formato";
import { NOMBRE_TIPO_NOCHE, TARIFAS, type TipoNoche } from "@/lib/reservas/precios";

const DETALLE: Record<TipoNoche, string> = {
  entreSemana: "Domingo a jueves",
  finDeSemana: "Viernes y sábado",
  festivo: "La noche antes de un festivo",
};

/** Las 3 tarifas por noche (F2-01 regla 4), visibles sin "consultar precio" (F1-06 §6) */
export function Tarifas() {
  return (
    <dl className="grid grid-cols-3 gap-2 text-center">
      {(Object.keys(TARIFAS) as TipoNoche[]).map((tipo) => (
        <div key={tipo} className="rounded-input border border-borde bg-blanco px-2 py-3">
          <dt className="text-pequeno font-medium">{NOMBRE_TIPO_NOCHE[tipo]}</dt>
          <dd className="mt-1 font-semibold">{formatearPesos(TARIFAS[tipo])}</dd>
          <dd className="mt-1 text-[12px] leading-tight text-marron">{DETALLE[tipo]}</dd>
        </div>
      ))}
    </dl>
  );
}
