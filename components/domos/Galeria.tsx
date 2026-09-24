"use client";

import { useState } from "react";
import { Foto } from "@/components/ui/Foto";

type Props = { fotos: string[]; nombre: string };

/**
 * Galería de la ficha: foto principal + miniaturas. Sin carrusel automático (F1-06 §8).
 * Móvil: la foto principal mide 220px de alto (F1-06 §3).
 */
export function Galeria({ fotos, nombre }: Props) {
  const [actual, setActual] = useState(0);

  return (
    <div>
      <div className="relative h-[220px] overflow-hidden rounded-tarjeta bg-arena md:h-auto md:aspect-[16/10]">
        <Foto
          key={fotos[actual]}
          src={fotos[actual]}
          alt={`${nombre}, foto ${actual + 1} de ${fotos.length}`}
          sizes="(min-width: 800px) 760px, 100vw"
          prioridad={actual === 0}
        />
      </div>
      <ul className="mt-2 grid grid-cols-4 gap-2" aria-label="Fotos del domo">
        {fotos.map((foto, i) => (
          <li key={`${foto}-${i}`}>
            <button
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={i === actual}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-input bg-arena opacity-70 transition-opacity hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2 aria-[current=true]:ring-bosque"
            >
              <Foto src={foto} alt="" sizes="190px" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
