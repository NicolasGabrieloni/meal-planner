"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { frutasVerduras } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function MiniVerdurasFrutas() {
  const [verduras, setVerduras] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      frutasVerduras(userId).then((res) => {
        const result = res;
        if (result.length > 4) {
          const shortresults = result.slice(0, 4);
          setVerduras(shortresults);
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
        <table className="text-xs">
          <thead>
            <tr>
              <th>VERDURAS/FRUTAS</th>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
