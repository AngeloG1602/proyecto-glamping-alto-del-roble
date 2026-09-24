import Link from "next/link";
import { Mail, MapPin, MessageCircle, PawPrint } from "lucide-react";
import { ICONO } from "@/components/ui/icono";
import { enlaceWhatsApp, NEGOCIO } from "@/lib/data/negocio";
import { Logo } from "./Logo";
import { ENLACES_MENU } from "./navegacion";

/** F1-03 · Footer: contacto, WhatsApp, RNT, redes, política de privacidad, mascotas sí */
export function Footer() {
  return (
    <footer className="mt-auto bg-bosque text-blanco">
      <div className="contenedor grid gap-12 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-pequeno">
            Una escapada fuera del ruido, con vista a la represa. {NEGOCIO.anosOperando} años
            recibiendo huéspedes en Guatavita.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-boton border border-blanco/30 px-3 py-2 text-pequeno font-medium">
            RNT {NEGOCIO.rnt}
          </p>
          <p className="mt-4 flex items-center gap-2 text-pequeno">
            <PawPrint {...ICONO} />
            Mascotas bienvenidas
          </p>
        </div>

        <div>
          <h2 className="font-cuerpo text-pequeno font-semibold tracking-wider uppercase">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-pequeno">
            <li>
              <a
                href={enlaceWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <MessageCircle {...ICONO} />
                WhatsApp {NEGOCIO.whatsappVisible}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${NEGOCIO.correo}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Mail {...ICONO} />
                {NEGOCIO.correo}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin {...ICONO} className="mt-0.5 shrink-0" />
              {NEGOCIO.direccion}
            </li>
            <li>
              <a
                href={NEGOCIO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram {NEGOCIO.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-cuerpo text-pequeno font-semibold tracking-wider uppercase">
            El glamping
          </h2>
          <ul className="mt-4 space-y-3 text-pequeno">
            {ENLACES_MENU.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className="hover:underline">
                  {enlace.texto}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidad" className="hover:underline">
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blanco/15">
        <p className="contenedor py-6 text-pequeno">
          © {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
