"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ICONO } from "@/components/ui/icono";
import { Logo } from "./Logo";
import { ENLACES_MENU } from "./navegacion";

/**
 * F1-03 · Header: logo + menú + CTA Reservar siempre visible.
 * Móvil: hamburguesa; el botón Reservar queda fijo arriba (header pegajoso, F1-02 §3).
 */
export function Header() {
  const ruta = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const esActivo = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-bosque text-blanco">
      <div className="contenedor flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {ENLACES_MENU.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  aria-current={esActivo(enlace.href) ? "page" : undefined}
                  className="border-b-2 border-transparent py-2 font-medium hover:border-blanco/50 aria-[current=page]:border-blanco"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/reservar" className="min-h-11 px-4 md:min-h-12 md:px-6">
            Reservar
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="-mr-2 rounded-boton p-3 hover:bg-bosque-profundo md:hidden"
          >
            {menuAbierto ? <X {...ICONO} /> : <Menu {...ICONO} />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-blanco/15 md:hidden">
          <ul className="contenedor flex flex-col py-2">
            {ENLACES_MENU.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  aria-current={esActivo(enlace.href) ? "page" : undefined}
                  className="block py-3 text-[17px] font-medium aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
