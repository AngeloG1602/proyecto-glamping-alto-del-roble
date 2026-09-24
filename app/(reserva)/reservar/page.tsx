import type { Metadata } from "next";
import { FlujoReserva } from "@/components/reserva/FlujoReserva";
import type { RangoFechas } from "@/components/domos/CalendarioDisponibilidad";
import { DOMOS, obtenerDomoPorSlug } from "@/lib/data/domos";
import { nochesOcupadas, verificarDisponibilidad } from "@/lib/reservas/disponibilidad";
import { esFechaISOValida, sumarDias } from "@/lib/reservas/fechas";

export const metadata: Metadata = {
  title: "Reservar",
  description:
    "Elige tu domo y tus fechas, agrega experiencias y paga en línea. Tu reserva queda confirmada al instante.",
  robots: { index: false },
};

const texto = (valor: string | string[] | undefined) => (typeof valor === "string" ? valor : null);

/** Entrada desde la ficha: ?domo=slug&entrada=yyyy-MM-dd&salida=yyyy-MM-dd (F1-02 §2) */
export default async function Reservar(props: PageProps<"/reservar">) {
  const parametros = await props.searchParams;
  const domo = obtenerDomoPorSlug(texto(parametros.domo) ?? "");
  const entrada = texto(parametros.entrada);
  const salida = texto(parametros.salida);

  let rangoInicial: RangoFechas = { entrada: null, salida: null };
  if (domo && esFechaISOValida(entrada)) {
    if (esFechaISOValida(salida) && verificarDisponibilidad(domo.id, entrada, salida).disponible) {
      rangoInicial = { entrada, salida };
    } else if (verificarDisponibilidad(domo.id, entrada, sumarDias(entrada, 1)).disponible) {
      rangoInicial = { entrada, salida: null };
    }
  }

  const ocupadasPorDomo = Object.fromEntries(
    DOMOS.map((opcion) => [opcion.id, [...nochesOcupadas(opcion.id)]]),
  );

  return (
    <FlujoReserva
      domoInicial={domo?.id ?? null}
      rangoInicial={rangoInicial}
      ocupadasPorDomo={ocupadasPorDomo}
    />
  );
}
