"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ICONO } from "@/components/ui/icono";
import { formatearPesos } from "@/lib/formato";
import { aISO, hoyISO, nochesDeEstadia, type FechaISO } from "@/lib/reservas/fechas";
import { NOMBRE_TIPO_NOCHE, precioDeNoche, tipoDeNoche } from "@/lib/reservas/precios";

export type RangoFechas = { entrada: FechaISO | null; salida: FechaISO | null };

type Props = {
  /** Noches no seleccionables (reservas confirmadas + bloqueos manuales) */
  ocupadas: FechaISO[];
  rango: RangoFechas;
  onCambiar: (rango: RangoFechas) => void;
  /** Meses visibles a la vez en pantallas anchas */
  meses?: 1 | 2;
};

const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];
const MESES_ADELANTE = 12;

/**
 * F2-01 §4 · CalendarioDisponibilidad (custom).
 * Cada día representa la noche que empieza ese día. Las noches ocupadas no se pueden
 * elegir como llegada (F2-01 regla 3), pero sí como día de salida: esa mañana el domo
 * se libera para el siguiente huésped.
 */
export function CalendarioDisponibilidad({ ocupadas, rango, onCambiar, meses = 1 }: Props) {
  const hoy = hoyISO();
  const primerMes = startOfMonth(parseISO(hoy));
  const [mesVisible, setMesVisible] = useState(() => startOfMonth(parseISO(rango.entrada ?? hoy)));
  const [aviso, setAviso] = useState<string | null>(null);
  const ocupadasSet = useMemo(() => new Set(ocupadas), [ocupadas]);

  const nocheLibre = (fecha: FechaISO) => fecha >= hoy && !ocupadasSet.has(fecha);
  const rangoLibre = (entrada: FechaISO, salida: FechaISO) =>
    nochesDeEstadia(entrada, salida).every((noche) => !ocupadasSet.has(noche));

  const eligiendoSalida = rango.entrada !== null && rango.salida === null;

  const esSeleccionable = (fecha: FechaISO) => {
    if (nocheLibre(fecha)) return true;
    return eligiendoSalida && fecha > rango.entrada! && rangoLibre(rango.entrada!, fecha);
  };

  const alElegir = (fecha: FechaISO) => {
    setAviso(null);
    if (!eligiendoSalida || fecha <= rango.entrada!) {
      onCambiar({ entrada: fecha, salida: null });
      return;
    }
    if (rangoLibre(rango.entrada!, fecha)) {
      onCambiar({ entrada: rango.entrada, salida: fecha });
      return;
    }
    setAviso("Entre esas fechas hay noches ya reservadas. Empezamos de nuevo desde este día.");
    onCambiar({ entrada: fecha, salida: null });
  };

  const puedeRetroceder = mesVisible > primerMes;
  const puedeAvanzar = mesVisible < addMonths(primerMes, MESES_ADELANTE - meses);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMesVisible((mes) => addMonths(mes, -1))}
          disabled={!puedeRetroceder}
          aria-label="Mes anterior"
          className="rounded-boton p-2 text-bosque hover:bg-arena disabled:opacity-30"
        >
          <ChevronLeft {...ICONO} />
        </button>
        <p className="text-pequeno text-marron" aria-live="polite">
          {rango.entrada && !rango.salida
            ? "Ahora elige el día de salida"
            : "Elige el día de llegada"}
        </p>
        <button
          type="button"
          onClick={() => setMesVisible((mes) => addMonths(mes, 1))}
          disabled={!puedeAvanzar}
          aria-label="Mes siguiente"
          className="rounded-boton p-2 text-bosque hover:bg-arena disabled:opacity-30"
        >
          <ChevronRight {...ICONO} />
        </button>
      </div>

      <div className={`grid gap-8 ${meses === 2 ? "lg:grid-cols-2" : ""}`}>
        {Array.from({ length: meses }, (_, i) => (
          <Mes
            key={i}
            mes={addMonths(mesVisible, i)}
            oculto={i > 0}
            hoy={hoy}
            rango={rango}
            ocupadas={ocupadasSet}
            esSeleccionable={esSeleccionable}
            onElegir={alElegir}
          />
        ))}
      </div>

      {aviso && (
        <p role="status" className="mt-4 text-pequeno font-medium text-error">
          {aviso}
        </p>
      )}

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-pequeno text-marron">
        <li className="flex items-center gap-2">
          <span className="size-4 rounded-[4px] border border-borde bg-blanco" /> Disponible
        </li>
        <li className="flex items-center gap-2">
          <span className="size-4 rounded-[4px] bg-borde/60" /> Ocupado
        </li>
        <li className="flex items-center gap-2">
          <span className="size-4 rounded-[4px] bg-bosque" /> Tu estadía
        </li>
        <li>Precio por noche en miles de pesos</li>
      </ul>
    </div>
  );
}

