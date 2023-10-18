import { Metadata } from "next";
import Shop from "@/components/shoplist/ShopList";

export const metadata: Metadata = {
  title: "Lista de compras",
};

export default function ShopList() {
  return (
    <>
      <Shop />
    </>
  );
}
