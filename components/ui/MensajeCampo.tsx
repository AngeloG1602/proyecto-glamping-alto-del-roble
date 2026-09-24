type Props = { id: string; error?: string; ayuda?: string; idAyuda: string };

/** Mensaje de error debajo del campo, en el color de error (F1-03) */
export function MensajeCampo({ id, error, ayuda, idAyuda }: Props) {
  return (
    <>
      {ayuda && !error && (
        <p id={idAyuda} className="mt-2 text-pequeno text-marron">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={id} role="alert" className="mt-2 text-pequeno font-medium text-error">
          {error}
        </p>
      )}
    </>
  );
}
