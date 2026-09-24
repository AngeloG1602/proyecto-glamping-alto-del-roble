import { formatearPesos, pluralizar } from "@/lib/formato";
import { agruparNoches, NOMBRE_TIPO_NOCHE, type Cotizacion } from "@/lib/reservas/precios";

/** Desglose de la cotización: noches por tipo, extras y total */
export function DesglosePrecio({ cotizacion }: { cotizacion: Cotizacion }) {
  return (
    <dl className="space-y-2 text-pequeno">
      {agruparNoches(cotizacion.noches).map((grupo) => (
        <div key={grupo.tipo} className="flex justify-between gap-4">
          <dt className="text-marron">
            {pluralizar(grupo.cantidad, "noche", "noches")}{" "}
            {NOMBRE_TIPO_NOCHE[grupo.tipo].toLowerCase()} × {formatearPesos(grupo.precio)}
          </dt>
          <dd>{formatearPesos(grupo.cantidad * grupo.precio)}</dd>
        </div>
      ))}
      {cotizacion.extras.map((extra) => (
        <div key={extra.id} className="flex justify-between gap-4">
          <dt className="text-marron">{extra.nombre}</dt>
          <dd>{formatearPesos(extra.precio)}</dd>
        </div>
      ))}
      <div className="flex items-baseline justify-between gap-4 border-t border-borde pt-3">
        <dt className="font-semibold text-carbon">Total</dt>
        <dd className="text-h3 font-cuerpo text-carbon">{formatearPesos(cotizacion.total)}</dd>
      </div>
    </dl>
  );
}
