import { Check } from "lucide-react";

export const PASOS = ["Fechas", "Experiencias", "Tus datos", "Pago"] as const;

type Props = { actual: number; onIrA: (paso: number) => void };

/** Indicador de pasos. Solo se puede volver a pasos ya completados. */
export function PasosReserva({ actual, onIrA }: Props) {
  return (
    <nav aria-label="Pasos de la reserva">
      <ol className="flex items-center gap-2">
        {PASOS.map((nombre, i) => {
          const numero = i + 1;
          const completado = numero < actual;
          const esActual = numero === actual;
          return (
            <li key={nombre} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={!completado}
                onClick={() => onIrA(numero)}
                aria-current={esActual ? "step" : undefined}
                className="flex items-center gap-2 text-left disabled:cursor-default"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-pequeno font-semibold ${
                    esActual
                      ? "bg-bosque text-blanco"
                      : completado
                        ? "border border-bosque text-bosque"
                        : "border border-borde text-marron"
                  }`}
                >
                  {completado ? <Check size={16} strokeWidth={2} aria-hidden /> : numero}
                </span>
                <span
                  className={`hidden text-pequeno sm:inline ${esActual ? "font-semibold text-carbon" : "text-marron"} ${completado ? "underline underline-offset-2" : ""}`}
                >
                  {nombre}
                </span>
              </button>
              {numero < PASOS.length && <span aria-hidden className="h-px flex-1 bg-borde" />}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-pequeno text-marron sm:hidden">
        Paso {actual} de {PASOS.length}:{" "}
        <span className="font-semibold text-carbon">{PASOS[actual - 1]}</span>
      </p>
    </nav>
  );
}
