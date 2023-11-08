"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { AlacenaCall } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function MiniAlacena() {
  const [alacena, setAlacena] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      AlacenaCall(userId).then((res) => {
        const result = res;
        if (result.length > 3) {
          const shortresults = result.slice(0, 3);
          setAlacena(shortresults);
        }
        setLoading(false);
      });
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  return (
    <>
      <div>
        <table className="border-collapse border-l border-r border-t border-[#343434]">
          <thead>
            <tr>
              <th className="border-b border-[#343434] bg-[#80FF95]/70 pb-2 text-lg text-[#00785C] ">
                ALACENA
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : alacena.length === 0 ? (
              <tr>
                <td>No hay alimentos</td>
              </tr>
            ) : (
              alacena.map((food: stock) => (
                <tr key={food.id}>
                  <td>
                    {" "}
                    <td className="w-screen border-b border-[#343434] text-center text-sm">
                      {food.name_food}
                    </td>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
