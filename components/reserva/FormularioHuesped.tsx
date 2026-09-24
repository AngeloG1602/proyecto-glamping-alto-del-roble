"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Checkbox, GrupoRadio } from "@/components/ui/Checkbox";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { resolverZod } from "@/lib/formularios/resolverZod";
import {
  crearEsquemaHuesped,
  type DatosHuesped,
  type DatosHuespedEntrada,
} from "@/lib/reservas/validacion";

type Props = {
  capacidad: number;
  valoresIniciales?: Partial<DatosHuespedEntrada>;
  onEnviar: (datos: DatosHuesped) => void;
  onVolver: () => void;
};

/** Paso 3 · Datos del huésped (F1-06 §6: solo lo indispensable) */
export function FormularioHuesped({ capacidad, valoresIniciales, onEnviar, onVolver }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosHuespedEntrada, unknown, DatosHuesped>({
    resolver: resolverZod(crearEsquemaHuesped(capacidad)),
    defaultValues: { sitioWeb: "", ...valoresIniciales },
    shouldFocusError: true,
  });

  return (
    <form onSubmit={handleSubmit(onEnviar)} noValidate className="space-y-6">
      <Input
        etiqueta="Nombre completo"
        autoComplete="name"
        error={errors.nombre?.message}
        {...register("nombre")}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          etiqueta="Correo electrónico"
          type="email"
          autoComplete="email"
          inputMode="email"
          ayuda="Aquí te llega la confirmación."
          error={errors.correo?.message}
          {...register("correo")}
        />
        <Input
          etiqueta="Celular (WhatsApp)"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="300 123 4567"
          error={errors.celular?.message}
          {...register("celular")}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Select
          etiqueta="¿Cuántas personas vienen?"
          error={errors.numHuespedes?.message}
          defaultValue=""
          {...register("numHuespedes", { valueAsNumber: true })}
        >
          <option value="" disabled>
            Elige
          </option>
          {Array.from({ length: capacidad }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </Select>
        <GrupoRadio
          leyenda="¿Traes mascota?"
          opciones={[
            { valor: "si", etiqueta: "Sí" },
            { valor: "no", etiqueta: "No" },
          ]}
          error={errors.mascota?.message}
          {...register("mascota")}
        />
      </div>
      <Textarea
        etiqueta="Notas"
        opcional
        placeholder="Hora aproximada de llegada, alergias, una fecha especial…"
        error={errors.notas?.message}
        {...register("notas")}
      />

      {/* Honeypot antispam (F2-01 §6): oculto para personas */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sitioWeb">No llenes este campo</label>
        <input id="sitioWeb" tabIndex={-1} autoComplete="off" {...register("sitioWeb")} />
      </div>

      <Checkbox
        etiqueta={
          <>
            Autorizo el tratamiento de mis datos para gestionar esta reserva, según la{" "}
            <Link
              href="/politica-de-privacidad"
              target="_blank"
              className="text-bosque underline underline-offset-2"
            >
              política de privacidad
            </Link>
            .
          </>
        }
        error={errors.consentimiento?.message}
        {...register("consentimiento")}
      />

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onVolver}
          className="py-3 text-bosque underline underline-offset-4"
        >
          Volver a experiencias
        </button>
        <Button type="submit" variante="secundario">
          Continuar al pago
        </Button>
      </div>
    </form>
  );
}
