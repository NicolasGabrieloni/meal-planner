import { LabelForInput } from "../LabelForInput";
import FoodInput from "./FoodInput";
import RemoveButton from "./RemoveButton";

interface InputWithLabelProps {
  labelText: string;
}

export default function FoodSearchRemove({ labelText }: InputWithLabelProps) {
  return (
    <div className="flex flex-row justify-between">
      <div className="">
        <LabelForInput labelText={labelText} />
        <FoodInput presets={[]} />
      </div>
      <div className="flex place-items-end">
        <RemoveButton />
      </div>
    </div>
  );
}
