/** F1-03 · Input/Select/Checkbox: borde #DCD0BC, radio 6px, foco verde bosque + sombra sutil */
export const CLASES_CAMPO =
  "w-full rounded-input border border-borde bg-blanco px-4 py-3 text-cuerpo text-carbon placeholder:text-marron/70 outline-none transition-[border-color,box-shadow] focus:border-bosque focus:shadow-foco focus-visible:outline-none aria-[invalid=true]:border-error";

export function idsCampo(nombre: string) {
  return { error: `${nombre}-error`, ayuda: `${nombre}-ayuda` };
}
