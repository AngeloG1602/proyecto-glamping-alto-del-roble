"use client";

import Image from "next/image";
import { Mountain } from "lucide-react";
import { useState } from "react";
import { ICONO } from "./icono";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  prioridad?: boolean;
  className?: string;
};

/**
 * Imagen que llena su contenedor (el contenedor define la proporción).
 * Si la foto no carga, muestra un bloque arena en lugar de un ícono roto.
 */
export function Foto({ src, alt, sizes, prioridad = false, className = "" }: Props) {
  const [fallo, setFallo] = useState(false);

  if (fallo) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-arena text-marron ${className}`}
      >
        <Mountain {...ICONO} />
        <span className="text-pequeno">Foto no disponible</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={prioridad ? "eager" : "lazy"}
      fetchPriority={prioridad ? "high" : "auto"}
      onError={() => setFallo(true)}
      className={`object-cover ${className}`}
    />
  );
}
