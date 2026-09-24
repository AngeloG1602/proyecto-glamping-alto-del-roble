import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Tipografía F1-01 §5: Fraunces (títulos 400/600) + Inter (cuerpo 400/500/600)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Glamping Alto del Roble — Domos con vista a la represa de Guatavita",
    template: "%s · Glamping Alto del Roble",
  },
  description:
    "Una escapada fuera del ruido, con vista a la represa. 6 domos en Guatavita, disponibilidad real y reserva confirmada al instante.",
  openGraph: {
    siteName: "Glamping Alto del Roble",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
