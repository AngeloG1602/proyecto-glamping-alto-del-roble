"use client";

import { ShieldCheck } from "lucide-react";
import { ICONO } from "@/components/ui/icono";
import { DesglosePrecio } from "@/components/reserva/DesglosePrecio";
import { formatearFechaCorta } from "@/lib/formato";
import { cotizar } from "@/lib/reservas/precios";
import { CalendarioDisponibilidad } from "./CalendarioDisponibilidad";
import { useSeleccionFechas } from "./SeleccionFechas";

/** Precio + disponibilidad en vivo en la ficha: única fuente de verdad (F1-02 §2) */
export function PanelDisponibilidad({ ocupadas }: { ocupadas: string[] }) {
  const { rango, setRango } = useSeleccionFechas();
  const cotizacion = rango.entrada && rango.salida ? cotizar(rango.entrada, rango.salida) : null;

  return (
    <div className="rounded-tarjeta border border-borde bg-blanco p-4 md:p-6">
      <CalendarioDisponibilidad ocupadas={ocupadas} rango={rango} onCambiar={setRango} />

      {cotizacion && rango.entrada && rango.salida && (
        <div className="mt-6 border-t border-borde pt-6">
          <p className="mb-4 font-medium">
            {formatearFechaCorta(rango.entrada)} → {formatearFechaCorta(rango.salida)}
          </p>
          <DesglosePrecio cotizacion={cotizacion} />
        </div>
      )}

      <p className="mt-6 flex gap-3 rounded-input bg-arena p-4 text-pequeno">
        <ShieldCheck {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
        <span>
          Este calendario es el mismo que usamos nosotros. Las noches ocupadas no se pueden elegir y
          tu domo queda bloqueado apenas se confirma el pago: nadie más puede reservar tus fechas.
        </span>
      </p>
    </div>
  );
}
