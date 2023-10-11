"use client";

import React, { useEffect, useState } from "react";
import { Stock } from "../Types";
import { typeCarnes } from "../ApiCalls";

export default function Carnes() {
  const [carnes, setCarnes] = useState([]);

  useEffect(() => {
    typeCarnes().then((res) => {
      const result = res;
      setCarnes(result);
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
            {carnes.map((carne: Stock) => (
              <tr key={carne.id}>
                <td>{carne.name_food}</td>
                <td>{carne.quantity}</td>
                <td>{carne.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
