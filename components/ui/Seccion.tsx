import type { ReactNode } from "react";

type Props = {
  id?: string;
  titulo?: string;
  subtitulo?: ReactNode;
  fondo?: "hueso" | "arena";
  children: ReactNode;
  className?: string;
};

/** Sección de página: fondo hueso o arena alterno (F1-01 §4), título en verde bosque */
export function Seccion({
  id,
  titulo,
  subtitulo,
  fondo = "hueso",
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`py-12 md:py-16 ${fondo === "arena" ? "bg-arena" : ""} ${id ? "scroll-mt-20" : ""} ${className}`}
    >
      <div className="contenedor">
        {titulo && (
          <header data-revelar className="mb-8 max-w-2xl md:mb-12">
            <h2 className="text-h2 text-bosque">{titulo}</h2>
            {subtitulo && <p className="mt-4 text-marron">{subtitulo}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
