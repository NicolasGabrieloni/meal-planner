"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./components/ui/button";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        router.push("/home")
      ) : (
        <div className="flex flex-row space-x-20">
          <div className="hidden lg:inline-flex">
            <Image
              src={"/Logo.svg"}
              alt={"Logo of Meal Planner"}
              width={500}
              height={500}
              className="animate-pulse"
            />
          </div>
          <div className="flex h-[400px] w-[250px] flex-col items-center rounded-[5px] border border-[#343434] bg-[#FAFAFA] p-6 drop-shadow-md">
            <Image
              src={"/Logo.svg"}
              alt={"Logo of Meal Planner"}
              width={100}
              height={100}
              className="pt-8"
            />
            <div className="flex flex-col items-center py-16">
              <Link href="/sign-in">
                <Button variant={"green_outlined"} className="w-[180px]">
                  Iniciar sesión
                </Button>
              </Link>
              <div className="flex items-center space-x-3 py-4">
                <div className="w-16 border-t border-[#00785C]"></div>
                <h2 className="text-lg font-semibold text-[#00785C]">O</h2>
                <div className="w-16 border-t border-[#00785C]"></div>
              </div>
              <Link href="/sign-up">
                <Button variant={"green_outlined"} className="w-[180px]">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
