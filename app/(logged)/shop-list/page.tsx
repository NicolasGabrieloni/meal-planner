import { Metadata } from "next";
import Shop from "@/components/shoplist/ShopList";
import { WeeklyFoodProvider } from "@/components/calendar/Context";

export const metadata: Metadata = {
  title: "Lista de compras",
};

export default function ShopList() {
  return (
    <>
      <WeeklyFoodProvider>
        <Shop />
      </WeeklyFoodProvider>
    </>
  );
}
