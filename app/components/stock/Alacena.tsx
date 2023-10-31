"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { AlacenaCall } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function Alacena() {
  const [alacena, setAlacena] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  useEffect(() => {
    if (userId) {
      AlacenaCall(userId).then((res) => {
        const result = res;
        setAlacena(result);
      });
    }
  }, [userId]);

  if (!userId) {
    return <></>;
  }

  return (
    <>
      <div>
        <table className="text-xs">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Unidad de Medida</th>
            </tr>
          </thead>
          <tbody>
            {alacena.map((food: stock) => (
              <tr key={food.id}>
                <td>{food.name_food}</td>
                <td>{food.quantity}</td>
                <td>{food.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
