import type { ReservaConfirmada } from "./pago";

/**
 * Etapa local: la reserva "confirmada" viaja a /confirmacion por sessionStorage del
 * navegador. Con base de datos, /confirmacion la lee del servidor por su id.
 */
const CLAVE = "alto-del-roble:reserva-confirmada";

export function guardarReservaConfirmada(reserva: ReservaConfirmada) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(reserva));
  } catch {
    // Sin almacenamiento disponible (modo privado estricto): la pantalla de éxito lo indica
  }
}

export function leerReservaConfirmadaCruda(): string | null {
  try {
    return sessionStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

export function interpretarReserva(cruda: string | null): ReservaConfirmada | null {
  if (!cruda) return null;
  try {
    return JSON.parse(cruda) as ReservaConfirmada;
  } catch {
    return null;
  }
}
