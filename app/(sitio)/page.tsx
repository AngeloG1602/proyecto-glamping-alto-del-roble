import {
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
import { HeroInmersivo } from "@/components/inicio/HeroInmersivo";
import { ButtonLink } from "@/components/ui/Button";
import { Foto } from "@/components/ui/Foto";
import { EnlaceFlecha } from "@/components/ui/EnlaceFlecha";
import { ICONO } from "@/components/ui/icono";
import { Seccion } from "@/components/ui/Seccion";
import { DOMOS, EXTRAS, FOTO_CIERRE } from "@/lib/data/domos";
import { retraso } from "@/lib/efectos";
import { COMO_LLEGAR, NEGOCIO, POLITICA_CANCELACION } from "@/lib/data/negocio";

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
      <HeroInmersivo />

      {/* 2 · Los 6 domos */}
      <Seccion
        id="domos"
        titulo="Seis domos, todos frente a la represa"
        subtitulo="Misma tarifa para los seis. Elige por lo que hay alrededor: privacidad, tina, fogata o espacio para más personas."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMOS.map((domo, i) => (
            <li key={domo.id} className="flex" data-revelar style={retraso(i % 3)}>
              <DomoCard domo={domo} />
            </li>
          ))}
        </ul>
        <EnlaceFlecha href="/domos" className="mt-8">
          Comparar los domos lado a lado
        </EnlaceFlecha>
      </Seccion>

      {/* 3 · Extras destacados — el problema #1: nadie sabe que existen */}
      <Seccion
        fondo="arena"
        titulo="Para que no sea una noche más"
        subtitulo="Cena en tu terraza, masaje en el domo o decoración para una fecha especial. Los agregas al reservar y ya están listos cuando llegas."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {EXTRAS.map((extra, i) => (
            <div key={extra.id} className="flex" data-revelar style={retraso(i, 120)}>
              <ExtraCard extra={extra} />
            </div>
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
          {CONFIANZA.map(({ icono: Icono, titulo, texto }, i) => (
            <li key={titulo} className="group flex gap-4" data-revelar style={retraso(i)}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-arena text-bosque transition-[background-color,color,transform] duration-500 ease-salida group-hover:scale-110 group-hover:bg-bosque group-hover:text-blanco">
                <Icono {...ICONO} />
              </span>
              <div>
                <h3 className="text-h3">{titulo}</h3>
                <p className="mt-2 text-marron">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
        <div
          data-revelar="escala"
          className="relative mt-12 overflow-hidden rounded-tarjeta px-6 py-16 text-center text-blanco md:py-24"
        >
          <Foto src={FOTO_CIERRE} alt="" sizes="(min-width: 1240px) 1200px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/55 to-carbon/30" />
          <div className="relative flex flex-col items-center gap-3">
            <p className="text-h2">Tu domo queda confirmado al instante</p>
            <p className="max-w-md opacity-90">
              Elige tus fechas, agrega lo que quieras y paga en línea. Sin esperar respuesta.
            </p>
            <ButtonLink href="/reservar" className="mt-4 w-full sm:w-auto sm:px-12">
              Reservar tu domo
            </ButtonLink>
          </div>
        </div>
      </Seccion>

      {/* 5 · Cómo llegar (preview) */}
      <Seccion fondo="arena" titulo="Cómo llegar">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div data-revelar="izquierda">
            <p>{COMO_LLEGAR.resumen}</p>
            <EnlaceFlecha href="/como-llegar" className="mt-6">
              Ver indicaciones y qué llevar
            </EnlaceFlecha>
          </div>
          <ul className="space-y-4" data-revelar="derecha" style={retraso(1)}>
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
