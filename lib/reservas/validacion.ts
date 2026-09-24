import { z } from "zod";

/**
 * Validación del formulario de reserva (F2-01 §6), compartida cliente/servidor.
 * Campos: nombre, correo, celular, # huéspedes, mascota sí/no, notas (opcional).
 * "Contacto" se divide en correo + celular (decisión de Angelo, 24 sep 2026):
 * el correo hace falta para la confirmación automática (Resend, F2-03 I-02).
 */
export function crearEsquemaHuesped(capacidad: number) {
  return z.object({
    nombre: z
      .string()
      .trim()
      .min(3, { error: "Escribe tu nombre completo." })
      .max(80, { error: "Máximo 80 caracteres." }),
    correo: z.email({ error: "Revisa el correo: ahí te llega la confirmación." }),
    celular: z
      .string()
      .trim()
      .transform((valor) => valor.replace(/[\s\-()]/g, ""))
      .pipe(
        z
          .string()
          .regex(/^(\+?57)?3\d{9}$/, { error: "Escribe un celular colombiano de 10 dígitos." }),
      ),
    numHuespedes: z
      .number({ error: "Elige cuántas personas vienen." })
      .int()
      .min(1, { error: "Elige cuántas personas vienen." })
      .max(capacidad, { error: `Este domo recibe máximo ${capacidad} personas.` }),
    mascota: z.enum(["si", "no"], { error: "Cuéntanos si traes mascota." }),
    notas: z.string().trim().max(500, { error: "Máximo 500 caracteres." }).optional(),
    // Ley 1581 (F2-04 §5): autorización expresa, casilla no premarcada
    consentimiento: z.literal(true, {
      error: "Necesitamos tu autorización para gestionar la reserva.",
    }),
    // Honeypot antispam (F2-01 §6): un humano nunca lo llena
    sitioWeb: z.string().max(0).optional(),
  });
}

export type DatosHuespedEntrada = z.input<ReturnType<typeof crearEsquemaHuesped>>;
export type DatosHuesped = z.output<ReturnType<typeof crearEsquemaHuesped>>;
