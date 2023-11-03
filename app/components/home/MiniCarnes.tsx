"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { typeCarnes } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function MiniCarnes() {
  const [carnes, setCarnes] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      typeCarnes(userId).then((res) => {
        const result = res;
        if (result.length > 4) {
          const shortresults = result.slice(0, 4);
          setCarnes(shortresults);
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
              <th>CARNES</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : carnes.length === 0 ? (
              <tr>
                <td>No hay alimentos</td>
              </tr>
            ) : (
              carnes.map((carne: stock) => (
                <tr key={carne.id}>
                  <td>{carne.name_food}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
