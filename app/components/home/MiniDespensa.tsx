import React from "react";
import MiniAlacena from "./MiniAlacena";
import MiniCarnes from "./MiniCarnes";
import MiniLacteos from "./MiniLacteos";
import MiniVerduras from "./MiniVerduras";
import { Button } from "../ui/button";
import Link from "next/link";

export const MiniDespensa = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full " style={{ minWidth: "320px" }}>
          <div className="p-4 text-center text-xl font-medium text-[#00785C] lg:font-semibold">
            <h2>Despensa:</h2>
          </div>
          <section className="mx-auto rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 pt-5 shadow-xl">
            <div className="h-[250px]">
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 justify-center justify-items-center gap-x-4 gap-y-6 lg:grid-cols-4 lg:p-4">
                  <MiniAlacena />
                  <MiniCarnes />
                  <MiniLacteos />
                  <MiniVerduras />
                </div>
                <Button
                  variant={"blue_outlined"}
                  className="my-4 hidden w-fit lg:inline-flex xl:my-9"
                >
                  <Link href="/depot">Ver todo</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
