"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-revelar]:not([data-visible])";

/**
 * Un solo IntersectionObserver para todo el sitio: marca con `data-visible` cada elemento
 * con `data-revelar` cuando entra en pantalla (la animación vive en globals.css).
 * Así las páginas siguen siendo componentes de servidor y solo agregan un atributo.
 */
export function ActivadorRevelado() {
  const ruta = usePathname();

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.setAttribute("data-visible", "");
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observarNuevos = (raiz: ParentNode) =>
      raiz.querySelectorAll(SELECTOR).forEach((elemento) => observador.observe(elemento));

    observarNuevos(document);

    // Contenido que aparece después (p. ej. la tabla del comparador)
    const mutaciones = new MutationObserver((cambios) => {
      for (const cambio of cambios)
        cambio.addedNodes.forEach((nodo) => {
          if (!(nodo instanceof Element)) return;
          if (nodo.matches(SELECTOR)) observador.observe(nodo);
          observarNuevos(nodo);
        });
    });
    mutaciones.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mutaciones.disconnect();
    };
  }, [ruta]);

  return null;
}
