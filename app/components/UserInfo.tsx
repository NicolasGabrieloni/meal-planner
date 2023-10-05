import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const UserInfo = () => {
  return (
<div className="w-80 mx-auto rounded-lg border border-[#000000] p-5 bg-[#E9FFEB]">
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1" className="flex flex-col sm:flex-row">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center"></div>
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi,
            omnis?
          </p>
        </>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
  );
};
