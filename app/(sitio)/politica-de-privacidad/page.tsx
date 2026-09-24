import type { Metadata } from "next";
import { Info } from "lucide-react";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { ICONO } from "@/components/ui/icono";
import { NEGOCIO } from "@/lib/data/negocio";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo tratamos tus datos personales en Glamping Alto del Roble, conforme a la Ley 1581 de 2012.",
};

/**
 * Estructura según F2-04 §5 (Ley 1581 / Habeas Data).
 * ⚠️ Texto de EJEMPLO — pendiente de revisión por un abogado (F1-02 §4).
 */
export default function PoliticaPrivacidad() {
  return (
    <>
      <EncabezadoPagina titulo="Política de privacidad" />
      <div className="contenedor max-w-[800px] pb-12 md:pb-16">
        <p className="mb-8 flex gap-3 rounded-input border border-borde bg-arena p-4 text-pequeno">
          <Info {...ICONO} className="mt-0.5 shrink-0 text-bosque" />
          Borrador pendiente de revisión legal. El texto definitivo lo valida un abogado antes de
          publicar el sitio.
        </p>

        <div className="space-y-8 [&_h2]:text-h3 [&_h2]:text-bosque [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <section>
            <h2>Responsable del tratamiento</h2>
            <p>
              {NEGOCIO.nombre}, con dirección en {NEGOCIO.direccion}, correo {NEGOCIO.correo} y
              WhatsApp {NEGOCIO.whatsappVisible}, es responsable del tratamiento de los datos
              personales que recoge este sitio, conforme a la Ley 1581 de 2012 y sus decretos
              reglamentarios.
            </p>
          </section>

          <section>
            <h2>Qué datos recogemos</h2>
            <ul>
              <li>
                Al reservar: nombre, correo, celular, número de huéspedes, si traes mascota y las
                notas que nos dejes.
              </li>
              <li>
                Los datos de tu tarjeta o cuenta los procesa directamente la pasarela de pagos;
                nosotros nunca los vemos ni los guardamos.
              </li>
              <li>
                Datos de navegación agregados para medir el funcionamiento del sitio, sin
                identificarte personalmente.
              </li>
            </ul>
          </section>

          <section>
            <h2>Para qué los usamos</h2>
            <p>
              Únicamente para gestionar tu reserva y contactarte sobre ella: confirmarla, enviarte
              indicaciones de llegada y atender cambios o cancelaciones. No vendemos ni cedemos tus
              datos a terceros.
            </p>
          </section>

          <section>
            <h2>Cuánto tiempo los guardamos</h2>
            <p>
              Los datos de reserva se conservan durante 2 años por efectos contables y luego se
              eliminan.
            </p>
          </section>

          <section>
            <h2>Tus derechos</h2>
            <p>Como titular de los datos puedes, en cualquier momento:</p>
            <ul>
              <li>Conocer, actualizar y rectificar tus datos.</li>
              <li>Solicitar prueba de la autorización que nos diste.</li>
              <li>Saber qué uso les hemos dado.</li>
              <li>
                Revocar la autorización o pedir que los eliminemos, cuando no exista un deber legal
                de conservarlos.
              </li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
            </ul>
          </section>

          <section>
            <h2>Cómo ejercerlos</h2>
            <p>
              Escríbenos a {NEGOCIO.correo} indicando tu nombre y tu solicitud. Respondemos en los
              plazos que fija la ley.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
