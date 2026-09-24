import Link from "next/link";
import { NEGOCIO } from "@/lib/data/negocio";

/** Footer mínimo del flujo de reserva: RNT y política de privacidad */
export function FooterReserva() {
  return (
    <footer className="mt-auto border-t border-borde">
      <div className="contenedor flex flex-col gap-2 py-6 text-pequeno text-marron sm:flex-row sm:justify-between">
        <p>
          {NEGOCIO.nombre} · RNT {NEGOCIO.rnt}
        </p>
        <Link
          href="/politica-de-privacidad"
          className="underline underline-offset-2 hover:text-carbon"
        >
          Política de privacidad
        </Link>
      </div>
    </footer>
  );
}
