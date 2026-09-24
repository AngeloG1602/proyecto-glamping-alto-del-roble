import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function LayoutSitio({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
