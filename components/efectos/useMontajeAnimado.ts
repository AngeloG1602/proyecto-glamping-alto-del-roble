"use client";

import { useEffect, useState } from "react";

/**
 * Mantiene montado un elemento mientras corre su animación de salida.
 * `visible` pasa a true un cuadro después de montar, para que la transición de entrada ocurra.
 */
export function useMontajeAnimado(abierto: boolean, duracionMs = 280) {
  const [montado, setMontado] = useState(abierto);
  const [visible, setVisible] = useState(false);

  // Ajustes derivados durante el render (patrón recomendado por React en lugar de efectos)
  if (abierto && !montado) setMontado(true);
  if (!abierto && visible) setVisible(false);

  useEffect(() => {
    if (abierto) {
      let segundo = 0;
      const primero = requestAnimationFrame(() => {
        segundo = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(primero);
        cancelAnimationFrame(segundo);
      };
    }
    const espera = setTimeout(() => setMontado(false), duracionMs);
    return () => clearTimeout(espera);
  }, [abierto, duracionMs]);

  return { montado, visible };
}
