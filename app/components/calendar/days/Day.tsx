import FoodSearchRemove from "../FoodSearchRemove";
import { WeekMeals } from "../Context";

export interface DayTypes {
  dayName: keyof WeekMeals;
}

function Day({ dayName }: DayTypes) {
  return (
    <div className="">
      <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
        {dayName}
      </h2>
      <div className="py-1">
        <FoodSearchRemove mealType="Almuerzo" dayName={dayName} />
      </div>
      <div className="py-1">
        <FoodSearchRemove mealType="Cena" dayName={dayName} />
      </div>
    </div>
  );
}

export default Day;
