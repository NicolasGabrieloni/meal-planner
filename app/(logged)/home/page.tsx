import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Inicio",
};

export default function Home() {
  return (
    <div className="m-8 pt-5">
      <div className="shadow-xl w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="flex flex-col sm:flex-row">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300"></div>
              <AccordionTrigger className="ml-4">
                <div>
                  <h2 className="text-base font-bold">Jonny Tecuento</h2>
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
      <div>
      <div className=' mt-8 text-center'>
        <h2>Caledario semanal</h2>
      </div>
      <section className="shadow-xl mt-5 w-80 mx-auto rounded-lg border border-[#000000] p-5 bg-[#E9FFEB]">
  <div>
    <div className="flex justify-center">
      <div className="h-[250px] "></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
    </div>
  </div>
</section>

    </div>

    </div>
  );
}
