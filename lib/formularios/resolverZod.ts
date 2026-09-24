import type { FieldError, FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

/**
 * Conecta un esquema Zod con react-hook-form (F2-01 §2: react-hook-form + Zod),
 * sin agregar @hookform/resolvers como dependencia.
 */
export function resolverZod<TEntrada extends FieldValues, TSalida extends FieldValues>(
  esquema: z.ZodType<TSalida, TEntrada>,
): Resolver<TEntrada, unknown, TSalida> {
  return async (valores) => {
    const resultado = await esquema.safeParseAsync(valores);
    if (resultado.success) return { values: resultado.data, errors: {} };

    const errores: Record<string, FieldError> = {};
    for (const problema of resultado.error.issues) {
      const ruta = problema.path.join(".");
      if (ruta && !errores[ruta])
        errores[ruta] = { type: problema.code, message: problema.message };
    }
    return { values: {}, errors: errores as FieldErrors<TEntrada> };
  };
}
