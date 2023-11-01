"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { frutasVerduras } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function VerdurasFrutas() {
  const [verduras, setVerduras] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      frutasVerduras(userId).then((res) => {
        const result = res;
        setVerduras(result);
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
            {loading ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : verduras.length === 0 ? (
              <tr>
                <td>No hay alimentos</td>
              </tr>
            ) : (
              verduras.map((verdura: stock) => (
                <tr key={verdura.id}>
                  <td>{verdura.name_food}</td>
                  <td>{verdura.quantity}</td>
                  <td>{verdura.unit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
