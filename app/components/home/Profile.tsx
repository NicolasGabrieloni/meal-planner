"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ProfileEdit } from "./ProfileEdit";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex w-[290px] flex-row space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl">
      <Image
        src={session?.user?.image as string}
        alt="User profile image"
        width={70}
        height={70}
        className="max-h-[70px] max-w-[70px] rounded-full "
      />
      <div className="flex w-[150px] flex-col ">
        <h1 className="pb-2 text-xl font-medium text-[#343434]">
          {" "}
          {session?.user?.name}{" "}
        </h1>
        <h4 className="max-w-[150px] text-xs">
          {" "}
          jefe de los jefes asdf asdf afds fdsa fsadf dsaf{" "}
        </h4>
      </div>
      <ProfileEdit />
    </div>
  );
}
