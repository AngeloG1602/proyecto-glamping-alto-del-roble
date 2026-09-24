import type { Metadata } from "next";
import { CalendarDays, CircleCheck, Gift } from "lucide-react";
import { CierreVerDomos } from "@/components/layout/CierreVerDomos";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import { Seccion } from "@/components/ui/Seccion";
import { EXTRAS, FOTOS_EXTRAS } from "@/lib/data/domos";
import { formatearPesos } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Experiencias — cena romántica, masaje y decoración de aniversario",
  description:
    "Agrega a tu noche en Alto del Roble una cena romántica en la terraza, un masaje en el domo o decoración de aniversario. Se reservan junto con tu domo.",
};

const PASOS = [
  { icono: CalendarDays, texto: "Eliges tu domo y tus fechas." },
  { icono: Gift, texto: "En el paso 2 de la reserva marcas las experiencias que quieras." },
  { icono: CircleCheck, texto: "Pagas todo junto y cuando llegas ya está preparado." },
];

/** /experiencias (F1-02 §1): genera el deseo antes; /reservar lo cobra */
export default function Experiencias() {
  return (
    <>
      <EncabezadoPagina titulo="Experiencias para que no sea una noche más">
        Tres extras que la mayoría de nuestros huéspedes descubre al llegar. Ahora puedes dejarlos
        listos desde antes.
      </EncabezadoPagina>

      <div className="contenedor space-y-12 pb-12 md:space-y-16 md:pb-16">
        {EXTRAS.map((extra, i) => (
          <article
            key={extra.id}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
            aria-labelledby={`extra-${i}`}
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-tarjeta bg-arena ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <Foto
                src={FOTOS_EXTRAS[extra.id]}
                alt={extra.nombre}
                sizes="(min-width: 768px) 50vw, 100vw"
                prioridad={i === 0}
              />
            </div>
            <div>
              <h2 id={`extra-${i}`} className="text-h2 text-bosque">
                {extra.nombre}
              </h2>
              <p className="mt-2 text-h3 font-cuerpo text-carbon">{formatearPesos(extra.precio)}</p>
              <p className="mt-4">{extra.descripcion}</p>
            </div>
          </article>
        ))}
      </div>

      <Seccion fondo="arena" titulo="Cómo se agregan">
        <ol className="grid gap-6 md:grid-cols-3">
          {PASOS.map(({ icono: Icono, texto }, i) => (
            <li key={texto} className="flex gap-4 rounded-tarjeta bg-hueso p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bosque text-blanco">
                <Icono {...ICONO} />
              </span>
              <p>
                <span className="block text-pequeno font-semibold text-marron">Paso {i + 1}</span>
                {texto}
              </p>
            </li>
          ))}
        </ol>
      </Seccion>

      <CierreVerDomos
        titulo="Primero, elige tu domo"
        texto="Las experiencias se reservan junto con tu domo. Mira cuál tiene libres las fechas que buscas."
        textoBoton="Ver un domo disponible"
      />
    </>
  );
}
