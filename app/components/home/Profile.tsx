"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ProfileEdit } from "./ProfileEdit";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="mx-4 flex w-full flex-row justify-between space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl lg:min-h-[150px] ">
      <Image
        src={session?.user?.image as string}
        alt="User profile image"
        width={70}
        height={70}
        className="max-h-[70px] w-full max-w-[70px] rounded-full lg:max-h-[100px] lg:max-w-[100px]"
      />
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-xl font-medium text-[#343434]">
            {session?.user?.name}
          </h1>
          <h3 className="hidden font-medium text-[#343434] sm:inline ">
            Santa Fe, Argentina
          </h3>
        </div>
        <h4 className="w-full text-xs">
          {session?.user?.description as string}
        </h4>
        <div className="hidden lg:inline-flex">
          <h4>Edad: 69</h4>
        </div>
      </div>
      <div className="">
        <ProfileEdit />
      </div>
    </div>
  );
}
