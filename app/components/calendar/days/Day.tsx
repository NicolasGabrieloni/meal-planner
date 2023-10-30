import FoodSearchRemove from "../FoodSearchRemove";
import { WeekMeals } from "../Context";

export interface DayTypes {
  dayName: keyof WeekMeals;
}

function Day({ dayName }: DayTypes) {
  return (
    <div className="w-full">
      <h2 className="text-md w-full border-b border-[#00785C] text-[#00785C] lg:border-b-2 lg:text-xl">
        {dayName}
      </h2>
      <div className="sm:flex sm:w-screen sm:flex-row sm:justify-between sm:gap-4 lg:gap-8">
        <div className="py-1 sm:w-1/2">
          <FoodSearchRemove mealType="Almuerzo" dayName={dayName} />
        </div>
        <div className="py-1 sm:mr-8 sm:w-1/2 lg:mr-28 xl:mr-40">
          <FoodSearchRemove mealType="Cena" dayName={dayName} />
        </div>
      </div>
    </div>
  );
}

export default Day;
