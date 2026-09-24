"use client";

import Link from "next/link";
import { ArrowRight, CircleCheck, Clock, Info, MessageCircle } from "lucide-react";
import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ICONO } from "@/components/ui/icono";
import { obtenerDomoPorId } from "@/lib/data/domos";
import { enlaceWhatsApp, NEGOCIO, POLITICA_CANCELACION } from "@/lib/data/negocio";
import { capitalizar, formatearFechaLarga, pluralizar } from "@/lib/formato";
import { interpretarReserva, leerReservaConfirmadaCruda } from "@/lib/reservas/confirmacion";
import { cotizar } from "@/lib/reservas/precios";
import { DesglosePrecio } from "./DesglosePrecio";

const sinSuscripcion = () => () => {};

/**
 * /confirmacion (F1-02 §1): comprobante con certeza de lo que sigue.
 * Aquí se disparará el evento `reserva_completada` de GA4 (F2-06 §2) cuando haya medición.
 */
export function Comprobante() {
  const cruda = useSyncExternalStore(sinSuscripcion, leerReservaConfirmadaCruda, () => undefined);

  if (cruda === undefined) {
    return <div className="contenedor min-h-[60vh] py-16" aria-busy="true" />;
  }

  const reserva = interpretarReserva(cruda);
  const domo = reserva ? obtenerDomoPorId(reserva.domoId) : undefined;

  if (!reserva || !domo) {
    return (
      <div className="contenedor flex max-w-[640px] flex-col items-center py-16 text-center">
        <h1 className="text-h1 text-bosque">No encontramos una reserva reciente</h1>
        <p className="mt-4 text-marron">
          Si ya pagaste, revisa tu correo o escríbenos por WhatsApp y lo verificamos contigo.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/reservar">Hacer una reserva</ButtonLink>
          <ButtonLink href={enlaceWhatsApp()} variante="secundario" target="_blank">
            Escribir por WhatsApp
          </ButtonLink>
        </div>
      </div>
    );
  }

  const cotizacion = cotizar(reserva.entrada, reserva.salida, reserva.extrasIds);

  return (
    <div className="contenedor max-w-[720px] py-8 md:py-16">
      <div className="text-center">
        <CircleCheck size={56} strokeWidth={1.5} aria-hidden className="mx-auto text-exito" />
        <h1 className="mt-4 text-h1 text-bosque">Tu reserva está confirmada</h1>
        <p className="mt-3 text-[18px]">
          {reserva.huesped.nombre.split(" ")[0]}, te esperamos en el {domo.nombre}.
        </p>
        <p className="mt-4 inline-block rounded-boton border border-exito px-4 py-2 font-semibold text-exito">
          Código de reserva: {reserva.codigo}
        </p>
      </div>

      <section
        className="mt-10 rounded-tarjeta border border-borde bg-blanco p-6"
        aria-label="Detalle"
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <Dato titulo="Llegada">
            {capitalizar(formatearFechaLarga(reserva.entrada))}, desde las {NEGOCIO.checkIn}
          </Dato>
          <Dato titulo="Salida">
            {capitalizar(formatearFechaLarga(reserva.salida))}, hasta las {NEGOCIO.checkOut}
          </Dato>
          <Dato titulo="Huéspedes">
            {pluralizar(reserva.huesped.numHuespedes, "persona", "personas")}
            {reserva.huesped.mascota === "si" ? " y una mascota" : ""}
          </Dato>
          <Dato titulo="Contacto">{reserva.huesped.correo}</Dato>
        </dl>
        <div className="mt-6 border-t border-borde pt-6">
          <DesglosePrecio cotizacion={cotizacion} />
          <p className="mt-2 text-right text-pequeno text-exito">Pagado</p>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="titulo-sigue">
        <h2 id="titulo-sigue" className="text-h2 text-bosque">
          Qué sigue
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3">
            <CircleCheck {...ICONO} className="mt-0.5 shrink-0 text-exito" />
            <span>
              Te enviamos la confirmación a <strong>{reserva.huesped.correo}</strong>. Guárdala: ahí
              está tu código.
            </span>
          </li>
          <li className="flex gap-3">
            <MessageCircle {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
            <span>
              Unos días antes te escribimos por WhatsApp al {reserva.huesped.celular} con la
              ubicación exacta.
            </span>
          </li>
          <li className="flex gap-3">
            <Clock {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
            <span>{POLITICA_CANCELACION.resumen}</span>
          </li>
        </ol>
        <Link
          href="/como-llegar"
          className="mt-6 inline-flex items-center gap-2 font-medium text-bosque underline underline-offset-4"
        >
          Ver cómo llegar y qué llevar
          <ArrowRight {...ICONO} />
        </Link>
      </section>

      <p className="mt-10 flex gap-3 rounded-input border border-borde p-4 text-pequeno text-marron">
        <Info {...ICONO} className="mt-0.5 shrink-0" />
        Versión de prueba: el pago fue simulado, no se envió ningún correo y la reserva no quedó
        registrada.
      </p>

      <div className="mt-8 text-center">
        <ButtonLink href="/" variante="secundario">
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  );
}

function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-pequeno text-marron">{titulo}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}
