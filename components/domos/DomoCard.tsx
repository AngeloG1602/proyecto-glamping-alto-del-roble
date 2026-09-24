import Link from "next/link";
import { Users } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Foto } from "@/components/ui/Foto";
import { ICONO } from "@/components/ui/icono";
import type { Domo } from "@/lib/data/domos";
import { formatearPesos } from "@/lib/formato";
import { TARIFA_MINIMA } from "@/lib/reservas/precios";

type Props = {
  domo: Domo;
  fondo?: "hueso" | "arena";
  prioridad?: boolean;
  /** Control adicional sobre la tarjeta (p. ej. casilla "Comparar") */
  accion?: ReactNode;
};

/** Tarjeta de domo: foto, nombre, descripción corta, capacidad y precio desde */
export function DomoCard({ domo, fondo = "hueso", prioridad = false, accion }: Props) {
  return (
    <Card sombra fondo={fondo} className="group relative flex flex-col">
      <div className="relative aspect-[4/3]">
        <Foto
          src={domo.fotos[0]}
          alt={`${domo.nombre}, vista general`}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          prioridad={prioridad}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 text-bosque">
          <Link
            href={`/domos/${domo.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:underline-offset-4"
          >
            {domo.nombre}
          </Link>
        </h3>
        <p className="mt-2 text-marron">{domo.descripcionCorta}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="flex items-center gap-2 text-pequeno text-marron">
            <Users {...ICONO} />
            Hasta {domo.capacidad} personas
          </p>
          <p className="text-right text-pequeno text-marron">
            Desde{" "}
            <span className="block text-cuerpo font-semibold text-carbon">
              {formatearPesos(TARIFA_MINIMA)}
            </span>
            por noche
          </p>
        </div>
        {accion && <div className="relative z-10 mt-4 border-t border-borde pt-4">{accion}</div>}
      </div>
    </Card>
  );
}

/** F1-03: skeleton simple de la tarjeta mientras carga */
export function DomoCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-tarjeta bg-hueso shadow-sutil">
      <div className="aspect-[4/3] bg-arena" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-1/2 rounded-input bg-arena" />
        <div className="h-4 w-full rounded-input bg-arena" />
        <div className="h-4 w-3/4 rounded-input bg-arena" />
        <div className="h-10 w-1/3 rounded-input bg-arena" />
      </div>
    </div>
  );
}
