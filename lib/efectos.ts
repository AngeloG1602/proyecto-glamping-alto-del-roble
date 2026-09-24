import type { CSSProperties } from "react";

/** Retraso escalonado para `data-revelar`: 0ms, 90ms, 180ms… */
export function retraso(indice: number, pasoMs = 90): CSSProperties {
  return { "--retraso": `${indice * pasoMs}ms` } as CSSProperties;
}

/** Nombre compartido entre la foto de la tarjeta de un domo y la galería de su ficha */
export function nombreTransicionFoto(slug: string) {
  return `foto-${slug}`;
}
