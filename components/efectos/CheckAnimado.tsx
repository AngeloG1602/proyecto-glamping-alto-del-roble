/** Check de éxito que se dibuja: primero el círculo, luego la marca, y un halo que se expande */
export function CheckAnimado({ tamano = 72 }: { tamano?: number }) {
  return (
    <span
      className="relative mx-auto flex items-center justify-center"
      style={{ width: tamano, height: tamano }}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-[halo_1.4s_var(--ease-salida)_700ms_both] rounded-full bg-exito/25"
      />
      <svg
        viewBox="0 0 52 52"
        width={tamano}
        height={tamano}
        aria-hidden
        className="relative text-exito"
      >
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="151"
          strokeDashoffset="151"
          className="animate-[dibujar_700ms_var(--ease-salida)_100ms_forwards]"
        />
        <path
          d="M15 27 l7.5 7.5 L37 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="36"
          strokeDashoffset="36"
          className="animate-[dibujar_450ms_var(--ease-salida)_650ms_forwards]"
        />
      </svg>
    </span>
  );
}
