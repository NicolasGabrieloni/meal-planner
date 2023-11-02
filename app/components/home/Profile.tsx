"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ProfileEdit } from "./ProfileEdit";
import { useEffect, useState } from "react";
import { UsersById } from "../ApiCalls";

export default function Profile() {
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = idUser ? parseInt(idUser as string) : null;
  const [infoUser, setInfoUser] = useState({
    email: "",
    description: "",
    image: "",
    age: 0,
    sex: "",
    location: "",
  });

  useEffect(() => {
    if (userId) {
      UsersById(userId).then((res) => {
        const userData = res;
        setInfoUser({
          email: userData.email,
          description: userData.description,
          image: userData.image,
          age: userData.age,
          sex: userData.sex,
          location: userData.location,
        });
      });
    }
  }, [userId]);

  return (
    <div className="flex w-full flex-row justify-between space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl lg:min-h-[150px] ">
      <Image
        src={session?.user?.image as string}
        alt="User profile image"
        width={70}
        height={70}
        className="max-h-[70px] w-full max-w-[70px] rounded-full lg:max-h-[100px] lg:max-w-[100px]"
      />
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-2xl font-semibold text-[#343434]">
            {session?.user?.name}
          </h1>
          <h3 className="hidden font-medium text-[#343434] sm:inline ">
            {infoUser.location as string}
          </h3>
        </div>
        <h4 className="w-full text-base">{infoUser.description as string}</h4>
        <div className="hidden text-sm lg:inline-flex">
          <h4>Edad: {infoUser.age as number} años </h4>
        </div>
        <div>
          <h4> {infoUser.sex as string} </h4>
        </div>
      </div>
      <div className="">
        <ProfileEdit />
      </div>
    </div>
  );
}
