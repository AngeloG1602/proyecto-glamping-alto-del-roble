import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Car,
  CircleCheck,
  Clock,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import { DomoCard } from "@/components/domos/DomoCard";
import { ExtraCard } from "@/components/domos/ExtraCard";
import { ButtonLink } from "@/components/ui/Button";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import { Seccion } from "@/components/ui/Seccion";
import { DOMOS, EXTRAS, FOTO_HERO } from "@/lib/data/domos";
import { COMO_LLEGAR, NEGOCIO, POLITICA_CANCELACION } from "@/lib/data/negocio";

// Las tres frases "si solo lee eso" (F1-05 §1)
const TRES_FRASES = [
  "Una escapada fuera del ruido, con vista a la represa.",
  "6 domos, disponibilidad real, sin dobles reservas.",
  "Reserva confirmada al instante.",
];

const CONFIANZA = [
  {
    icono: CalendarDays,
    titulo: "Calendario en vivo, sin dobles reservas",
    texto:
      "Ves las mismas fechas que vemos nosotros. Cuando pagas, tu domo queda bloqueado en ese instante: nadie más puede tomar tus noches.",
  },
  {
    icono: BadgeCheck,
    titulo: `Registro Nacional de Turismo ${NEGOCIO.rnt}`,
    texto: `Operamos con registro vigente desde hace ${NEGOCIO.anosOperando} años. Somos Andrés y Mariana y te recibimos en persona.`,
  },
  {
    icono: ShieldCheck,
    titulo: "Reserva directa, sin comisión de intermediarios",
    texto:
      "Reservas con nosotros, sin plataformas en el medio. Cada reserva directa te ahorra la comisión y habla directo con quien te va a recibir.",
  },
  {
    icono: CircleCheck,
    titulo: "Cancelación clara desde antes de pagar",
    texto: `${POLITICA_CANCELACION.resumen} Las condiciones completas están en el paso de pago, no en letra pequeña.`,
  },
];

/** Inicio (F1-02 §2, F1-06 §2): hero → 6 domos → extras → confianza → cómo llegar */
export default function Inicio() {
  return (
    <>
      {/* 1 · Hero (promesa central F1-05 §1) */}
      <section className="py-8 md:py-16">
        <div className="contenedor grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="text-h1 text-bosque">
              Una escapada fuera del ruido, con vista a la represa
            </h1>
            <p className="mt-4 text-[18px] md:text-[20px]">
              Tu domo, tu fin de semana, desconectado de verdad. A dos horas de Bogotá, en
              Guatavita.
            </p>
            <ul className="mt-6 space-y-2">
              {TRES_FRASES.slice(1).map((frase) => (
                <li key={frase} className="flex items-center gap-3 text-marron">
                  <CircleCheck {...ICONO} className="shrink-0 text-bosque" />
                  {frase}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/domos" variante="secundario">
                Ver los domos
              </ButtonLink>
              <Link
                id="cta-hero"
                href="/reservar"
                className="inline-flex items-center justify-center gap-2 py-2 font-medium text-bosque underline underline-offset-4"
              >
                ¿Ya lo decidiste? Reserva directo
                <ArrowRight {...ICONO} />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-tarjeta bg-arena md:aspect-[5/4]">
            <Foto
              src={FOTO_HERO}
              alt="Domo de Alto del Roble frente a la represa al atardecer"
              sizes="(min-width: 768px) 50vw, 100vw"
              prioridad
            />
          </div>
        </div>
      </section>

      {/* 2 · Los 6 domos */}
      <Seccion
        id="domos"
        titulo="Seis domos, todos frente a la represa"
        subtitulo="Misma tarifa para los seis. Elige por lo que hay alrededor: privacidad, tina, fogata o espacio para más personas."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMOS.map((domo) => (
            <li key={domo.id} className="flex">
              <DomoCard domo={domo} />
            </li>
          ))}
        </ul>
        <Link
          href="/domos"
          className="mt-8 inline-flex items-center gap-2 font-medium text-bosque underline underline-offset-4"
        >
          Comparar los domos lado a lado
          <ArrowRight {...ICONO} />
        </Link>
      </Seccion>

      {/* 3 · Extras destacados — el problema #1: nadie sabe que existen */}
      <Seccion
        fondo="arena"
        titulo="Para que no sea una noche más"
        subtitulo="Cena en tu terraza, masaje en el domo o decoración para una fecha especial. Los agregas al reservar y ya están listos cuando llegas."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {EXTRAS.map((extra) => (
            <ExtraCard key={extra.id} extra={extra} />
          ))}
        </div>
        <ButtonLink href="/experiencias" variante="secundario" className="mt-8">
          Ver las experiencias
        </ButtonLink>
      </Seccion>

      {/* 4 · Confianza / mecanismo (F1-05 §5) + CTA principal (F1-06 §5) */}
      <Seccion
        titulo="Reservar aquí es seguro"
        subtitulo="Sabemos que reservar directo genera dudas. Así las resolvemos."
      >
        <ul className="grid gap-8 md:grid-cols-2">
          {CONFIANZA.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-arena text-bosque">
                <Icono {...ICONO} />
              </span>
              <div>
                <h3 className="text-h3">{titulo}</h3>
                <p className="mt-2 text-marron">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-center gap-3 rounded-tarjeta border border-borde p-8 text-center md:p-12">
          <p className="text-h2 text-bosque">Tu domo queda confirmado al instante</p>
          <p className="text-marron">Elige tus fechas, agrega lo que quieras y paga en línea.</p>
          <ButtonLink href="/reservar" className="mt-4 w-full sm:w-auto sm:px-12">
            Reservar tu domo
          </ButtonLink>
        </div>
      </Seccion>

      {/* 5 · Cómo llegar (preview) */}
      <Seccion fondo="arena" titulo="Cómo llegar">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p>{COMO_LLEGAR.resumen}</p>
            <Link
              href="/como-llegar"
              className="mt-6 inline-flex items-center gap-2 font-medium text-bosque underline underline-offset-4"
            >
              Ver indicaciones y qué llevar
              <ArrowRight {...ICONO} />
            </Link>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Car {...ICONO} className="text-bosque" />
              Unas 2 horas desde Bogotá
            </li>
            <li className="flex items-center gap-3">
              <Clock {...ICONO} className="text-bosque" />
              Llegada desde las {NEGOCIO.checkIn} · salida hasta las {NEGOCIO.checkOut}
            </li>
            <li className="flex items-center gap-3">
              <PawPrint {...ICONO} className="text-bosque" />
              Tu mascota es bienvenida
            </li>
          </ul>
        </div>
      </Seccion>
    </>
  );
}
