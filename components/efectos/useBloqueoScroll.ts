"use client";

import { useEffect } from "react";

/** Bloquea el scroll del documento mientras `activo` sea true, sin salto por la barra */
export function useBloqueoScroll(activo: boolean) {
  useEffect(() => {
    if (!activo) return;
    const { overflow, paddingRight } = document.body.style;
    const anchoBarra = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (anchoBarra > 0) document.body.style.paddingRight = `${anchoBarra}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [activo]);
}
