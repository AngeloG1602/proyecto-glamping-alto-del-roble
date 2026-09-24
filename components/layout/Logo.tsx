import Link from "next/link";

/**
 * Logotipo provisional en texto (Fraunces). F1-01 §3: el logo aún no existe y se produce
 * dentro del proyecto; se reemplaza por el SVG cuando esté listo.
 */
export function Logo({ tono = "claro" }: { tono?: "claro" | "oscuro" }) {
  const color = tono === "claro" ? "text-blanco" : "text-bosque";
  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${color}`}>
      <span className="font-titulo text-[22px] font-semibold tracking-tight">Alto del Roble</span>
      <span className="mt-1 text-[11px] font-medium tracking-[0.18em] uppercase opacity-90">
        Glamping · Guatavita
      </span>
    </Link>
  );
}
