import { InputWithLabel } from "@/components/InputWithLabel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario",
};

export default function Calendar() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-medium text-[#00785C]">Calendario semanal</h1>
      <div className=" space-y-4">
        <div>
          <div className="min-w-[280px] ">
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Lunes
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Martes
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Miércoles
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Jueves
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Viernes
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Sábado
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
        <div>
          <div>
            <h2 className="border-b border-[#00785C] text-sm text-[#00785C]">
              Domingo
            </h2>
          </div>
          <div>
            <InputWithLabel labelText="Almuerzo" />
          </div>
          <div>
            <InputWithLabel labelText="Cena" />
          </div>
        </div>
      </div>
    </div>
  );
}
