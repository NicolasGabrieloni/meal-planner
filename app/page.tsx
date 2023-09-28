import { InputWithLabel } from "@/components/InputWithLabel";
import { NavMenu } from "@/components/NavMenu";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5">
      <NavMenu />
      <Button variant="blue_outlined">Hola</Button>
      <Button variant="green_outlined">Hola</Button>
      <InputWithLabel labelText="Teletubi azul" />
    </div>
  );
}
