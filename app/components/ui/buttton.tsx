"use client";
import { useSession } from "next-auth/react";
export function Buttton() {
  const { data, status } = useSession();
  return (
    <>
      <button onClick={() => console.log(data, status)}>hola bb</button>
    </>
  );
}
