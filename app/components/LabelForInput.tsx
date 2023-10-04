import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  labelText: string;
}

export function LabelForInput({ labelText }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-0.5">
      <Label htmlFor="username">{labelText}</Label>
    </div>
  );
}
