import Day from "@/components/calendar/days/Day";
import ListButton from "@/components/ui/ListButton";
import { Metadata } from "next";
import { WeeklyFoodProvider } from "@/Context";
import { WeekMeals } from "@/Context";
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
      <h1 className="pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
        Calendario semanal
      </h1>
      <WeeklyFoodProvider>
        <div className="relative flex flex-col items-center space-y-6">
          <div className="absolute right-0 top-0 pb-4">
            <SaveData />
          </div>
          <Day dayName="Lunes" />
          <Day dayName="Martes" />
          <Day dayName="Miercoles" />
          <Day dayName="Jueves" />
          <Day dayName="Viernes" />
          <ListButton label="Lista de compras" />
        </div>
      </WeeklyFoodProvider>
    </div>
  );
}
