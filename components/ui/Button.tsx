import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { ICONO } from "./icono";

/**
 * F1-03 · Button. Primario = cobre, reservado para acciones (reservar, pagar — F1-06 §4).
 * Secundario = contorno verde bosque.
 */
type Variante = "primario" | "secundario" | "claro";

const BASE =
  "group/boton relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-boton px-6 py-3 text-boton transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-salida active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const VARIANTES: Record<Variante, string> = {
  // Brillo que cruza el botón al pasar el cursor
  primario:
    "bg-cobre text-blanco hover:bg-cobre-oscuro hover:shadow-[0_8px_24px_-8px_rgb(168_85_38/0.6)] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12 before:bg-blanco/25 before:opacity-0 before:transition-[left,opacity] before:duration-700 before:ease-salida hover:before:left-[120%] hover:before:opacity-100",
  secundario: "border border-bosque bg-transparent text-bosque hover:bg-arena",
  // Contorno claro para usar sobre imágenes o fondos oscuros
  claro:
    "border border-blanco/80 bg-blanco/5 text-blanco backdrop-blur-sm hover:bg-blanco hover:text-bosque",
};

export function clasesBoton(variante: Variante = "primario", extra = "") {
  return `${BASE} ${VARIANTES[variante]} ${extra}`.trim();
}

type PropsComunes = { variante?: Variante; children: ReactNode; className?: string };

type PropsBoton = PropsComunes &
  Omit<ComponentProps<"button">, "className" | "children"> & { cargando?: boolean };

export function Button({
  variante = "primario",
  cargando = false,
  className = "",
  children,
  disabled,
  ...props
}: PropsBoton) {
  return (
    <button
      {...props}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      className={clasesBoton(variante, className)}
    >
      <span className={`inline-flex items-center gap-2 ${cargando ? "invisible" : ""}`}>
        {children}
      </span>
      {cargando && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle {...ICONO} className="animate-spin" />
          <span className="sr-only">Procesando…</span>
        </span>
      )}
    </button>
  );
}

type PropsEnlace = PropsComunes & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variante = "primario",
  className = "",
  children,
  ...props
}: PropsEnlace) {
  return (
    <Link {...props} className={clasesBoton(variante, className)}>
      {children}
    </Link>
  );
}
