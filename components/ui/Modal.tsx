"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { ICONO } from "./icono";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
};

/**
 * F1-03 · Modal: overlay carbón al 60%, cierre con clic afuera, X o Escape.
 * Uso en el MVP: confirmación previa al pago.
 */
export function Modal({ abierto, onCerrar, titulo, children }: Props) {
  const idTitulo = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCerrar();
    };
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", alPresionar);
    panel.current?.focus();
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", alPresionar);
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-carbon/60 sm:items-center sm:p-4"
      onClick={onCerrar}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        onClick={(evento) => evento.stopPropagation()}
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-tarjeta bg-hueso p-6 outline-none sm:rounded-tarjeta md:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={idTitulo} className="text-h3 text-bosque">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="-m-2 rounded-boton p-2 text-marron hover:bg-arena hover:text-carbon"
          >
            <X {...ICONO} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
