"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { ENLACES_MENU } from "./navegacion";

/**
 * F1-03 · Header: logo + menú + CTA Reservar siempre visible.
 * En el inicio arranca transparente sobre el hero y se vuelve sólido al hacer scroll.
 * Móvil: hamburguesa animada; el botón Reservar queda fijo arriba (F1-02 §3).
 */
export function Header() {
  const ruta = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);
  const esActivo = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  useEffect(() => {
    let cuadro = 0;
    const revisar = () => {
      cuadro = 0;
      setConScroll(window.scrollY > 24);
    };
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alScroll);
    };
  }, []);

  const transparente = ruta === "/" && !conScroll && !menuAbierto;

  return (
    <header
      style={{ viewTransitionName: "encabezado" }}
      className={`sticky top-0 z-40 text-blanco transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-salida ${
        transparente
          ? "bg-transparent"
          : "bg-bosque/95 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md"
      }`}
    >
      <div className="contenedor flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {ENLACES_MENU.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  aria-current={esActivo(enlace.href) ? "page" : undefined}
                  className="relative py-2 font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-blanco after:transition-transform after:duration-500 after:ease-salida hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
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
            className="group -mr-2 flex size-11 flex-col items-center justify-center gap-[5px] rounded-boton hover:bg-blanco/10 md:hidden"
          >
            {/* Tres líneas que se convierten en una X */}
            <span
              className={`h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-salida ${menuAbierto ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-[1.5px] w-5 rounded-full bg-current transition-[opacity,transform] duration-300 ${menuAbierto ? "scale-x-0 opacity-0" : ""}`}
            />
            <span
              className={`h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-salida ${menuAbierto ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil: se despliega con grid-rows (altura automática animable) */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-salida md:hidden ${menuAbierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav
          id="menu-movil"
          aria-label="Principal"
          inert={!menuAbierto}
          className="overflow-hidden"
        >
          <ul className="contenedor flex flex-col border-t border-blanco/15 py-2">
            {ENLACES_MENU.map((enlace, i) => (
              <li
                key={enlace.href}
                className={`transition-[opacity,transform] duration-500 ease-salida ${menuAbierto ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
                style={{ transitionDelay: menuAbierto ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  aria-current={esActivo(enlace.href) ? "page" : undefined}
                  className="block py-3 font-titulo text-[22px] font-semibold aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
