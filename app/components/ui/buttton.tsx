"use client";
import { useSession } from "next-auth/react";

export function Buttton() {
  const { data: session } = useSession();

  return (
    <>
      <button onClick={() => console.log(session?.user?.id)}>hola bb</button>
    </>
  );
}
