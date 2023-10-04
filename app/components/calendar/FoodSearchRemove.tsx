import { LabelForInput } from "../LabelForInput";
import FoodInput from "./FoodInput";
import RemoveButton from "./RemoveButton";

export default function FoodSearchRemove() {
  return (
    <div className="flex flex-row justify-evenly py-4">
      <div>
        <LabelForInput labelText="Almuerzo" />
        <FoodInput presets={[]} />
      </div>
      <div className="flex place-items-end">
        <RemoveButton />
      </div>
    </div>
  );
}
