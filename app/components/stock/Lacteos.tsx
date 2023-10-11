"use client";

import React, { useEffect, useState } from "react";
import { Stock } from "../Types";
import { LacteosCall } from "../ApiCalls";

export default function Lacteos() {
  const [lacteos, setLacteos] = useState([]);

  useEffect(() => {
    LacteosCall().then((res) => {
      const result = res;
      setLacteos(result);
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
            {lacteos.map((lacteo: Stock) => (
              <tr key={lacteo.id}>
                <td>{lacteo.name_food}</td>
                <td>{lacteo.quantity}</td>
                <td>{lacteo.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
