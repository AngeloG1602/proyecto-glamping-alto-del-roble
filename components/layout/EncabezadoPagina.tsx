import type { ReactNode } from "react";

/** Título de página interna con bajada */
export function EncabezadoPagina({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <header className="contenedor pt-12 pb-8 md:pt-16">
      <h1 className="max-w-3xl animate-entrada text-h1 text-bosque">{titulo}</h1>
      {children && (
        <div
          className="mt-4 max-w-2xl animate-entrada text-[18px] text-marron"
          style={{ animationDelay: "120ms" }}
        >
          {children}
        </div>
      )}
    </header>
  );
}
