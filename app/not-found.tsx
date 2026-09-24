import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";

export default function NoEncontrada() {
  return (
    <>
      <Header />
      <main className="contenedor flex flex-1 flex-col items-center justify-center py-16 text-center">
        <p className="text-pequeno font-semibold tracking-wider text-marron uppercase">Error 404</p>
        <h1 className="mt-2 text-h1 text-bosque">Esta página no existe</h1>
        <p className="mt-4 max-w-md text-marron">
          Puede que el enlace esté mal escrito o que la página se haya movido. Los domos siguen en
          su lugar.
        </p>
        <ButtonLink href="/domos" variante="secundario" className="mt-8">
          Ver los domos
        </ButtonLink>
      </main>
      <Footer />
    </>
  );
}
