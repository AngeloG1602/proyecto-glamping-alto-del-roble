"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useBloqueoScroll } from "@/components/efectos/useBloqueoScroll";
import { useMontajeAnimado } from "@/components/efectos/useMontajeAnimado";

type Props = {
  fotos: string[];
  nombre: string;
  abierto: boolean;
  indice: number;
  onCambiar: (indice: number) => void;
  onCerrar: () => void;
};

const UMBRAL_DESLIZAR = 50;

/** Visor a pantalla completa: flechas, teclado (← → Esc) y deslizar con el dedo */
export function VisorFotos({ fotos, nombre, abierto, indice, onCambiar, onCerrar }: Props) {
  const { montado, visible } = useMontajeAnimado(abierto, 320);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const inicioToque = useRef<number | null>(null);
  useBloqueoScroll(montado);

  const anterior = () => onCambiar((indice - 1 + fotos.length) % fotos.length);
  const siguiente = () => onCambiar((indice + 1) % fotos.length);

  useEffect(() => {
    if (!abierto) return;
    const enfocadoAntes = document.activeElement as HTMLElement | null;
    botonCerrar.current?.focus();
    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCerrar();
      if (evento.key === "ArrowLeft") onCambiar((indice - 1 + fotos.length) % fotos.length);
      if (evento.key === "ArrowRight") onCambiar((indice + 1) % fotos.length);
    };
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      enfocadoAntes?.focus();
    };
  }, [abierto, indice, fotos.length, onCambiar, onCerrar]);

  if (!montado) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${nombre}`}
      className={`fixed inset-0 z-50 flex flex-col bg-carbon/95 backdrop-blur-sm transition-opacity duration-300 ease-salida ${visible ? "opacity-100" : "opacity-0"}`}
      onPointerDown={(evento) => (inicioToque.current = evento.clientX)}
      onPointerUp={(evento) => {
        if (inicioToque.current === null) return;
        const delta = evento.clientX - inicioToque.current;
        inicioToque.current = null;
        if (delta > UMBRAL_DESLIZAR) anterior();
        if (delta < -UMBRAL_DESLIZAR) siguiente();
      }}
    >
      <div className="flex items-center justify-between p-4 text-blanco">
        <p className="text-pequeno font-medium tabular-nums" aria-live="polite">
          {indice + 1} / {fotos.length}
        </p>
        <button
          ref={botonCerrar}
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="flex size-11 items-center justify-center rounded-full bg-blanco/10 transition-colors hover:bg-blanco/20"
        >
          <X size={22} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <div
        className={`relative flex-1 transition-transform duration-500 ease-salida ${visible ? "scale-100" : "scale-95"}`}
      >
        {fotos.map((foto, i) => (
          <div
            key={`${foto}-${i}`}
            aria-hidden={i !== indice}
            className={`absolute inset-4 transition-[opacity,transform] duration-500 ease-salida md:inset-x-24 ${
              i === indice ? "opacity-100" : "pointer-events-none opacity-0"
            } ${i < indice ? "-translate-x-6" : i > indice ? "translate-x-6" : ""}`}
          >
            <Image
              src={foto}
              alt={i === indice ? `${nombre}, foto ${i + 1} de ${fotos.length}` : ""}
              fill
              sizes="100vw"
              className="rounded-tarjeta object-contain"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={anterior}
          aria-label="Foto anterior"
          className="absolute top-1/2 left-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-blanco/10 text-blanco transition-colors hover:bg-blanco/25"
        >
          <ChevronLeft size={24} strokeWidth={1.5} aria-hidden />
        </button>
        <button
          type="button"
          onClick={siguiente}
          aria-label="Foto siguiente"
          className="absolute top-1/2 right-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-blanco/10 text-blanco transition-colors hover:bg-blanco/25"
        >
          <ChevronRight size={24} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <ul className="flex justify-center gap-2 p-4">
        {fotos.map((foto, i) => (
          <li key={`punto-${i}`}>
            <button
              type="button"
              onClick={() => onCambiar(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === indice}
              className="h-1.5 w-6 rounded-full bg-blanco/30 transition-[background-color,width] duration-500 ease-salida aria-[current=true]:w-10 aria-[current=true]:bg-blanco"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
