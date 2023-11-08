"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { typeCarnes } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function Carnes() {
  const [carnes, setCarnes] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      typeCarnes(userId).then((res) => {
        const result = res;
        setCarnes(result);
        setLoading(false);
      });
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  return (
    <div className="w-full">
      <table className="w-full table-fixed border-collapse rounded-full border border-[#343434]">
        <thead>
          <tr>
            <th className="border-b border-[#343434] bg-[#80FF95]/70 px-4 text-left align-text-top sm:border-r sm:text-lg">
              Nombre
            </th>
            <th className="border-b border-[#343434] bg-[#80FF95]/70 px-4 text-left align-text-top sm:border-r sm:text-lg">
              Cantidad
            </th>
            <th className="border-b border-[#343434] bg-[#80FF95]/70 px-4 text-left align-text-top sm:border-r sm:text-lg">
              Unidad
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="px-4">Cargando...</td>
            </tr>
          ) : carnes.length === 0 ? (
            <tr>
              <td className="px-4">No hay alimentos</td>
            </tr>
          ) : (
            carnes.map((carne: stock) => (
              <tr key={carne.id}>
                <td className="border-b border-[#343434] px-4 text-left sm:border-r">
                  {carne.name_food}
                </td>
                <td className="border-b border-[#343434] px-4 text-center sm:border-r sm:text-left">
                  {carne.quantity}
                </td>
                <td className="border-b border-[#343434] px-4 text-left sm:border-r">
                  {carne.unit}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
