import type { ComponentProps } from "react";

/** F1-03 · Card: radio 12px, fondo hueso o arena según la sección. Sombra solo en domos. */
type Props = ComponentProps<"div"> & { fondo?: "hueso" | "arena"; sombra?: boolean };

export function Card({ fondo = "hueso", sombra = false, className = "", ...props }: Props) {
  const color = fondo === "arena" ? "bg-arena" : "bg-hueso";
  return (
    <div
      {...props}
      className={`overflow-hidden rounded-tarjeta ${color} ${sombra ? "shadow-sutil" : "border border-borde"} ${className}`}
    />
  );
}
