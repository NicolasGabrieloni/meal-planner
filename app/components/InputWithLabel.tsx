import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  labelText: string;
}

export function InputWithLabel({ labelText }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-0.5">
      <Label htmlFor="username">{labelText}</Label>
      <Input type="text" id="email" />
    </div>
  );
}
