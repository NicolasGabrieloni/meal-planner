import { Label } from "@/components/ui/label";
import { DayMeals } from "./calendar/Context";

interface InputWithLabelProps {
  mealType: keyof DayMeals;
}

export function LabelForInput({ mealType }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center md:mt-4">
      <Label className="text-xs md:text-sm lg:text-base" htmlFor="day-name">
        {mealType}
      </Label>
    </div>
  );
}
