import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { ICONO } from "./icono";

/**
 * F1-03 · Button. Primario = cobre, reservado para acciones (reservar, pagar — F1-06 §4).
 * Secundario = contorno verde bosque.
 */
type Variante = "primario" | "secundario";

const BASE =
  "relative inline-flex min-h-12 items-center justify-center gap-2 rounded-boton px-6 py-3 text-boton transition-colors disabled:pointer-events-none disabled:opacity-50";

const VARIANTES: Record<Variante, string> = {
  primario: "bg-cobre text-blanco hover:bg-cobre-oscuro",
  secundario: "border border-bosque bg-transparent text-bosque hover:bg-arena",
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
