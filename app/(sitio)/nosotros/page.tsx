import type { Metadata } from "next";
import { BadgeCheck, CalendarDays, PawPrint } from "lucide-react";
import { CierreVerDomos } from "@/components/layout/CierreVerDomos";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import { FOTO_PAISAJE } from "@/lib/data/domos";
import { NEGOCIO, NOSOTROS } from "@/lib/data/negocio";
import { retraso } from "@/lib/efectos";

export const metadata: Metadata = {
  title: "Nosotros — Andrés y Mariana, Glamping Alto del Roble",
  description: `Somos Andrés y Mariana. Llevamos ${NEGOCIO.anosOperando} años recibiendo huéspedes en Guatavita, con Registro Nacional de Turismo ${NEGOCIO.rnt}.`,
};

/** /nosotros: responde la objeción #1 "¿cómo sé que es real?" (F1-05 §4, F1-06 §7) */
export default function Nosotros() {
  const datos = [
    {
      icono: BadgeCheck,
      titulo: `RNT ${NEGOCIO.rnt}`,
      texto: "Registro Nacional de Turismo vigente",
    },
    {
      icono: CalendarDays,
      titulo: `${NEGOCIO.anosOperando} años operando`,
      texto: "Recibiendo huéspedes en Guatavita",
    },
    { icono: PawPrint, titulo: "Mascotas bienvenidas", texto: "Sin costo adicional" },
  ];

  return (
    <>
      <EncabezadoPagina titulo="Somos Andrés y Mariana" />

      <div className="contenedor grid gap-8 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
        <div className="space-y-4">
          {NOSOTROS.historia.map((parrafo, i) => (
            <p key={parrafo.slice(0, 20)} data-revelar style={retraso(i, 120)}>
              {parrafo}
            </p>
          ))}
        </div>
        <div
          data-revelar="escala"
          className="relative aspect-[4/3] overflow-hidden rounded-tarjeta bg-arena shadow-sutil"
        >
          <Foto
            src={FOTO_PAISAJE}
            alt="Vista de la represa de Tominé desde Alto del Roble"
            sizes="(min-width: 768px) 50vw, 100vw"
            prioridad
          />
        </div>
      </div>

      <section className="contenedor pb-12 md:pb-16" aria-label="Datos del glamping">
        <ul className="grid gap-4 md:grid-cols-3">
          {datos.map(({ icono: Icono, titulo, texto }, i) => (
            <li
              data-revelar
              style={retraso(i, 120)}
              key={titulo}
              className="flex items-center gap-4 rounded-tarjeta border border-borde bg-blanco p-6"
            >
              <Icono {...ICONO} className="shrink-0 text-bosque" />
              <p>
                <span className="block font-semibold">{titulo}</span>
                <span className="text-pequeno text-marron">{texto}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CierreVerDomos titulo="Te esperamos en Guatavita" />
    </>
  );
}
