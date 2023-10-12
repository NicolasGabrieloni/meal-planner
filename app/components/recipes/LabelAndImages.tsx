import Link from "next/link";
import React from "react";

interface LabelTypes {
  label: string;
}

export default function LabelAndImages({ label }: LabelTypes) {
  return (
    <div className="p-4">
      <h1 className="w-[300px] border-b border-[#00785C] pb-1 text-xl font-medium text-[#00785C]">
        {label}
      </h1>
      <div className="flex flex-row py-4">
        {/* EN ESTOS DIVS VA EL MAP DE LAS RECETAS FAVORITAS / RECOMENDADOS DEL USER */}
        <div className="relative z-30 mr-[-5px] h-[200px] w-[90px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110">
          receta1
        </div>
        <div className="relative z-20 mr-[-5px] h-[200px] w-[90px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110">
          receta2
        </div>
        <div className="relative z-10 h-[200px] w-[90px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110">
          receta3
        </div>
      </div>
    </div>
  );
}
