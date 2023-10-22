"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="w-[290px] rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
      <Image
        src={session?.user?.image as string}
        alt="User profile image"
        width={20}
        height={20}
      />
      <div>hola k ace</div>
    </div>
  );
}
