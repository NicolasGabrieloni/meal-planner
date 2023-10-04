import { LabelForInput } from "../LabelForInput";
import FoodInput from "./FoodInput";
import RemoveButton from "./RemoveButton";

export default function FoodSearchRemove() {
  return (
    <div className="flex flex-row space-x-6 py-2">
      <div>
        <LabelForInput labelText="Almuerzo" />
        <FoodInput presets={[]} />
      </div>
      <RemoveButton />
    </div>
  );
}
