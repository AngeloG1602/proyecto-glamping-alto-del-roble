/**
 * Fechas ocupadas de EJEMPLO para la etapa local (sin base de datos).
 *
 * Replican la forma de `Reserva` (solo las confirmadas, que son las que bloquean — F2-01
 * regla 2) y de `BloqueoManual` de docs/F2-02-arquitectura-datos.md §2.
 * Fechas en formato `yyyy-MM-dd`. `fechaFin` es el día de salida: esa noche NO queda ocupada.
 */

export type RangoOcupado = {
  domoId: string;
  fechaInicio: string;
  fechaFin: string;
};

export type BloqueoManual = RangoOcupado & { motivo: string };

const ROBLE = "248e3617-25da-4192-884a-b7d7231a95eb";
const ENCENILLO = "336c3279-e341-426c-a625-00fe26d3834c";
const ARRAYAN = "5c174c5e-3fee-46c1-97c9-d35648e11f22";
const FRAILEJON = "ac080640-fbae-4760-94a4-1047318d1657";
const SIETECUEROS = "316389bf-14e7-4ee0-a0bc-d5d2cb5e2b24";
const TOMINE = "e5c80c1f-820b-4600-bb6a-79fd470c6186";

export const RESERVAS_CONFIRMADAS: RangoOcupado[] = [
  { domoId: ROBLE, fechaInicio: "2026-09-25", fechaFin: "2026-09-27" },
  { domoId: ROBLE, fechaInicio: "2026-10-09", fechaFin: "2026-10-12" },
  { domoId: ROBLE, fechaInicio: "2026-10-23", fechaFin: "2026-10-25" },
  { domoId: ROBLE, fechaInicio: "2026-11-14", fechaFin: "2026-11-16" },
  { domoId: ENCENILLO, fechaInicio: "2026-10-02", fechaFin: "2026-10-04" },
  { domoId: ENCENILLO, fechaInicio: "2026-10-10", fechaFin: "2026-10-12" },
  { domoId: ENCENILLO, fechaInicio: "2026-10-31", fechaFin: "2026-11-02" },
  { domoId: ARRAYAN, fechaInicio: "2026-09-26", fechaFin: "2026-09-28" },
  { domoId: ARRAYAN, fechaInicio: "2026-10-16", fechaFin: "2026-10-18" },
  { domoId: ARRAYAN, fechaInicio: "2026-11-06", fechaFin: "2026-11-08" },
  { domoId: ARRAYAN, fechaInicio: "2026-12-05", fechaFin: "2026-12-08" },
  { domoId: FRAILEJON, fechaInicio: "2026-10-09", fechaFin: "2026-10-11" },
  { domoId: FRAILEJON, fechaInicio: "2026-11-13", fechaFin: "2026-11-16" },
  { domoId: SIETECUEROS, fechaInicio: "2026-09-25", fechaFin: "2026-09-26" },
  { domoId: SIETECUEROS, fechaInicio: "2026-10-30", fechaFin: "2026-11-02" },
  { domoId: SIETECUEROS, fechaInicio: "2026-12-24", fechaFin: "2026-12-26" },
  { domoId: TOMINE, fechaInicio: "2026-10-03", fechaFin: "2026-10-05" },
  { domoId: TOMINE, fechaInicio: "2026-10-17", fechaFin: "2026-10-19" },
  { domoId: TOMINE, fechaInicio: "2026-12-31", fechaFin: "2027-01-02" },
];

export const BLOQUEOS_MANUALES: BloqueoManual[] = [
  {
    domoId: ENCENILLO,
    fechaInicio: "2026-10-19",
    fechaFin: "2026-10-22",
    motivo: "Mantenimiento de la terraza",
  },
  {
    domoId: FRAILEJON,
    fechaInicio: "2026-11-23",
    fechaFin: "2026-11-26",
    motivo: "Cambio de lona",
  },
];
