import React from "react";
import MiniAlacena from "./MiniAlacena";
import MiniCarnes from "./MiniCarnes";
import MiniLacteos from "./MiniLacteos";
import MiniVerduras from "./MiniVerduras";

export const MiniDespensa = () => {
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-full " style={{ minWidth: "320px" }}>
          <div className="p-4 text-center text-xl font-medium text-[#00785C] lg:font-semibold">
            <h2>Despensa:</h2>
          </div>
          <section className="mx-auto rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 pt-5 shadow-xl">
            <div className="h-[250px]">
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-4 gap-y-20 p-4 lg:grid-cols-4">
                  <MiniAlacena />
                  <MiniCarnes />
                  <MiniLacteos />
                  <MiniVerduras />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
