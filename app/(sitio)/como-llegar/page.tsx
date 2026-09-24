import type { Metadata } from "next";
import { Backpack, Car, Clock, MapPin, PawPrint } from "lucide-react";
import { CierreVerDomos } from "@/components/layout/CierreVerDomos";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { ICONO } from "@/components/ui/icono";
import { COMO_LLEGAR, NEGOCIO } from "@/lib/data/negocio";
import { retraso } from "@/lib/efectos";

export const metadata: Metadata = {
  title: "Cómo llegar a Alto del Roble — glamping cerca de Bogotá, en Guatavita",
  description:
    "Indicaciones para llegar desde Bogotá en carro o transporte público, horarios de llegada y salida, qué llevar y reglas para mascotas.",
};

function Bloque({
  icono: Icono,
  titulo,
  children,
  indice = 0,
}: {
  icono: typeof Car;
  titulo: string;
  children: React.ReactNode;
  indice?: number;
}) {
  return (
    <section
      data-revelar
      style={retraso(indice % 2)}
      className="rounded-tarjeta border border-borde bg-blanco p-6 transition-shadow duration-500 hover:shadow-sutil"
    >
      <h2 className="flex items-center gap-3 text-h3 text-bosque">
        <Icono {...ICONO} />
        {titulo}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ComoLlegar() {
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(NEGOCIO.mapaConsulta)}&output=embed`;

  return (
    <>
      <EncabezadoPagina titulo="Cómo llegar">{COMO_LLEGAR.resumen}</EncabezadoPagina>

      <div className="contenedor pb-12 md:pb-16">
        {/* F2-03 I-03: iframe público con la ubicación */}
        <div
          data-revelar="escala"
          className="overflow-hidden rounded-tarjeta border border-borde bg-arena"
        >
          <iframe
            src={mapa}
            title="Mapa de la ubicación de Alto del Roble en Guatavita"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full md:h-[420px]"
          />
        </div>
        <p className="mt-3 flex items-start gap-2 text-pequeno text-marron">
          <MapPin {...ICONO} className="mt-0.5 shrink-0" />
          {NEGOCIO.direccion}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {COMO_LLEGAR.rutas.map((ruta, i) => (
            <Bloque key={ruta.titulo} icono={Car} titulo={ruta.titulo} indice={i}>
              <p>{ruta.texto}</p>
            </Bloque>
          ))}

          <Bloque icono={Clock} titulo="Llegada y salida" indice={2}>
            <dl className="space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-marron">Llegada (check-in)</dt>
                <dd className="font-medium">Desde las {NEGOCIO.checkIn}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-marron">Salida (check-out)</dt>
                <dd className="font-medium">Hasta las {NEGOCIO.checkOut}</dd>
              </div>
            </dl>
          </Bloque>

          <Bloque icono={PawPrint} titulo="Mascotas" indice={3}>
            <ul className="list-disc space-y-1 pl-5">
              {COMO_LLEGAR.mascotas.map((regla) => (
                <li key={regla}>{regla}</li>
              ))}
            </ul>
          </Bloque>

          <Bloque icono={Backpack} titulo="Qué llevar" indice={4}>
            <ul className="list-disc space-y-1 pl-5">
              {COMO_LLEGAR.queLlevar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Bloque>
        </div>
      </div>

      <CierreVerDomos titulo="¿Ya sabes cómo llegar? Elige tu domo" />
    </>
  );
}
