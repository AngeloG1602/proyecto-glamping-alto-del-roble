import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glamping Alto del Roble",
  description: "Domos con vista a la represa de Guatavita, Cundinamarca.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO">
      <body>{children}</body>
    </html>
  );
}
