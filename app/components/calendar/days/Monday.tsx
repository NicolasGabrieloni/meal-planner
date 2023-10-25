import FoodInput from "../FoodInput";
import FoodSearchRemove from "../FoodSearchRemove";

interface DayTypes {
  dayName: string;
}

function Day({ dayName }: DayTypes) {
  return (
    <div className="">
      <h2 className="text-md min-w-[280px] border-b border-[#00785C] text-[#00785C]">
        {dayName}
      </h2>
      <div className="py-1">
        <FoodSearchRemove labelText="Almuerzo" />
      </div>
      <div className="py-1">
        <FoodSearchRemove labelText="Cena" />
      </div>
    </div>
  );
}

export default Day;
