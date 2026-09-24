import { addDays, getDay } from "date-fns";
import { aISO, type FechaISO } from "./fechas";

/**
 * Festivos oficiales de Colombia (Ley 51 de 1983, "Ley Emiliani").
 * Se calculan por año para no depender de una lista que haya que actualizar a mano.
 */

/** Domingo de Pascua — algoritmo anónimo gregoriano (Meeus/Jones/Butcher) */
function domingoDePascua(anio: number): Date {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(anio, mes - 1, dia);
}

/** Traslada la fecha al lunes siguiente, salvo que ya sea lunes */
function alLunesSiguiente(fecha: Date): Date {
  const diaSemana = getDay(fecha); // 0 domingo … 6 sábado
  const diasHastaLunes = (8 - diaSemana) % 7;
  return addDays(fecha, diasHastaLunes);
}

const cache = new Map<number, Set<FechaISO>>();

export function festivosDelAnio(anio: number): Set<FechaISO> {
  const guardado = cache.get(anio);
  if (guardado) return guardado;

  const fecha = (mes: number, dia: number) => new Date(anio, mes - 1, dia);
  const pascua = domingoDePascua(anio);

  const fijos = [
    fecha(1, 1), // Año Nuevo
    fecha(5, 1), // Día del Trabajo
    fecha(7, 20), // Independencia
    fecha(8, 7), // Batalla de Boyacá
    fecha(12, 8), // Inmaculada Concepción
    fecha(12, 25), // Navidad
    addDays(pascua, -3), // Jueves Santo
    addDays(pascua, -2), // Viernes Santo
  ];

  const trasladables = [
    fecha(1, 6), // Reyes Magos
    fecha(3, 19), // San José
    fecha(6, 29), // San Pedro y San Pablo
    fecha(8, 15), // Asunción de la Virgen
    fecha(10, 12), // Día de la Raza
    fecha(11, 1), // Todos los Santos
    fecha(11, 11), // Independencia de Cartagena
    addDays(pascua, 39), // Ascensión del Señor
    addDays(pascua, 60), // Corpus Christi
    addDays(pascua, 68), // Sagrado Corazón
  ].map(alLunesSiguiente);

  const festivos = new Set([...fijos, ...trasladables].map(aISO));
  cache.set(anio, festivos);
  return festivos;
}

export function esFestivo(fechaISO: FechaISO): boolean {
  return festivosDelAnio(Number(fechaISO.slice(0, 4))).has(fechaISO);
}
