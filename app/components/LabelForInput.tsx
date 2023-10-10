import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  labelText: string;
}

export function LabelForInput({ labelText }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center  ">
      <Label className="text-xs" htmlFor="username">
        {labelText}
      </Label>
    </div>
  );
}
