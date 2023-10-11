import FoodSearchRemove from "@/components/calendar/FoodSearchRemove";
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
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Lunes
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Martes
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Miércoles
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Jueves
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Viernes
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Sábado
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <div className="">
          <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
            Domingo
          </h2>
          <div className="py-1">
            <FoodSearchRemove labelText="Almuerzo" />
          </div>
          <div className="py-1">
            <FoodSearchRemove labelText="Cena" />
          </div>
        </div>
        <ListButton label="Generar lista de compras" />
      </div>
    </div>
  );
}
