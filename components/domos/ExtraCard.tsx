import { Card } from "@/components/ui/Card";
import { Foto } from "@/components/ui/Foto";
import { FOTOS_EXTRAS, type Extra } from "@/lib/data/domos";
import { formatearPesos } from "@/lib/formato";

type Props = { extra: Extra; fondo?: "hueso" | "arena"; compacta?: boolean };

/** Extra con precio propio y jerarquía visual real, no como anexo (F1-01 §2, ref. 4) */
export function ExtraCard({ extra, fondo = "hueso", compacta = false }: Props) {
  return (
    <Card fondo={fondo} className="group flex flex-col">
      <div className={`relative overflow-hidden ${compacta ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <Foto
          src={FOTOS_EXTRAS[extra.id]}
          alt={extra.nombre}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1400ms] ease-salida group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div
          className={`flex gap-x-4 gap-y-1 ${compacta ? "flex-col" : "items-baseline justify-between"}`}
        >
          <h3 className="text-h3 text-bosque">{extra.nombre}</h3>
          <p className="shrink-0 font-semibold">{formatearPesos(extra.precio)}</p>
        </div>
        <p className={`mt-2 text-marron ${compacta ? "line-clamp-2" : ""}`}>{extra.descripcion}</p>
      </div>
    </Card>
  );
}
