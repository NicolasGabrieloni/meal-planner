import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListButton from "@/components/ui/ListButton";
import { Buttton } from "@/components/ui/buttton";
import Profile from "@/components/home/Profile";
export const metadata: Metadata = {
  title: "Inicio",
};
export default function Home() {
  return (
    <div className="flex flex-col items-center p-4">
      <Profile />
      <Buttton />
      <div>
        <div className=" mt-8 text-center">
          <h2>Caledario semanal</h2>
        </div>
        <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
          <div>
            <div className="flex justify-center">
              <div className="h-[250px] "></div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-8">
        <ListButton label="Ver lista de compras" />
      </div>
      <div>
        <div className="mt-8 text-center">
          <h2>Mi Despensa</h2>
        </div>
        <section className="mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
          <div>
            <div className="flex justify-center">
              <div className="h-[350px] "></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