type PropsMes = {
  mes: Date;
  oculto: boolean;
  hoy: FechaISO;
  rango: RangoFechas;
  ocupadas: Set<FechaISO>;
  esSeleccionable: (fecha: FechaISO) => boolean;
  onElegir: (fecha: FechaISO) => void;
};

function Mes({ mes, oculto, hoy, rango, ocupadas, esSeleccionable, onElegir }: PropsMes) {
  const dias = eachDayOfInterval({
    start: startOfWeek(startOfMonth(mes), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(mes), { weekStartsOn: 1 }),
  });
  const titulo = format(mes, "MMMM yyyy", { locale: es });

  return (
    <div className={oculto ? "hidden lg:block" : undefined}>
      <h3 className="mb-3 text-center font-cuerpo text-cuerpo font-semibold capitalize">
        {titulo}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {DIAS_SEMANA.map((dia, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="pb-1 text-center text-pequeno font-medium text-marron"
          >
            {dia}
          </div>
        ))}
        {dias.map((dia) => {
          if (!isSameMonth(dia, mes)) return <div key={dia.toISOString()} />;
          const fecha = aISO(dia);
          return (
            <Dia
              key={fecha}
              fecha={fecha}
              pasado={fecha < hoy}
              ocupado={ocupadas.has(fecha)}
              seleccionable={esSeleccionable(fecha)}
              rango={rango}
              onElegir={onElegir}
            />
          );
        })}
      </div>
    </div>
  );
}

type PropsDia = {
  fecha: FechaISO;
  pasado: boolean;
  ocupado: boolean;
  seleccionable: boolean;
  rango: RangoFechas;
  onElegir: (fecha: FechaISO) => void;
};

function Dia({ fecha, pasado, ocupado, seleccionable, rango, onElegir }: PropsDia) {
  const esExtremo = fecha === rango.entrada || fecha === rango.salida;
  const enRango =
    rango.entrada !== null &&
    rango.salida !== null &&
    fecha > rango.entrada &&
    fecha < rango.salida;
  const muestraPrecio = !pasado && !ocupado;
  const precio = precioDeNoche(fecha);

  let estilo = "bg-blanco border border-borde text-carbon hover:border-bosque";
  if (pasado) estilo = "text-marron/40";
  else if (ocupado) estilo = "bg-borde/60 text-marron/70 line-through";
  if (enRango) estilo = "bg-arena border border-arena text-carbon";
  if (esExtremo) estilo = "bg-bosque border border-bosque text-blanco";

  const descripcion = [
    format(parseISO(fecha), "EEEE d 'de' MMMM", { locale: es }),
    pasado ? "fecha pasada" : ocupado ? "noche ocupada" : null,
    muestraPrecio ? `${NOMBRE_TIPO_NOCHE[tipoDeNoche(fecha)]} ${formatearPesos(precio)}` : null,
    fecha === rango.entrada ? "llegada" : fecha === rango.salida ? "salida" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <button
        type="button"
        disabled={!seleccionable}
        onClick={() => onElegir(fecha)}
        aria-label={descripcion}
        aria-pressed={esExtremo}
        className={`flex h-12 w-full flex-col items-center justify-center rounded-input leading-none transition-colors disabled:cursor-not-allowed md:h-14 ${estilo}`}
      >
        <span className="text-[15px] font-medium">{Number(fecha.slice(8))}</span>
        {muestraPrecio && (
          <span className={`mt-1 text-[10px] ${esExtremo ? "text-blanco" : "text-marron"}`}>
            {precio / 1000}
          </span>
        )}
      </button>
    </div>
  );
}
