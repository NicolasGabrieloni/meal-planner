import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListButton from "@/components/ui/ListButton";
import { Buttton } from "@/components/ui/buttton";
import { MiniDespensa } from "@/components/MiniDespensa";
import { MiniCalendario } from "@/components/MiniCalendario";

import Profile from "@/components/home/Profile";

export const metadata: Metadata = {
  title: "Inicio",
};

export default function Home() {
  return (
    <div className="p-4">
    {/* <Profile /> */}
    <div className=" rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="flex flex-col sm:flex-row">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300"></div>
            <AccordionTrigger className="pl-4">
              <div>
                <h2 className="text-base font-bold">aaaa</h2>
                <p className="pl-3">Una breve descripción</p>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pt-2 text-center">
            <>
              <h3 className="text-xl font-semibold text-gray-800">Jonathan Tecuento</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, omnis?
              </p>
            </>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <Buttton/>
    <div></div>
    <div className="pt-8">
      <MiniCalendario />
      <div className="pt-8">
        <ListButton label="Ver lista de compras" />
      </div>
    </div>
    <MiniDespensa />
  </div>
  );
}
