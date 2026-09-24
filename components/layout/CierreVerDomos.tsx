import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ICONO } from "@/components/ui/icono";
import { enlaceWhatsApp } from "@/lib/data/negocio";

type Props = { titulo: string; texto?: string; textoBoton?: string };

/** Cierre de páginas sin acción propia: → Ver domos, secundaria WhatsApp (F1-06 §1) */
export function CierreVerDomos({ titulo, texto, textoBoton = "Ver los domos" }: Props) {
  return (
    <section className="bg-arena py-12 md:py-16">
      <div data-revelar className="contenedor flex flex-col items-center gap-4 text-center">
        <h2 className="text-h2 text-bosque">{titulo}</h2>
        {texto && <p className="max-w-xl text-marron">{texto}</p>}
        <ButtonLink href="/domos" variante="secundario" className="mt-2 w-full sm:w-auto sm:px-12">
          {textoBoton}
        </ButtonLink>
        <a
          href={enlaceWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pequeno text-bosque underline underline-offset-4"
        >
          <MessageCircle {...ICONO} />
          ¿Prefieres preguntar primero? Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
