import type { ComponentProps, ReactNode } from "react";
import { idsCampo } from "./campos";
import { MensajeCampo } from "./MensajeCampo";

const CLASES_MARCA =
  "mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-borde bg-blanco transition-colors checked:border-bosque checked:bg-bosque checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23FFFDF9%22 stroke-width=%223%22><path d=%22M20 6 9 17l-5-5%22/></svg>')] bg-center bg-no-repeat bg-[length:14px] focus:shadow-foco focus-visible:outline-none aria-[invalid=true]:border-error";

type Props = Omit<ComponentProps<"input">, "type"> & {
  name: string;
  etiqueta: ReactNode;
  error?: string;
};

/** F1-03 · Checkbox */
export function Checkbox({ etiqueta, error, className = "", ...props }: Props) {
  const id = props.id ?? props.name;
  const ids = idsCampo(props.name);
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-cuerpo">
        <input
          {...props}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ids.error : undefined}
          className={CLASES_MARCA}
        />
        <span>{etiqueta}</span>
      </label>
      <MensajeCampo id={ids.error} idAyuda={ids.ayuda} error={error} />
    </div>
  );
}

type PropsRadio = Omit<ComponentProps<"input">, "type"> & {
  name: string;
  leyenda: string;
  opciones: { valor: string; etiqueta: string }[];
  error?: string;
};

/** Grupo de opciones excluyentes (p. ej. mascota sí/no) con el mismo estilo de campo */
export function GrupoRadio({ leyenda, opciones, error, className = "", ...props }: PropsRadio) {
  const ids = idsCampo(props.name);
  return (
    <fieldset className={className} aria-describedby={error ? ids.error : undefined}>
      <legend className="mb-2 block text-pequeno font-medium text-carbon">{leyenda}</legend>
      <div className="flex gap-4">
        {opciones.map((opcion) => (
          <label
            key={opcion.valor}
            className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-input border border-borde bg-blanco px-4 has-[:checked]:border-bosque has-[:checked]:shadow-foco"
          >
            <input {...props} type="radio" value={opcion.valor} className="size-4 accent-bosque" />
            {opcion.etiqueta}
          </label>
        ))}
      </div>
      <MensajeCampo id={ids.error} idAyuda={ids.ayuda} error={error} />
    </fieldset>
  );
}
