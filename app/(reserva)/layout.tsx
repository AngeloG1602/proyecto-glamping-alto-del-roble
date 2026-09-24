import { FooterReserva } from "@/components/layout/FooterReserva";
import { HeaderReserva } from "@/components/layout/HeaderReserva";

export default function LayoutReserva({ children }: LayoutProps<"/">) {
  return (
    <>
      <HeaderReserva />
      <main className="flex-1">{children}</main>
      <FooterReserva />
    </>
  );
}
