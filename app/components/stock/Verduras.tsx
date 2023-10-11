"use client";

import React, { useEffect, useState } from "react";
import { Stock } from "../Types";
import { frutasVerduras } from "../ApiCalls";

export default function VerdurasFrutas() {
  const [verduras, setVerduras] = useState([]);

  useEffect(() => {
    frutasVerduras().then((res) => {
      const result = res;
      setVerduras(result);
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
            {verduras.map((verdura: Stock) => (
              <tr key={verdura.id}>
                <td>{verdura.name_food}</td>
                <td>{verdura.quantity}</td>
                <td>{verdura.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
