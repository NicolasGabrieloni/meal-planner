import FoodSearchRemove from "@/components/calendar/FoodSearchRemove";
import Day from "@/components/calendar/days/Monday";
import ListButton from "@/components/ui/ListButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario",
};

export default function Calendar() {
  return (
    <div className="p-4">
      <h1 className="pb-2 text-xl font-medium text-[#00785C]">
        Calendario semanal
      </h1>
      <div className="flex flex-col items-center space-y-6">
        <Day dayName="Lunes" />
        <Day dayName="Martes" />
        <Day dayName="Miércoles" />
        <Day dayName="Jueves" />
        <Day dayName="Viernes" />
        <ListButton label="Generar lista de compras" />
      </div>
    </div>
  );
}
