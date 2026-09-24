import { ViewTransition, type ReactNode } from "react";

/** Transición suave entre páginas (View Transitions API; sin soporte, cambia sin animar) */
export default function Plantilla({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="pagina" exit="pagina" default="none">
      {children}
    </ViewTransition>
  );
}
