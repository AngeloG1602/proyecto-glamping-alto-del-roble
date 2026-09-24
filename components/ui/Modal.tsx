"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { useBloqueoScroll } from "@/components/efectos/useBloqueoScroll";
import { useMontajeAnimado } from "@/components/efectos/useMontajeAnimado";
import { ICONO } from "./icono";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
};

/**
 * F1-03 · Modal: overlay carbón al 60%, cierre con clic afuera, X o Escape.
 * Entra deslizándose desde abajo (móvil) o creciendo (escritorio), y sale igual.
 */
export function Modal({ abierto, onCerrar, titulo, children }: Props) {
  const idTitulo = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { montado, visible } = useMontajeAnimado(abierto, 300);
  useBloqueoScroll(montado);

  useEffect(() => {
    if (!abierto) return;
    const enfocadoAntes = document.activeElement as HTMLElement | null;
    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", alPresionar);
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", alPresionar);
      enfocadoAntes?.focus();
    };
  }, [abierto, onCerrar]);

  if (!montado) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-carbon/60 backdrop-blur-[2px] transition-opacity duration-300 ease-salida sm:items-center sm:p-4 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onCerrar}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        onClick={(evento) => evento.stopPropagation()}
        className={`max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-tarjeta bg-hueso p-6 shadow-elevada outline-none transition-transform duration-300 ease-salida sm:rounded-tarjeta md:p-8 ${
          visible ? "translate-y-0 sm:scale-100" : "translate-y-full sm:translate-y-4 sm:scale-95"
        }`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={idTitulo} className="text-h3 text-bosque">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="-m-2 rounded-boton p-2 text-marron transition-[background-color,color,transform] duration-300 hover:rotate-90 hover:bg-arena hover:text-carbon"
          >
            <X {...ICONO} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
