"use client";

import { ButtonLink } from "@/components/ui/Button";
import { urlReservar, useSeleccionFechas } from "./SeleccionFechas";

type Props = {
  slug: string;
  variante: "primario" | "secundario";
  texto: string;
  id?: string;
  className?: string;
};

/** CTA de la ficha: lleva a /reservar con el domo y las fechas preseleccionados */
export function CtaReservarDomo({ slug, variante, texto, id, className }: Props) {
  const { rango } = useSeleccionFechas();
  return (
    <ButtonLink id={id} href={urlReservar(slug, rango)} variante={variante} className={className}>
      {texto}
    </ButtonLink>
  );
}
