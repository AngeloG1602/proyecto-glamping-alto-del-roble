import { getDay, parseISO } from "date-fns";
import { EXTRAS, type Extra } from "@/lib/data/domos";
import { esFestivo } from "./festivos";
import { nochesDeEstadia, sumarDias, type FechaISO } from "./fechas";

/** F2-01 regla 4 — precio por noche según el tipo de fecha. Iguales para los 6 domos. */
export const TARIFAS = {
  entreSemana: 480_000,
  finDeSemana: 650_000,
  festivo: 780_000,
} as const;

export type TipoNoche = keyof typeof TARIFAS;

export const NOMBRE_TIPO_NOCHE: Record<TipoNoche, string> = {
  entreSemana: "Entre semana",
  finDeSemana: "Fin de semana",
  festivo: "Víspera de festivo",
};

export const TARIFA_MINIMA = Math.min(...Object.values(TARIFAS));

/**
 * Tipo de una noche, identificada por su fecha de entrada.
 * - Festivo: la noche que termina en un festivo (p. ej. el domingo de un puente).
 * - Fin de semana: noches de viernes y sábado.
 * - Entre semana: domingo a jueves.
 * Festivo tiene prioridad sobre fin de semana. Decisión de Angelo, 24 sep 2026.
 */
export function tipoDeNoche(fechaISO: FechaISO): TipoNoche {
  if (esFestivo(sumarDias(fechaISO, 1))) return "festivo";
  const diaSemana = getDay(parseISO(fechaISO));
  if (diaSemana === 5 || diaSemana === 6) return "finDeSemana";
  return "entreSemana";
}

export function precioDeNoche(fechaISO: FechaISO): number {
  return TARIFAS[tipoDeNoche(fechaISO)];
}

export type NochePrecio = { fecha: FechaISO; tipo: TipoNoche; precio: number };

export type Cotizacion = {
  noches: NochePrecio[];
  subtotalNoches: number;
  extras: Extra[];
  subtotalExtras: number;
  total: number;
};

/** F2-01 reglas 4 y 5 — total = noches + extras opcionales */
export function cotizar(entrada: FechaISO, salida: FechaISO, extrasIds: string[] = []): Cotizacion {
  const noches = nochesDeEstadia(entrada, salida).map((fecha) => ({
    fecha,
    tipo: tipoDeNoche(fecha),
    precio: precioDeNoche(fecha),
  }));
  const extras = EXTRAS.filter((extra) => extrasIds.includes(extra.id));
  const subtotalNoches = noches.reduce((suma, noche) => suma + noche.precio, 0);
  const subtotalExtras = extras.reduce((suma, extra) => suma + extra.precio, 0);
  return {
    noches,
    subtotalNoches,
    extras,
    subtotalExtras,
    total: subtotalNoches + subtotalExtras,
  };
}

/** Agrupa las noches por tipo para mostrar "2 noches × $650.000" */
export function agruparNoches(noches: NochePrecio[]) {
  const grupos = new Map<TipoNoche, { tipo: TipoNoche; cantidad: number; precio: number }>();
  for (const noche of noches) {
    const grupo = grupos.get(noche.tipo);
    if (grupo) grupo.cantidad += 1;
    else grupos.set(noche.tipo, { tipo: noche.tipo, cantidad: 1, precio: noche.precio });
  }
  return [...grupos.values()];
}
