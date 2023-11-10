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
    <div className="flex w-full flex-row justify-between space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 shadow-xl lg:min-h-[150px]">
      {infoUser.image && (
        <Image
          src={infoUser.image}
          alt="User profile image"
          width={200}
          height={200}
          priority={true}
          style={{ width: "auto", height: "auto" }}
          className="max-h-[70px] w-full max-w-[70px] rounded-full align-middle sm:max-h-[150px] sm:max-w-[150px]"
        />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className="flex items-center justify-between pb-2">
          <div className="space-y-4 sm:pt-4 md:pt-0">
            <h1 className="text-2xl font-semibold text-[#343434] sm:text-3xl">
              {session?.user?.name}
            </h1>
            <h4 className="w-full text-base">
              {infoUser.description as string}
            </h4>
          </div>
          {!infoUser.location && !infoUser.age && !infoUser.sex ? (
            <h3 className="font-medium text-[#343434]">Actualiza tu perfil</h3>
          ) : (
            <div className="hidden items-end space-y-4 pt-6 md:inline-flex md:flex-col">
              <h3 className="font-medium text-[#343434]">
                {infoUser.location as string}
              </h3>
              <div className="font-medium text-[#343434]">
                <h4>Edad: {infoUser.age as number} años </h4>
              </div>
              <div className="ont-medium text-[#343434]">
                <h4> {infoUser.sex as string} </h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <ProfileEdit />
      </div>
    </div>
  );
}
