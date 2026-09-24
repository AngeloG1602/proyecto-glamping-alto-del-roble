import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/** 480000 → "$480.000". Sin Intl para que servidor y navegador den el mismo texto. */
export function formatearPesos(valor: number): string {
  const signo = valor < 0 ? "-" : "";
  const miles = Math.abs(Math.round(valor))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${signo}$${miles}`;
}

/** "2026-10-09" → "vie 9 oct" */
export function formatearFechaCorta(fechaISO: string): string {
  return format(parseISO(fechaISO), "EEE d MMM", { locale: es });
}

/** "2026-10-09" → "viernes 9 de octubre de 2026" */
export function formatearFechaLarga(fechaISO: string): string {
  return format(parseISO(fechaISO), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
}

export function pluralizar(cantidad: number, singular: string, plural: string): string {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`;
}
