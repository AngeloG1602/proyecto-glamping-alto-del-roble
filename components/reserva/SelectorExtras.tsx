"use client";

import { Check } from "lucide-react";
import { Foto } from "@/components/ui/Foto";
import { EXTRAS, FOTOS_EXTRAS } from "@/lib/data/domos";
import { formatearPesos } from "@/lib/formato";

type Props = { elegidos: string[]; onCambiar: (ids: string[]) => void };

/** F2-01 §4 · SelectorExtras: los 3 extras, opcionales (F2-01 regla 5) */
export function SelectorExtras({ elegidos, onCambiar }: Props) {
  const alternar = (id: string) =>
    onCambiar(elegidos.includes(id) ? elegidos.filter((e) => e !== id) : [...elegidos, id]);

  return (
    <fieldset>
      <legend className="sr-only">Experiencias opcionales</legend>
      <ul className="space-y-4">
        {EXTRAS.map((extra) => {
          const marcado = elegidos.includes(extra.id);
          return (
            <li key={extra.id}>
              <label
                className={`flex cursor-pointer gap-4 rounded-tarjeta border bg-blanco p-3 transition-colors md:p-4 ${
                  marcado ? "border-bosque shadow-foco" : "border-borde hover:border-bosque"
                }`}
              >
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(extra.id)}
                  className="peer sr-only"
                />
                <div className="relative size-20 shrink-0 overflow-hidden rounded-input bg-arena md:size-28">
                  <Foto src={FOTOS_EXTRAS[extra.id]} alt="" sizes="112px" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-titulo text-[18px] font-semibold text-bosque md:text-[20px]">
                      {extra.nombre}
                    </p>
                    <span
                      aria-hidden
                      className={`flex size-6 shrink-0 items-center justify-center rounded-[4px] border ${
                        marcado ? "border-bosque bg-bosque text-blanco" : "border-borde bg-blanco"
                      }`}
                    >
                      {marcado && <Check size={16} strokeWidth={2.5} />}
                    </span>
                  </div>
                  <p className="font-semibold">+ {formatearPesos(extra.precio)}</p>
                  <p className="mt-1 hidden text-pequeno text-marron sm:block">
                    {extra.descripcion}
                  </p>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
