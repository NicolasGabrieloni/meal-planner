import { Label } from "@/components/ui/label";
import { DayMeals } from "./calendar/Context";

interface InputWithLabelProps {
  mealType: keyof DayMeals;
}

export function LabelForInput({ mealType }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center  ">
      <Label className="text-xs" htmlFor="username">
        {mealType}
      </Label>
    </div>
  );
}
