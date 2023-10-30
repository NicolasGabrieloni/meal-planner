import Day from "@/components/calendar/days/Day";
import ListButton from "@/components/ui/ListButton";
import { Metadata } from "next";
import { WeeklyFoodProvider } from "@/components/calendar/Context";
import { WeekMeals } from "@/components/calendar/Context";
import SaveData from "@/components/calendar/saveData";

export const metadata: Metadata = {
  title: "Calendario",
};

interface Day {
  dayName: keyof WeekMeals;
}

export default function Calendar() {
  return (
    <div className="p-4">
      <h1 className="pb-2 text-xl font-medium text-[#00785C]">
        Calendario semanal
      </h1>
      <WeeklyFoodProvider>
        <div className="flex flex-col items-center space-y-6">
          <SaveData />
          <Day dayName="Lunes" />
          <Day dayName="Martes" />
          <Day dayName="Miercoles" />
          <Day dayName="Jueves" />
          <Day dayName="Viernes" />
          <ListButton label="Generar lista de compras" />
        </div>
      </WeeklyFoodProvider>
    </div>
  );
}
