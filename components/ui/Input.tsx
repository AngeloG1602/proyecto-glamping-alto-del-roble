import type { ComponentProps } from "react";
import { CLASES_CAMPO, idsCampo } from "./campos";
import { MensajeCampo } from "./MensajeCampo";

type PropsBase = { etiqueta: string; error?: string; ayuda?: string; opcional?: boolean };

function describedBy(nombre: string, error?: string, ayuda?: string) {
  const ids = idsCampo(nombre);
  if (error) return ids.error;
  if (ayuda) return ids.ayuda;
  return undefined;
}

function Etiqueta({
  htmlFor,
  texto,
  opcional,
}: {
  htmlFor: string;
  texto: string;
  opcional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-pequeno font-medium text-carbon">
      {texto}
      {opcional && <span className="font-normal text-marron"> (opcional)</span>}
    </label>
  );
}

type PropsInput = PropsBase & ComponentProps<"input"> & { name: string };

export function Input({ etiqueta, error, ayuda, opcional, className = "", ...props }: PropsInput) {
  const id = props.id ?? props.name;
  return (
    <div className={className}>
      <Etiqueta htmlFor={id} texto={etiqueta} opcional={opcional} />
      <input
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(props.name, error, ayuda)}
        className={CLASES_CAMPO}
      />
      <MensajeCampo
        id={idsCampo(props.name).error}
        idAyuda={idsCampo(props.name).ayuda}
        error={error}
        ayuda={ayuda}
      />
    </div>
  );
}

type PropsTextarea = PropsBase & ComponentProps<"textarea"> & { name: string };

export function Textarea({
  etiqueta,
  error,
  ayuda,
  opcional,
  className = "",
  ...props
}: PropsTextarea) {
  const id = props.id ?? props.name;
  return (
    <div className={className}>
      <Etiqueta htmlFor={id} texto={etiqueta} opcional={opcional} />
      <textarea
        rows={3}
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(props.name, error, ayuda)}
        className={`${CLASES_CAMPO} resize-y`}
      />
      <MensajeCampo
        id={idsCampo(props.name).error}
        idAyuda={idsCampo(props.name).ayuda}
        error={error}
        ayuda={ayuda}
      />
    </div>
  );
}

type PropsSelect = PropsBase & ComponentProps<"select"> & { name: string };

export function Select({
  etiqueta,
  error,
  ayuda,
  opcional,
  className = "",
  children,
  ...props
}: PropsSelect) {
  const id = props.id ?? props.name;
  return (
    <div className={className}>
      <Etiqueta htmlFor={id} texto={etiqueta} opcional={opcional} />
      <select
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(props.name, error, ayuda)}
        className={`${CLASES_CAMPO} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B5F53%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_12px_center] bg-no-repeat pr-11`}
      >
        {children}
      </select>
      <MensajeCampo
        id={idsCampo(props.name).error}
        idAyuda={idsCampo(props.name).ayuda}
        error={error}
        ayuda={ayuda}
      />
    </div>
  );
}
