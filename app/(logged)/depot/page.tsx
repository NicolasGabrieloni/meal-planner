import Alacena from "@/components/stock/Alacena";
import Carnes from "@/components/stock/Carnes";
import Lacteos from "@/components/stock/Lacteos";
import VerdurasFrutas from "@/components/stock/Verduras";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Almacén",
};

export default function Depot() {
  return (
    <div className="m-8 pt-5">
      <div className="mt-6 text-center">
        <h1 className="text-xl">Mi Despensa</h1>
      </div>
      <h3 className="mt-9">Vegetales/Frutas</h3>
      <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
        <div>
          <div className="flex justify-center">
            <div className="h-[200px] ">
              <VerdurasFrutas />
            </div>
          </div>
        </div>
      </section>
      <h3 className="mt-9">Alacena</h3>
      <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
        <div>
          <div className="flex justify-center">
            <div className="h-[200px] ">
              <Alacena />
            </div>
          </div>
        </div>
      </section>
      <h3 className="mt-9">Carnes</h3>
      <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
        <div>
          <div className="flex justify-center">
            <div className="h-[200px] ">
              <Carnes />
            </div>
          </div>
        </div>
      </section>
      <h3 className="mt-9">Lacteos</h3>
      <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
        <div>
          <div className="flex justify-center">
            <div className="h-[200px] ">
              <Lacteos />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
