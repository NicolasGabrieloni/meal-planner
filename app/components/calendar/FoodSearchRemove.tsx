"use client";

import { LabelForInput } from "../LabelForInput";
import { MyContextProvider } from "./Context";
import FoodInput from "./FoodInput";
import RemoveButton from "./RemoveButton";

interface InputWithLabelProps {
  labelText: string;
}

export default function FoodSearchRemove({ labelText }: InputWithLabelProps) {
  return (
    <MyContextProvider>
      <div className="mx-auto flex flex-row justify-between">
        <div className="">
          <LabelForInput labelText={labelText} />
          <FoodInput presets={[]} />
        </div>
        <div className="flex place-items-end space-x-2">
          <RemoveButton />
        </div>
      </div>
    </MyContextProvider>
  );
}
