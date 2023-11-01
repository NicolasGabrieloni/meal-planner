"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { LacteosCall } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function Lacteos() {
  const [lacteos, setLacteos] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      LacteosCall(userId).then((res) => {
        const result = res;
        setLacteos(result);
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
            ) : lacteos.length === 0 ? (
              <tr>
                <td>No hay alimentos</td>
              </tr>
            ) : (
              lacteos.map((lacteo: stock) => (
                <tr key={lacteo.id}>
                  <td>{lacteo.name_food}</td>
                  <td>{lacteo.quantity}</td>
                  <td>{lacteo.unit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
