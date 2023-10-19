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

export const metadata: Metadata = {
  title: "Inicio",
};

export default function Home() {
  return (
    <div style={{ minWidth: "320px" }}>
      <div className="m-8 pt-5" style={{ maxWidth: "100%" }}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="flex flex-col sm:flex-row">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300"></div>
              <AccordionTrigger className="ml-4">
                <div>
                  <h2 className="text-base font-bold">aaaa</h2>
                  <p className="ml-3">Una breve descripción</p>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="mt-2 text-center">
              <>
                <h3 className="text-xl font-semibold text-gray-800">
                  Jonathan Tecuento
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, omnis?
                </p>
              </>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Buttton />
      <div></div>
      <div className="mt-8">
        <MiniCalendario />
        <div className="mt-8">
          <ListButton label="Ver lista de compras" />
        </div>
      </div>
      <MiniDespensa />
    </div>
  );
}
