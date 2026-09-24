"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { EnlaceFlecha } from "@/components/ui/EnlaceFlecha";
import { ICONO } from "@/components/ui/icono";

/**
 * Capas del paisaje, de la más lejana a la más cercana.
 * `scroll`: cuánto se desplaza con el scroll (más lejos = más lento respecto al contenido).
 * `raton`: amplitud en px del desplazamiento con el mouse (más cerca = más movimiento).
 */
const CAPAS = [
  { nombre: "cielo", scroll: 0.6, raton: 4 },
  { nombre: "nubes", scroll: 0.55, raton: 8, deriva: true },
  { nombre: "montes", scroll: 0.42, raton: 10 },
  { nombre: "lago", scroll: 0.3, raton: 14 },
  { nombre: "colina", scroll: 0.16, raton: 22 },
  { nombre: "frente", scroll: -0.06, raton: 36 },
] as const;

const TITULO = "Una escapada fuera del ruido, con vista a la represa";

const SELLOS = ["6 domos frente a la represa", "Disponibilidad real", "Confirmación al instante"];

/** Hero de pantalla completa con parallax por capas (scroll + mouse) */
export function HeroInmersivo() {
  const seccion = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodo = seccion.current;
    if (!nodo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    let cuadro = 0;
    const objetivo = { x: 0, y: 0 };
    const actual = { x: 0, y: 0 };

    const pintar = () => {
      cuadro = 0;
      // Suavizado: el paisaje "persigue" al cursor en lugar de saltar
      actual.x += (objetivo.x - actual.x) * 0.08;
      actual.y += (objetivo.y - actual.y) * 0.08;
      nodo.style.setProperty("--sy", String(Math.min(window.scrollY, nodo.offsetHeight)));
      nodo.style.setProperty("--mx", actual.x.toFixed(4));
      nodo.style.setProperty("--my", actual.y.toFixed(4));
      const falta = Math.abs(objetivo.x - actual.x) + Math.abs(objetivo.y - actual.y) > 0.001;
      if (falta && visible) cuadro = requestAnimationFrame(pintar);
    };
    const pedirCuadro = () => {
      if (!cuadro && visible) cuadro = requestAnimationFrame(pintar);
    };

    const alMover = (evento: PointerEvent) => {
      const caja = nodo.getBoundingClientRect();
      objetivo.x = ((evento.clientX - caja.left) / caja.width - 0.5) * 2;
      objetivo.y = ((evento.clientY - caja.top) / caja.height - 0.5) * 2;
      pedirCuadro();
    };

    const vigia = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      if (visible) pedirCuadro();
    });
    vigia.observe(nodo);

    window.addEventListener("scroll", pedirCuadro, { passive: true });
    const punteroFino = matchMedia("(pointer: fine)").matches;
    if (punteroFino) nodo.addEventListener("pointermove", alMover);
    pedirCuadro();

    return () => {
      cancelAnimationFrame(cuadro);
      vigia.disconnect();
      window.removeEventListener("scroll", pedirCuadro);
      nodo.removeEventListener("pointermove", alMover);
    };
  }, []);

  const palabras = TITULO.split(" ");

  return (
    <section
      ref={seccion}
      aria-label="Bienvenida"
      className="relative -mt-16 flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-[#34405e] md:-mt-20"
    >
      {/* Paisaje por capas */}
      {/* En pantallas altas el paisaje baja para dejar el cielo libre al texto */}
      <div aria-hidden className="absolute inset-0 translate-y-[12%] sm:translate-y-[6%]">
        {CAPAS.map((capa, i) => (
          <div
            key={capa.nombre}
            className="absolute -inset-[6%] will-change-transform"
            style={{
              transform: `translate3d(calc(var(--mx, 0) * ${-capa.raton}px), calc(var(--sy, 0) * ${capa.scroll}px + var(--my, 0) * ${-capa.raton * 0.5}px), 0)`,
            }}
          >
            <div
              className="absolute inset-0 animate-entrada"
              style={{ animationDelay: `${i * 110}ms`, animationDuration: "1400ms" }}
            >
              <div className={`absolute inset-0 ${"deriva" in capa ? "animate-deriva" : ""}`}>
                <Image
                  src={`/fotos/hero/hero-${capa.nombre}.webp`}
                  alt=""
                  fill
                  loading="eager"
                  fetchPriority={i < 2 || capa.nombre === "colina" ? "high" : "auto"}
                  sizes="112vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Legibilidad del texto arriba y fundido hacia la página abajo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_30%,rgb(43_38_33/0.45),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-carbon/60 via-carbon/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-hueso via-hueso/40 to-transparent"
      />

      {/* Contenido */}
      <div className="contenedor relative flex flex-1 flex-col items-center pt-[calc(64px+6vh)] text-center text-blanco md:pt-[calc(80px+7vh)]">
        <p
          className="animate-entrada text-pequeno font-semibold tracking-[0.22em] uppercase opacity-90"
          style={{ animationDelay: "300ms" }}
        >
          Glamping en Guatavita · a 2 horas de Bogotá
        </p>
        <h1 className="mt-4 max-w-4xl font-titulo text-[clamp(2.3rem,6vw,4.25rem)] leading-[1.04] font-semibold tracking-tight text-balance">
          {palabras.map((palabra, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span
                className="inline-block animate-entrada"
                style={
                  {
                    animationDelay: `${450 + i * 70}ms`,
                    animationDuration: "900ms",
                  } as CSSProperties
                }
              >
                {palabra}
                {i < palabras.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-5 max-w-xl animate-entrada text-[18px] opacity-95 md:text-[20px]"
          style={{ animationDelay: `${500 + palabras.length * 70}ms` }}
        >
          Tu domo, tu fin de semana, desconectado de verdad.
        </p>
        <div
          className="mt-8 flex animate-entrada flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: `${650 + palabras.length * 70}ms` }}
        >
          <ButtonLink href="/domos" variante="claro" className="px-8">
            Ver los domos
          </ButtonLink>
          <EnlaceFlecha id="cta-hero" href="/reservar" tono="claro" className="py-2">
            ¿Ya lo decidiste? Reserva directo
          </EnlaceFlecha>
        </div>
      </div>

      {/* Sellos + indicador de scroll */}
      <div
        className="relative z-10 flex animate-entrada flex-col items-center gap-5 pb-6"
        style={{ animationDelay: `${900 + palabras.length * 70}ms` }}
      >
        <ul className="hidden flex-wrap justify-center gap-2 sm:flex">
          {SELLOS.map((sello) => (
            <li
              key={sello}
              className="rounded-full border border-blanco/40 bg-carbon/25 px-4 py-1.5 text-pequeno font-medium text-blanco backdrop-blur-md"
            >
              {sello}
            </li>
          ))}
        </ul>
        <a
          href="#domos"
          aria-label="Bajar a los domos"
          className="flex size-11 items-center justify-center rounded-full border border-bosque/30 bg-hueso/70 text-bosque backdrop-blur-md transition-colors hover:bg-hueso"
        >
          <ChevronDown {...ICONO} className="animate-flotar" />
        </a>
      </div>
    </section>
  );
}
