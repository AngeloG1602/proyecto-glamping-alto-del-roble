"use client";

import { Expand } from "lucide-react";
import { useCallback, useState, ViewTransition } from "react";
import { Foto } from "@/components/ui/Foto";
import { nombreTransicionFoto } from "@/lib/efectos";
import { VisorFotos } from "./VisorFotos";

type Props = { fotos: string[]; nombre: string; slug: string };

/**
 * Galería de la ficha: foto principal + miniaturas, con fundido entre fotos y visor a
 * pantalla completa. Sin carrusel automático (F1-06 §8). Móvil: 220px de alto (F1-06 §3).
 */
export function Galeria({ fotos, nombre, slug }: Props) {
  const [actual, setActual] = useState(0);
  const [visorAbierto, setVisorAbierto] = useState(false);
  const cerrarVisor = useCallback(() => setVisorAbierto(false), []);

  return (
    <div>
      <ViewTransition name={nombreTransicionFoto(slug)} share="morph" default="none">
        <button
          type="button"
          onClick={() => setVisorAbierto(true)}
          aria-label={`Ampliar foto ${actual + 1} de ${fotos.length}`}
          className="group relative block h-[220px] w-full cursor-zoom-in overflow-hidden rounded-tarjeta bg-arena md:h-auto md:aspect-[16/10]"
        >
          {fotos.map((foto, i) => (
            <div
              key={`${foto}-${i}`}
              aria-hidden={i !== actual}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-salida ${
                i === actual ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            >
              <Foto
                src={foto}
                alt={i === actual ? `${nombre}, foto ${i + 1} de ${fotos.length}` : ""}
                sizes="(min-width: 800px) 760px, 100vw"
                prioridad={i === 0}
                className="transition-transform duration-[1400ms] ease-salida group-hover:scale-[1.03]"
              />
            </div>
          ))}
          <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-carbon/55 px-3 py-1.5 text-pequeno text-blanco opacity-90 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <Expand size={16} strokeWidth={1.5} aria-hidden />
            {actual + 1} / {fotos.length}
          </span>
        </button>
      </ViewTransition>

      <ul className="mt-2 grid grid-cols-4 gap-2" aria-label="Fotos del domo">
        {fotos.map((foto, i) => (
          <li key={`${foto}-${i}`}>
            <button
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={i === actual}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-input bg-arena opacity-60 ring-0 ring-bosque ring-offset-2 ring-offset-hueso transition-[opacity,box-shadow] duration-300 hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2"
            >
              <Foto src={foto} alt="" sizes="190px" />
            </button>
          </li>
        ))}
      </ul>

      <VisorFotos
        fotos={fotos}
        nombre={nombre}
        abierto={visorAbierto}
        indice={actual}
        onCambiar={setActual}
        onCerrar={cerrarVisor}
      />
    </div>
  );
}
