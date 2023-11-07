import Alacena from "@/components/stock/Alacena";
import Carnes from "@/components/stock/Carnes";
import Lacteos from "@/components/stock/Lacteos";
import VerdurasFrutas from "@/components/stock/Verduras";
import { AddFood } from "@/components/stock/AddFood";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Almacén",
};

export default function Depot() {
  return (
    <>
      <div className="">
        <div>
          <div className="text-center">
            <h1 className="pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
              Mi Despensa
            </h1>
          </div>
          <AddFood />
          <div className="grid w-full gap-10 p-4 sm:grid-cols-2">
            <div>
              <h3 className="border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
                Vegetales/Frutas
              </h3>
              <section className="mx-auto mt-5  rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
                <div>
                  <div className="flex justify-center">
                    <div className="h-[200px] ">
                      <VerdurasFrutas />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div>
              <h3 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
                Alacena
              </h3>
              <section className="mx-auto mt-5  rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
                <div>
                  <div className="flex justify-center">
                    <div className="h-[200px] ">
                      <Alacena />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <h3 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
                Carnes
              </h3>
              <section className="mx-auto mt-5  rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
                <div>
                  <div className="flex justify-center">
                    <div className="h-[200px] ">
                      <Carnes />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div>
              <h3 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
                Frescos/Lacteos
              </h3>
              <section className="mx-auto mt-5  rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
                <div>
                  <div className="flex justify-center">
                    <div className="h-[200px] ">
                      <Lacteos />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
