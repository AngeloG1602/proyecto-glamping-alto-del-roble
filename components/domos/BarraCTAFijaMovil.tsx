"use client";

import { PesosAnimados } from "@/components/efectos/NumeroAnimado";
import { ButtonLink } from "@/components/ui/Button";
import { formatearPesos, pluralizar } from "@/lib/formato";
import { contarNoches } from "@/lib/reservas/fechas";
import { cotizar, TARIFA_MINIMA } from "@/lib/reservas/precios";
import { urlReservar, useSeleccionFechas } from "./SeleccionFechas";

/** F2-01 §4 · Barra inferior fija en móvil con precio + Reservar (F1-06 §3 y §5) */
export function BarraCTAFijaMovil({ slug }: { slug: string }) {
  const { rango } = useSeleccionFechas();
  const conFechas = rango.entrada && rango.salida;

  return (
    <div
      data-barra-cta-fija
      className="fixed inset-x-0 bottom-0 z-30 animate-entrada border-t border-borde bg-hueso/90 px-5 py-3 shadow-[0_-10px_30px_-20px_rgb(43_38_33/0.5)] backdrop-blur-md [animation-delay:500ms] md:hidden"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-pequeno text-marron">
          {conFechas ? (
            <>
              {pluralizar(contarNoches(rango.entrada!, rango.salida!), "noche", "noches")}
              <span className="block text-cuerpo font-semibold text-carbon">
                <PesosAnimados valor={cotizar(rango.entrada!, rango.salida!).total} />
              </span>
            </>
          ) : (
            <>
              Desde
              <span className="block text-cuerpo font-semibold text-carbon">
                {formatearPesos(TARIFA_MINIMA)}
              </span>
              por noche
            </>
          )}
        </p>
        <ButtonLink id="cta-fijo-movil" href={urlReservar(slug, rango)} className="flex-1">
          Reservar
        </ButtonLink>
      </div>
    </div>
  );
}
