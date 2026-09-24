"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import type { Domo } from "@/lib/data/domos";
import { formatearFechaCorta, formatearPesos } from "@/lib/formato";
import { TARIFA_MINIMA } from "@/lib/reservas/precios";
import { DomoCard } from "./DomoCard";

const MAXIMO = 3;

type Props = {
  domos: Domo[];
  /** Próximo fin de semana (viernes) libre por id de domo, o null */
  proximoFinDeSemana: Record<string, string | null>;
};

/**
 * Listado de los 6 domos con comparador: se eligen 2 o 3 y se ven lado a lado
 * (decisión de Angelo, 24 sep 2026).
 */
export function ComparadorDomos({ domos, proximoFinDeSemana }: Props) {
  const [elegidos, setElegidos] = useState<string[]>([]);
  const comparados = domos.filter((domo) => elegidos.includes(domo.id));

  const alternar = (id: string) =>
    setElegidos((actuales) =>
      actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id],
    );

  return (
    <>
      <p className="mb-6 text-marron">
        Marca &quot;Comparar&quot; en 2 o 3 domos para verlos lado a lado.
      </p>
      <div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domos.map((domo, i) => {
            const marcado = elegidos.includes(domo.id);
            return (
              <li key={domo.id} className="flex">
                <DomoCard
                  domo={domo}
                  prioridad={i < 3}
                  accion={
                    <Checkbox
                      name={`comparar-${domo.slug}`}
                      etiqueta="Comparar"
                      checked={marcado}
                      disabled={!marcado && elegidos.length >= MAXIMO}
                      onChange={() => alternar(domo.id)}
                    />
                  }
                />
              </li>
            );
          })}
        </ul>
        {comparados.length >= 2 && (
          <div className="sticky bottom-4 z-20 mt-8 flex justify-center">
            <Link
              href="#comparacion"
              className="rounded-boton bg-bosque px-6 py-3 text-boton text-blanco shadow-sutil hover:bg-bosque-profundo"
            >
              Ver comparación ({comparados.length})
            </Link>
          </div>
        )}
      </div>

      {comparados.length >= 2 && (
        <section
          id="comparacion"
          aria-labelledby="titulo-comparacion"
          className="mt-16 scroll-mt-24"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id="titulo-comparacion" className="text-h2 text-bosque">
              Comparación
            </h2>
            <button
              type="button"
              onClick={() => setElegidos([])}
              className="inline-flex items-center gap-1 text-pequeno text-marron underline underline-offset-4 hover:text-carbon"
            >
              <X {...ICONO} />
              Limpiar
            </button>
          </div>
          <div className="-mx-5 overflow-x-auto px-5 pb-2">
            <table className="w-full min-w-[640px] table-fixed border-separate border-spacing-0 text-left">
              <caption className="sr-only">Comparación de domos elegidos</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-36 p-3 align-bottom text-pequeno font-medium text-marron"
                  >
                    <span className="sr-only">Característica</span>
                  </th>
                  {comparados.map((domo) => (
                    <th key={domo.id} scope="col" className="p-3 align-bottom">
                      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-input bg-arena">
                        <Foto src={domo.fotos[0]} alt={domo.nombre} sizes="300px" />
                      </div>
                      <span className="text-h3 text-bosque">{domo.nombre}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                <Fila titulo="Capacidad">
                  {comparados.map((domo) => (
                    <td key={domo.id} className="border-t border-borde p-3">
                      Hasta {domo.capacidad} personas
                    </td>
                  ))}
                </Fila>
                <Fila titulo="En pocas palabras">
                  {comparados.map((domo) => (
                    <td key={domo.id} className="border-t border-borde p-3 text-marron">
                      {domo.descripcionCorta}
                    </td>
                  ))}
                </Fila>
                <Fila titulo="Precio por noche">
                  {comparados.map((domo) => (
                    <td key={domo.id} className="border-t border-borde p-3">
                      Desde <strong>{formatearPesos(TARIFA_MINIMA)}</strong>
                    </td>
                  ))}
                </Fila>
                <Fila titulo="Próximo fin de semana libre">
                  {comparados.map((domo) => {
                    const viernes = proximoFinDeSemana[domo.id];
                    return (
                      <td key={domo.id} className="border-t border-borde p-3">
                        {viernes
                          ? `Desde el ${formatearFechaCorta(viernes)}`
                          : "Sin fines de semana libres"}
                      </td>
                    );
                  })}
                </Fila>
                <tr>
                  <td />
                  {comparados.map((domo) => (
                    <td key={domo.id} className="border-t border-borde p-3">
                      <ButtonLink
                        href={`/domos/${domo.slug}`}
                        variante="secundario"
                        className="w-full"
                      >
                        Ver {domo.nombre}
                      </ButtonLink>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}

function Fila({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <tr>
      <th scope="row" className="border-t border-borde p-3 text-pequeno font-medium text-marron">
        {titulo}
      </th>
      {children}
    </tr>
  );
}
