import { verificarDisponibilidad } from "./disponibilidad";
import type { FechaISO } from "./fechas";
import { cotizar } from "./precios";
import type { DatosHuesped } from "./validacion";

/**
 * ⚠️ PAGO SIMULADO — etapa local, sin Wompi.
 *
 * Con backend real (R7) esto se reemplaza por: crear la transacción en Wompi → esperar el
 * webhook → insertar la Reserva con estadoPago = "confirmada", donde la restricción de
 * exclusión de PostgreSQL rechaza cualquier traslape (F2-02 §6). Si el pago falla no queda
 * ninguna reserva (F2-01 regla 10).
 */

export type SolicitudReserva = {
  domoId: string;
  entrada: FechaISO;
  salida: FechaISO;
  extrasIds: string[];
  huesped: DatosHuesped;
};

export type ReservaConfirmada = Omit<SolicitudReserva, "huesped"> & {
  codigo: string;
  huesped: Omit<DatosHuesped, "consentimiento" | "sitioWeb">;
  precioTotal: number;
  confirmadaEn: string;
};

export type ResultadoPago =
  { exito: true; reserva: ReservaConfirmada } | { exito: false; mensaje: string };

const ESPERA_SIMULADA_MS = 1500;

function generarCodigo(): string {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const aleatorio = Array.from(
    { length: 6 },
    () => caracteres[Math.floor(Math.random() * caracteres.length)],
  );
  return `AR-${aleatorio.join("")}`;
}

export async function pagarReservaSimulada(solicitud: SolicitudReserva): Promise<ResultadoPago> {
  await new Promise((resolver) => setTimeout(resolver, ESPERA_SIMULADA_MS));

  // Se vuelve a verificar justo antes de "confirmar" (en producción lo garantiza la BD)
  const disponibilidad = verificarDisponibilidad(
    solicitud.domoId,
    solicitud.entrada,
    solicitud.salida,
  );
  if (!disponibilidad.disponible) return { exito: false, mensaje: disponibilidad.motivo };

  // Solo se guarda lo que F2-02 define para Reserva: el consentimiento y el honeypot no
  // son datos de la reserva.
  const { nombre, correo, celular, numHuespedes, mascota, notas } = solicitud.huesped;
  const huesped = { nombre, correo, celular, numHuespedes, mascota, notas };
  return {
    exito: true,
    reserva: {
      ...solicitud,
      huesped,
      codigo: generarCodigo(),
      precioTotal: cotizar(solicitud.entrada, solicitud.salida, solicitud.extrasIds).total,
      confirmadaEn: new Date().toISOString(),
    },
  };
}
