"use client";

import { LabelForInput } from "../LabelForInput";
import FoodInput from "./FoodInput";
import RemoveButton from "./RemoveButton";
import { WeekMeals, DayMeals } from "../../Context";

interface InputWithLabelProps {
  mealType: keyof DayMeals;
  dayName: keyof WeekMeals;
}

export default function FoodSearchRemove({
  mealType,
  dayName,
}: InputWithLabelProps) {
  return (
    <div className="mx-auto flex flex-row justify-between gap-2">
      <div className="flex w-full flex-col md:gap-y-2">
        <LabelForInput mealType={mealType} />
        <FoodInput dayName={dayName} mealType={mealType} />
      </div>
      <div className="flex place-items-end space-x-2 sm:mb-1">
        <RemoveButton />
      </div>
    </div>
  );
}
