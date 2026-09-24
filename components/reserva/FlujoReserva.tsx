"use client";

import { useRouter } from "next/navigation";
import { CircleCheck, Info, Mail, ShieldCheck } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  CalendarioDisponibilidad,
  type RangoFechas,
} from "@/components/domos/CalendarioDisponibilidad";
import { Button } from "@/components/ui/Button";
import { ICONO } from "@/components/ui/icono";
import { Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { DOMOS, obtenerDomoPorId } from "@/lib/data/domos";
import { POLITICA_CANCELACION } from "@/lib/data/negocio";
import { capitalizar, formatearFechaLarga, formatearPesos } from "@/lib/formato";
import { guardarReservaConfirmada } from "@/lib/reservas/confirmacion";
import { verificarDisponibilidad } from "@/lib/reservas/disponibilidad";
import { pagarReservaSimulada } from "@/lib/reservas/pago";
import { cotizar } from "@/lib/reservas/precios";
import type { DatosHuesped } from "@/lib/reservas/validacion";
import { DesglosePrecio } from "./DesglosePrecio";
import { FormularioHuesped } from "./FormularioHuesped";
import { PasosReserva } from "./PasosReserva";
import { ResumenReserva } from "./ResumenReserva";
import { SelectorExtras } from "./SelectorExtras";

type Props = {
  domoInicial: string | null;
  rangoInicial: RangoFechas;
  /** Noches ocupadas por id de domo */
  ocupadasPorDomo: Record<string, string[]>;
};

/**
 * /reservar (F1-02 §2, F1-06 §2): fechas+precio → extras → datos → cancelación → pago.
 * Si el visitante abandona a mitad, no queda nada guardado (F2-01 regla 2).
 */
export function FlujoReserva({ domoInicial, rangoInicial, ocupadasPorDomo }: Props) {
  const router = useRouter();
  const inicio = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(1);
  const [haciaAtras, setHaciaAtras] = useState(false);
  const [domoId, setDomoId] = useState(domoInicial ?? "");
  const [rango, setRango] = useState<RangoFechas>(rangoInicial);
  const [extrasIds, setExtrasIds] = useState<string[]>([]);
  const [huesped, setHuesped] = useState<DatosHuesped | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pagando, setPagando] = useState(false);
  const [errorPago, setErrorPago] = useState<string | null>(null);

  const domo = obtenerDomoPorId(domoId);
  const fechasCompletas = rango.entrada !== null && rango.salida !== null;
  const cotizacion = useMemo(
    () => (fechasCompletas ? cotizar(rango.entrada!, rango.salida!, extrasIds) : null),
    [fechasCompletas, rango, extrasIds],
  );

  const irA = (siguiente: number) => {
    setHaciaAtras(siguiente < paso);
    setPaso(siguiente);
    inicio.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cambiarDomo = (nuevoId: string) => {
    setDomoId(nuevoId);
    // Si las fechas elegidas no están libres en el nuevo domo, se limpian
    if (
      rango.entrada &&
      rango.salida &&
      !verificarDisponibilidad(nuevoId, rango.entrada, rango.salida).disponible
    ) {
      setRango({ entrada: null, salida: null });
    }
    // La capacidad cambia con el domo: el número de huéspedes se vuelve a pedir
    setHuesped((actual) =>
      actual && actual.numHuespedes > (obtenerDomoPorId(nuevoId)?.capacidad ?? 0) ? null : actual,
    );
  };

  const cerrarModal = useCallback(() => {
    if (!pagando) setModalAbierto(false);
  }, [pagando]);

  const pagar = async () => {
    if (!domo || !huesped || !rango.entrada || !rango.salida) return;
    setPagando(true);
    setErrorPago(null);
    const resultado = await pagarReservaSimulada({
      domoId: domo.id,
      entrada: rango.entrada,
      salida: rango.salida,
      extrasIds,
      huesped,
    });
    if (!resultado.exito) {
      // F2-01 regla 10: si el pago falla no queda reserva; se puede reintentar a mano
      setPagando(false);
      setModalAbierto(false);
      setErrorPago(resultado.mensaje);
      return;
    }
    guardarReservaConfirmada(resultado.reserva);
    router.push("/confirmacion");
  };

  return (
    <div ref={inicio} className="contenedor scroll-mt-4 py-8 md:py-12">
      <h1 className="text-h1 text-bosque">Reserva tu domo</h1>
      <div className="mt-6 mb-8 max-w-2xl">
        <PasosReserva actual={paso} onIrA={irA} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div
          key={paso}
          className={`min-w-0 ${haciaAtras ? "animar-desde-izquierda" : "animar-desde-derecha"}`}
        >
          {paso === 1 && (
            <section aria-labelledby="titulo-paso">
              <h2 id="titulo-paso" className="text-h2 text-bosque">
                Elige domo y fechas
              </h2>
              <Select
                name="domo"
                etiqueta="Domo"
                value={domoId}
                onChange={(evento) => cambiarDomo(evento.target.value)}
                className="mt-6 max-w-md"
              >
                <option value="" disabled>
                  Elige un domo
                </option>
                {DOMOS.map((opcion) => (
                  <option key={opcion.id} value={opcion.id}>
                    {opcion.nombre} · hasta {opcion.capacidad} personas
                  </option>
                ))}
              </Select>

              {domo ? (
                <div className="mt-6 rounded-tarjeta border border-borde bg-blanco p-4 md:p-6">
                  <CalendarioDisponibilidad
                    key={domo.id}
                    ocupadas={ocupadasPorDomo[domo.id] ?? []}
                    rango={rango}
                    onCambiar={setRango}
                    meses={2}
                  />
                </div>
              ) : (
                <p className="mt-6 rounded-tarjeta border border-dashed border-borde p-6 text-center text-marron">
                  Elige un domo para ver sus fechas disponibles.
                </p>
              )}

              {cotizacion && (
                <div className="mt-6 lg:hidden">
                  <DesglosePrecio cotizacion={cotizacion} />
                </div>
              )}

              <BarraAcciones>
                <span />
                <Button
                  variante="secundario"
                  disabled={!domo || !fechasCompletas}
                  onClick={() => irA(2)}
                >
                  Continuar
                </Button>
              </BarraAcciones>
            </section>
          )}

          {paso === 2 && (
            <section aria-labelledby="titulo-paso">
              <h2 id="titulo-paso" className="text-h2 text-bosque">
                ¿Quieres agregar algo?
              </h2>
              <p className="mt-2 mb-6 text-marron">
                Opcional. Lo dejamos listo antes de que llegues.
              </p>
              <SelectorExtras elegidos={extrasIds} onCambiar={setExtrasIds} />
              {cotizacion && (
                <p className="mt-6 flex justify-between border-t border-borde pt-4 lg:hidden">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatearPesos(cotizacion.total)}</span>
                </p>
              )}
              <BarraAcciones>
                <BotonVolver onClick={() => irA(1)}>Volver a fechas</BotonVolver>
                <Button variante="secundario" onClick={() => irA(3)}>
                  {extrasIds.length ? "Continuar" : "Continuar sin experiencias"}
                </Button>
              </BarraAcciones>
            </section>
          )}

          {paso === 3 && domo && (
            <section aria-labelledby="titulo-paso">
              <h2 id="titulo-paso" className="text-h2 text-bosque">
                Tus datos
              </h2>
              <p className="mt-2 mb-6 text-marron">Solo lo necesario para recibirte.</p>
              <FormularioHuesped
                capacidad={domo.capacidad}
                valoresIniciales={
                  huesped ? { ...huesped, consentimiento: true as const } : undefined
                }
                onVolver={() => irA(2)}
                onEnviar={(datos) => {
                  setHuesped(datos);
                  irA(4);
                }}
              />
            </section>
          )}

          {paso === 4 && domo && cotizacion && huesped && rango.entrada && rango.salida && (
            <section aria-labelledby="titulo-paso">
              <h2 id="titulo-paso" className="text-h2 text-bosque">
                Revisa y paga
              </h2>

              {errorPago && (
                <p
                  role="alert"
                  className="mt-6 rounded-input border border-error bg-blanco p-4 font-medium text-error"
                >
                  No pudimos confirmar el pago: {errorPago} No se hizo ningún cobro.
                </p>
              )}

              <dl className="mt-6 grid gap-4 rounded-tarjeta border border-borde bg-blanco p-6 sm:grid-cols-2">
                <Dato titulo="Llegada">{capitalizar(formatearFechaLarga(rango.entrada))}</Dato>
                <Dato titulo="Salida">{capitalizar(formatearFechaLarga(rango.salida))}</Dato>
                <Dato titulo="A nombre de">{huesped.nombre}</Dato>
                <Dato titulo="Contacto">
                  {huesped.correo} · {huesped.celular}
                </Dato>
              </dl>

              <div className="mt-6 lg:hidden">
                <ResumenReserva
                  domo={domo}
                  entrada={rango.entrada}
                  salida={rango.salida}
                  cotizacion={cotizacion}
                  huespedes={huesped.numHuespedes}
                  mascota={huesped.mascota === "si"}
                />
              </div>

              {/* Objeción #2, antes del botón de pago (F1-05 §4) */}
              <div className="mt-6 rounded-tarjeta bg-arena p-6">
                <h3 className="text-h3 text-bosque">Política de cancelación</h3>
                <ul className="mt-4 space-y-2">
                  {POLITICA_CANCELACION.puntos.map((punto) => (
                    <li key={punto} className="flex gap-3">
                      <CircleCheck {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
                      {punto}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qué pasa después de pagar (F1-06 §6) */}
              <div className="mt-6 flex gap-3">
                <Mail {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
                <p>
                  Al pagar verás la confirmación en pantalla y te llegará un correo a{" "}
                  <strong>{huesped.correo}</strong> con los detalles y cómo llegar.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 border-t border-borde pt-8 text-center">
                <p className="flex items-center gap-2 font-medium text-bosque">
                  <ShieldCheck {...ICONO} />
                  Tu domo queda confirmado al instante — sin dobles reservas.
                </p>
                <Button
                  id="form-pago"
                  onClick={() => setModalAbierto(true)}
                  className="w-full sm:w-auto sm:px-12"
                >
                  Pagar {formatearPesos(cotizacion.total)}
                </Button>
                <BotonVolver onClick={() => irA(3)}>Volver a tus datos</BotonVolver>
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:sticky lg:top-6 lg:block">
          <ResumenReserva
            domo={domo}
            entrada={rango.entrada}
            salida={rango.salida}
            cotizacion={cotizacion}
            huespedes={paso === 4 ? huesped?.numHuespedes : undefined}
            mascota={paso === 4 ? huesped?.mascota === "si" : undefined}
          />
        </aside>
      </div>

      {/* F1-03 · Modal: confirmación previa al pago */}
      <Modal abierto={modalAbierto} onCerrar={cerrarModal} titulo="Confirma tu pago">
        {domo && cotizacion && rango.entrada && rango.salida && (
          <>
            <ResumenReserva
              domo={domo}
              entrada={rango.entrada}
              salida={rango.salida}
              cotizacion={cotizacion}
            />
            <p className="mt-4 flex gap-3 rounded-input border border-borde p-4 text-pequeno text-marron">
              <Info {...ICONO} className="mt-0.5 shrink-0" />
              Versión de prueba: el pago es simulado y no se hace ningún cobro.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={pagar} cargando={pagando}>
                Confirmar y pagar {formatearPesos(cotizacion.total)}
              </Button>
              <Button variante="secundario" onClick={cerrarModal} disabled={pagando}>
                Revisar de nuevo
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

function BarraAcciones({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-4 border-t border-borde pt-6 sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  );
}

function BotonVolver({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 text-bosque underline underline-offset-4"
    >
      {children}
    </button>
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
