"use client";

import { useEffect, useRef, useState } from "react";
import { formatearPesos } from "@/lib/formato";

type Props = { valor: number; duracionMs?: number; className?: string };

/**
 * Precio que "cuenta" hasta el nuevo valor cuando cambia (p. ej. al agregar un extra).
 * El lector de pantalla recibe solo el valor final.
 */
export function PesosAnimados({ valor, duracionMs = 650, className = "" }: Props) {
  const [mostrado, setMostrado] = useState(valor);
  const anterior = useRef(valor);

  useEffect(() => {
    const desde = anterior.current;
    anterior.current = valor;
    const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cuadro = 0;
    let inicio: number | null = null;
    const avanzar = (tiempo: number) => {
      inicio ??= tiempo;
      const progreso = sinMovimiento ? 1 : Math.min(1, (tiempo - inicio) / duracionMs);
      const suavizado = 1 - Math.pow(1 - progreso, 3);
      setMostrado(Math.round(desde + (valor - desde) * suavizado));
      if (progreso < 1) cuadro = requestAnimationFrame(avanzar);
    };
    cuadro = requestAnimationFrame(avanzar);
    return () => cancelAnimationFrame(cuadro);
  }, [valor, duracionMs]);

  return (
    <span className={`tabular-nums ${className}`}>
      <span aria-hidden>{formatearPesos(mostrado)}</span>
      <span className="sr-only">{formatearPesos(valor)}</span>
    </span>
  );
}
