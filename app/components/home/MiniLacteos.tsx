"use client";

import React, { useEffect, useState } from "react";
import { stock } from "../Types";
import { LacteosCall } from "../ApiCalls";
import { useSession } from "next-auth/react";

export default function MiniLacteos() {
  const [lacteos, setLacteos] = useState([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      LacteosCall(userId).then((res) => {
        const result = res;
        if (result.length > 4) {
          const shortresults = result.slice(0, 4);
          setLacteos(shortresults);
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
              <th>LACTEOS</th>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
