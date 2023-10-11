"use client";

import React, { useEffect, useState } from "react";
import { Stock } from "../Types";
import { AlacenaCall } from "../ApiCalls";

export default function Alacena() {
  const [alacena, setAlacena] = useState([]);

  useEffect(() => {
    AlacenaCall().then((res) => {
      const result = res;
      setAlacena(result);
    });
  }, []);

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
            {alacena.map((food: Stock) => (
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
