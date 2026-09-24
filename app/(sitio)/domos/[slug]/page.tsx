import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, ChevronLeft, MessageCircle, Users } from "lucide-react";
import { BarraCTAFijaMovil } from "@/components/domos/BarraCTAFijaMovil";
import { CtaReservarDomo } from "@/components/domos/CtaReservarDomo";
import { ExtraCard } from "@/components/domos/ExtraCard";
import { Galeria } from "@/components/domos/Galeria";
import { PanelDisponibilidad } from "@/components/domos/PanelDisponibilidad";
import { SeleccionFechasProvider } from "@/components/domos/SeleccionFechas";
import { SelloConfianza } from "@/components/domos/SelloConfianza";
import { TablaIncluidoNoIncluido } from "@/components/domos/TablaIncluidoNoIncluido";
import { Tarifas } from "@/components/domos/Tarifas";
import { ButtonLink } from "@/components/ui/Button";
import { EnlaceFlecha } from "@/components/ui/EnlaceFlecha";
import { ICONO } from "@/components/ui/icono";
import { DOMOS, EXTRAS, obtenerDomoPorSlug } from "@/lib/data/domos";
import { COMO_LLEGAR, enlaceWhatsApp } from "@/lib/data/negocio";
import { formatearPesos } from "@/lib/formato";
import { nochesOcupadas } from "@/lib/reservas/disponibilidad";
import { TARIFA_MINIMA } from "@/lib/reservas/precios";

export function generateStaticParams() {
  return DOMOS.map((domo) => ({ slug: domo.slug }));
}

export async function generateMetadata(props: PageProps<"/domos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const domo = obtenerDomoPorSlug(slug);
  if (!domo) return {};
  return {
    title: `${domo.nombre} — domo con vista a la represa en Guatavita`,
    description: `${domo.descripcionCorta} Hasta ${domo.capacidad} personas, desde ${formatearPesos(TARIFA_MINIMA)} la noche. Mira la disponibilidad real y reserva directo.`,
    openGraph: { images: [domo.fotos[0]] },
  };
}

/**
 * Ficha de domo (F1-02 §2, F1-06 §2): una sola columna, una sola tarea.
 * Galería → precio + disponibilidad → incluido/no incluido → CTA → extras sugeridos.
 */
export default async function FichaDomo(props: PageProps<"/domos/[slug]">) {
  const { slug } = await props.params;
  const domo = obtenerDomoPorSlug(slug);
  if (!domo) notFound();

  const ocupadas = [...nochesOcupadas(domo.id)];

  return (
    <SeleccionFechasProvider>
      <article className="contenedor max-w-[800px] pt-4 pb-12 md:pt-8 md:pb-16">
        <Link
          href="/domos"
          className="mb-4 inline-flex items-center gap-1 text-pequeno text-marron hover:text-carbon"
        >
          <ChevronLeft {...ICONO} />
          Todos los domos
        </Link>

        <Galeria fotos={domo.fotos} nombre={domo.nombre} slug={domo.slug} />

        <header className="mt-6 animate-entrada" style={{ animationDelay: "150ms" }}>
          <h1 className="text-h1 text-bosque">{domo.nombre}</h1>
          <p className="mt-2 text-marron">{domo.descripcionCorta}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="flex items-center gap-2 text-pequeno text-marron">
              <Users {...ICONO} />
              Hasta {domo.capacidad} personas
            </p>
            <SelloConfianza />
          </div>
        </header>

        {/* 2 · Precio: el ojo llega por contraste tipográfico (F1-06 §2) */}
        <section
          className="mt-8 animate-entrada"
          style={{ animationDelay: "250ms" }}
          aria-labelledby="precio"
        >
          <p id="precio" className="text-marron">
            Desde{" "}
            <span className="font-titulo text-[32px] font-semibold text-carbon md:text-[40px]">
              {formatearPesos(TARIFA_MINIMA)}
            </span>{" "}
            por noche
          </p>
          <div className="mt-4">
            <Tarifas />
          </div>
          {/* CTA 1 de 2: secundario, tras el precio (F1-06 §5) */}
          <ButtonLink
            href="#disponibilidad"
            variante="secundario"
            className="mt-6 w-full md:w-auto"
          >
            Ver disponibilidad y reservar
          </ButtonLink>
        </section>

        <section
          data-revelar
          id="disponibilidad"
          className="mt-12 scroll-mt-24"
          aria-labelledby="titulo-disp"
        >
          <h2 id="titulo-disp" className="text-h2 text-bosque">
            Disponibilidad
          </h2>
          <p className="mt-2 mb-6 text-marron">
            Elige tu llegada y tu salida. El total se calcula con la tarifa de cada noche.
          </p>
          <PanelDisponibilidad ocupadas={ocupadas} />
        </section>

        <section data-revelar className="mt-12" aria-labelledby="titulo-sobre">
          <h2 id="titulo-sobre" className="text-h2 text-bosque">
            Sobre este domo
          </h2>
          <p className="mt-4">{domo.descripcionLarga}</p>
        </section>

        <section data-revelar className="mt-12" aria-labelledby="titulo-incluye">
          <h2 id="titulo-incluye" className="mb-6 text-h2 text-bosque">
            Qué incluye
          </h2>
          <TablaIncluidoNoIncluido />
        </section>

        {/* CTA 2 de 2: principal, tras resolver la objeción #3 (F1-06 §5) */}
        <div data-revelar className="mt-12 flex flex-col items-center gap-4 py-8 text-center">
          <CtaReservarDomo
            id="cta-ficha-domo"
            slug={domo.slug}
            variante="primario"
            texto={`Reservar ${domo.nombre}`}
            className="w-full sm:w-auto sm:px-12"
          />
          <a
            href={enlaceWhatsApp(`Hola, tengo una pregunta sobre el ${domo.nombre}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pequeno text-bosque underline underline-offset-4"
          >
            <MessageCircle {...ICONO} />
            ¿Tienes una pregunta? Escríbenos por WhatsApp
          </a>
        </div>

        <section data-revelar className="mt-12" aria-labelledby="titulo-extras">
          <h2 id="titulo-extras" className="text-h2 text-bosque">
            Hazla todavía más especial
          </h2>
          <p className="mt-2 mb-6 text-marron">
            Puedes agregar cualquiera de estas experiencias al reservar, en el paso 2.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {EXTRAS.map((extra) => (
              <ExtraCard key={extra.id} extra={extra} compacta />
            ))}
          </div>
          <EnlaceFlecha href="/experiencias" className="mt-6">
            Conoce las experiencias
          </EnlaceFlecha>
        </section>

        <section
          data-revelar
          className="mt-12 rounded-tarjeta bg-arena p-6"
          aria-labelledby="titulo-llegar"
        >
          <h2 id="titulo-llegar" className="flex items-center gap-3 text-h3 text-bosque">
            <Car {...ICONO} />
            Cómo llegar
          </h2>
          <p className="mt-3">{COMO_LLEGAR.resumen}</p>
          <EnlaceFlecha href="/como-llegar" className="mt-4">
            Ver indicaciones completas
          </EnlaceFlecha>
        </section>
      </article>

      <BarraCTAFijaMovil slug={domo.slug} />
    </SeleccionFechasProvider>
  );
}
