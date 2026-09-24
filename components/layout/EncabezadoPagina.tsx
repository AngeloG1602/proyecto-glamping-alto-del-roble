import type { ReactNode } from "react";

/** Título de página interna con bajada */
export function EncabezadoPagina({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <header className="contenedor pt-12 pb-8 md:pt-16">
      <h1 className="max-w-3xl text-h1 text-bosque">{titulo}</h1>
      {children && <div className="mt-4 max-w-2xl text-[18px] text-marron">{children}</div>}
    </header>
  );
}
