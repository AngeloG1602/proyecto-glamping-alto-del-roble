import type { ComponentProps } from "react";

/** F1-03 · Card: radio 12px, fondo hueso o arena según la sección. Sombra solo en domos. */
type Props = ComponentProps<"div"> & {
  fondo?: "hueso" | "arena";
  sombra?: boolean;
  /** Se eleva al pasar el cursor (tarjetas que llevan a otra página) */
  interactiva?: boolean;
};

export function Card({
  fondo = "hueso",
  sombra = false,
  interactiva = false,
  className = "",
  ...props
}: Props) {
  const color = fondo === "arena" ? "bg-arena" : "bg-hueso";
  const elevacion = interactiva
    ? "transition-[transform,box-shadow] duration-500 ease-salida hover:-translate-y-1.5 hover:shadow-elevada"
    : "";
  return (
    <div
      {...props}
      className={`overflow-hidden rounded-tarjeta ${color} ${sombra ? "shadow-sutil" : "border border-borde"} ${elevacion} ${className}`}
    />
  );
}
