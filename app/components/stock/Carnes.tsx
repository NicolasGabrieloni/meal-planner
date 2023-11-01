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
            {loading ? 
             (<tr>
                <td>Cargando...</td>
              </tr> ) : carnes.length === 0 ? (
                <tr>
                <td>No hay alimentos</td>
              </tr>
              ) : (
                carnes.map((carne: stock) => (
                  <tr key={carne.id}>
                    <td>{carne.name_food}</td>
                    <td>{carne.quantity}</td>
                    <td>{carne.unit}</td>
                  </tr>
                )))}
              
          </tbody>
        </table>
      </div>
    </>
  );
}
