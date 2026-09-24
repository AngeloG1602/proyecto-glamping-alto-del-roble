import { PawPrint, Users } from "lucide-react";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import type { Domo } from "@/lib/data/domos";
import { formatearFechaCorta, pluralizar } from "@/lib/formato";
import { contarNoches } from "@/lib/reservas/fechas";
import type { Cotizacion } from "@/lib/reservas/precios";
import { DesglosePrecio } from "./DesglosePrecio";

type Props = {
  domo: Domo | undefined;
  entrada: string | null;
  salida: string | null;
  cotizacion: Cotizacion | null;
  huespedes?: number;
  mascota?: boolean;
};

/** F2-01 §4 · ResumenReserva: domo, fechas, desglose y total */
export function ResumenReserva({ domo, entrada, salida, cotizacion, huespedes, mascota }: Props) {
  return (
    <div className="rounded-tarjeta border border-borde bg-blanco p-6">
      <h2 className="text-h3 text-bosque">Tu reserva</h2>
      {!domo ? (
        <p className="mt-4 text-pequeno text-marron">
          Elige un domo y tus fechas para ver el total.
        </p>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-input bg-arena">
              <Foto src={domo.fotos[0]} alt="" sizes="64px" />
            </div>
            <div>
              <p className="font-semibold">{domo.nombre}</p>
              {entrada && salida ? (
                <p className="text-pequeno text-marron">
                  {formatearFechaCorta(entrada)} → {formatearFechaCorta(salida)} ·{" "}
                  {pluralizar(contarNoches(entrada, salida), "noche", "noches")}
                </p>
              ) : (
                <p className="text-pequeno text-marron">Fechas por elegir</p>
              )}
            </div>
          </div>
          {(huespedes || mascota !== undefined) && (
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-pequeno text-marron">
              {huespedes && (
                <span className="inline-flex items-center gap-1">
                  <Users {...ICONO} /> {pluralizar(huespedes, "huésped", "huéspedes")}
                </span>
              )}
              {mascota && (
                <span className="inline-flex items-center gap-1">
                  <PawPrint {...ICONO} /> Con mascota
                </span>
              )}
            </p>
          )}
          {cotizacion && (
            <div className="mt-6 border-t border-borde pt-4">
              <DesglosePrecio cotizacion={cotizacion} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
