import { DomoCardSkeleton } from "@/components/domos/DomoCard";

export default function Cargando() {
  return (
    <div className="contenedor py-12 md:py-16" aria-busy="true" aria-label="Cargando domos">
      <div className="mb-8 h-12 w-64 rounded-input esqueleto" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <DomoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
