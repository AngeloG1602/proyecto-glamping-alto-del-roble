import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { ICONO } from "./icono";

type Props = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  children: ReactNode;
  className?: string;
  /** "claro" para usar sobre imágenes o fondos oscuros */
  tono?: "oscuro" | "claro";
};

const TONOS = {
  oscuro: "text-bosque decoration-bosque/40 hover:decoration-bosque",
  claro: "text-blanco decoration-blanco/50 hover:decoration-blanco",
};

/** Enlace de texto con flecha que avanza al pasar el cursor */
export function EnlaceFlecha({ children, className = "", tono = "oscuro", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-2 font-medium underline underline-offset-4 transition-colors ${TONOS[tono]} ${className}`}
    >
      {children}
      <ArrowRight
        {...ICONO}
        className="transition-transform duration-300 ease-salida group-hover:translate-x-1"
      />
    </Link>
  );
}
