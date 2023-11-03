import React from "react";
import MiniAlacena from "./MiniAlacena";
import MiniCarnes from "./MiniCarnes";
import MiniLacteos from "./MiniLacteos";
import MiniVerduras from "./MiniVerduras";

export const MiniDespensa = () => {
  return (
    <div className="">
      <div className="flex justify-center p-4">
        <div className="w-full " style={{ minWidth: "320px" }}>
          <div className="pt-8 text-center">
            <h2>Despensa</h2>
          </div>
          <section className="mx-auto rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 pt-5 shadow-xl">
            <div>
              <div className="flex justify-center">
                <div className="h-[250px]">
                  <div className="flex justify-between">
                    <MiniAlacena />
                    <MiniCarnes />
                  </div>
                  <div className="mt-10 flex justify-between">
                    <MiniLacteos />
                    <MiniVerduras />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
