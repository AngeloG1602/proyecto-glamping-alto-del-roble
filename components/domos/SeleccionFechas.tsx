"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { RangoFechas } from "./CalendarioDisponibilidad";

type ContextoSeleccion = { rango: RangoFechas; setRango: (rango: RangoFechas) => void };

const Contexto = createContext<ContextoSeleccion | null>(null);

/** Comparte las fechas elegidas en la ficha entre el calendario y los CTA de reservar */
export function SeleccionFechasProvider({ children }: { children: ReactNode }) {
  const [rango, setRango] = useState<RangoFechas>({ entrada: null, salida: null });
  return <Contexto.Provider value={{ rango, setRango }}>{children}</Contexto.Provider>;
}

export function useSeleccionFechas() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("useSeleccionFechas requiere SeleccionFechasProvider");
  return contexto;
}

export function urlReservar(slug: string, rango: RangoFechas) {
  const parametros = new URLSearchParams({ domo: slug });
  if (rango.entrada) parametros.set("entrada", rango.entrada);
  if (rango.entrada && rango.salida) parametros.set("salida", rango.salida);
  return `/reservar?${parametros.toString()}`;
}
