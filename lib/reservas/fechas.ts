import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";

/** Todas las fechas del dominio viajan como texto `yyyy-MM-dd`, en hora local. */
export type FechaISO = string;

const PATRON_FECHA = /^\d{4}-\d{2}-\d{2}$/;

export function aISO(fecha: Date): FechaISO {
  return format(fecha, "yyyy-MM-dd");
}

export function hoyISO(): FechaISO {
  return aISO(new Date());
}

export function sumarDias(fechaISO: FechaISO, dias: number): FechaISO {
  return aISO(addDays(parseISO(fechaISO), dias));
}

export function esFechaISOValida(valor: unknown): valor is FechaISO {
  return typeof valor === "string" && PATRON_FECHA.test(valor) && !isNaN(parseISO(valor).getTime());
}

/** Número de noches entre la entrada y la salida */
export function contarNoches(entrada: FechaISO, salida: FechaISO): number {
  return differenceInCalendarDays(parseISO(salida), parseISO(entrada));
}

/** Noches de una estadía: desde la entrada hasta el día anterior a la salida */
export function nochesDeEstadia(entrada: FechaISO, salida: FechaISO): FechaISO[] {
  const total = contarNoches(entrada, salida);
  return Array.from({ length: Math.max(total, 0) }, (_, i) => sumarDias(entrada, i));
}
