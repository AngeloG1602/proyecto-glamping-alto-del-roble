import { getDay, parseISO } from "date-fns";
import { BLOQUEOS_MANUALES, RESERVAS_CONFIRMADAS } from "@/lib/data/disponibilidad";
import { contarNoches, hoyISO, nochesDeEstadia, sumarDias, type FechaISO } from "./fechas";

/** Estancia mínima: 1 noche, sin excepciones (decisión de Angelo, 24 sep 2026) */
export const NOCHES_MINIMAS = 1;

/**
 * Noches no seleccionables de un domo: reservas confirmadas + bloqueos manuales
 * (F2-01 reglas 2 y 3). En la etapa local salen de datos de ejemplo; con base de datos
 * será una consulta sobre `Reserva` (estadoPago = confirmada) y `BloqueoManual`.
 */
export function nochesOcupadas(domoId: string): Set<FechaISO> {
  const rangos = [...RESERVAS_CONFIRMADAS, ...BLOQUEOS_MANUALES].filter(
    (rango) => rango.domoId === domoId,
  );
  return new Set(rangos.flatMap((rango) => nochesDeEstadia(rango.fechaInicio, rango.fechaFin)));
}

export type ResultadoDisponibilidad = { disponible: true } | { disponible: false; motivo: string };

/** F2-01 reglas 1 y 3 + fechas no en el pasado (F2-01 §6) */
export function verificarDisponibilidad(
  domoId: string,
  entrada: FechaISO,
  salida: FechaISO,
  hoy: FechaISO = hoyISO(),
): ResultadoDisponibilidad {
  if (entrada < hoy) {
    return { disponible: false, motivo: "La fecha de llegada no puede estar en el pasado." };
  }
  if (contarNoches(entrada, salida) < NOCHES_MINIMAS) {
    return { disponible: false, motivo: "La salida debe ser después de la llegada." };
  }
  const ocupadas = nochesOcupadas(domoId);
  if (nochesDeEstadia(entrada, salida).some((noche) => ocupadas.has(noche))) {
    return {
      disponible: false,
      motivo: "Alguna de esas noches ya está reservada. Elige otras fechas.",
    };
  }
  return { disponible: true };
}

/** Primer viernes (desde hoy) con las noches de viernes y sábado libres */
export function proximoFinDeSemanaLibre(
  domoId: string,
  desde: FechaISO = hoyISO(),
  limiteSemanas = 26,
): FechaISO | null {
  const ocupadas = nochesOcupadas(domoId);
  const diasHastaViernes = (5 - getDay(parseISO(desde)) + 7) % 7;
  let viernes = sumarDias(desde, diasHastaViernes);
  for (let semana = 0; semana < limiteSemanas; semana++) {
    if (!ocupadas.has(viernes) && !ocupadas.has(sumarDias(viernes, 1))) return viernes;
    viernes = sumarDias(viernes, 7);
  }
  return null;
}
