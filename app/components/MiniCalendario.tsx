import React from "react";

export const MiniCalendario = () => {
  return (
    <div className="">
      <div style={{ minWidth: "320px" }}>
        <div className="mt-8 p-2 text-center">
          <h2>Caledario semanal</h2>
        </div>
        <section className=" mx-auto mt-5 w-80 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
          <div>
            <div className="flex justify-center">
              <div className="h-[250px] "></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
