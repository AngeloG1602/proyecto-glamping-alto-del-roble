import type { Metadata } from "next";
import { ComparadorDomos } from "@/components/domos/ComparadorDomos";
import { DOMOS } from "@/lib/data/domos";
import { proximoFinDeSemanaLibre } from "@/lib/reservas/disponibilidad";

export const metadata: Metadata = {
  title: "Los 6 domos — glamping en Guatavita con vista a la represa",
  description:
    "Compara los 6 domos de Alto del Roble: capacidad, lo que tiene cada uno y el próximo fin de semana libre. Disponibilidad real, sin dobles reservas.",
};

export default function Domos() {
  const proximoFinDeSemana = Object.fromEntries(
    DOMOS.map((domo) => [domo.id, proximoFinDeSemanaLibre(domo.id)]),
  );

  return (
    <div className="contenedor py-12 md:py-16">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-h1 text-bosque">Los 6 domos</h1>
        <p className="mt-4 text-marron">
          Todos miran a la represa y tienen la misma tarifa. Cambia lo que hay alrededor: más
          privacidad, tina, fogata o espacio para más personas.
        </p>
      </header>
      <ComparadorDomos domos={DOMOS} proximoFinDeSemana={proximoFinDeSemana} />
    </div>
  );
}
