"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { AlacenaCall } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function MiniAlacena() {
  const [alacena, setAlacena] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      AlacenaCall(userId).then((res) => {
        const result = res;
        if (result.length > 4) {
          const shortresults = result.slice(0, 4);
          setAlacena(shortresults);
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
              <th>ALACENA</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : alacena.length === 0 ? (
              <tr>
                <td>No hay alimentos</td>
              </tr>
            ) : (
              alacena.map((food: stock) => (
                <tr key={food.id}>
                  <td>{food.name_food}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
