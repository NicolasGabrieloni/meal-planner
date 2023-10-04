import { InputWithLabel } from "@/components/LabelForInput";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function Home() {
  return (
    <div>
      <div className="flex h-[400px] w-[250px] flex-col items-center rounded-[5px] border border-[#343434] bg-[#FAFAFA] p-6 drop-shadow-md">
        <h2 className="text-lg font-medium text-[#00785C] ">Registrarse</h2>
        <div>FORMULARIO CON ZOD</div>
        <div className="flex flex-col items-center space-y-1 py-2">
          <Button variant="green_outlined">Enviar</Button>
          <div className="flex items-center space-x-3">
            <div className="w-20 border-t border-[#00785C]"></div>
            <h2 className="text-lg font-semibold text-[#00785C]">O</h2>
            <div className="w-20 border-t border-[#00785C]"></div>
          </div>
          <Button variant="blue_outlined">
            Registrarse con Google{" "}
            <IconBrandGoogle height={19} className="ml-2" stroke={2.5} />
          </Button>
        </div>
      </div>
      <h3 className="pt-2 text-center text-xs text-[#343434]">
        ¿Ya tenés cuenta? <span className="font-bold">Ingresá aquí</span>
      </h3>
    </div>
  );
}
