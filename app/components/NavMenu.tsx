"use client";

import {
  IconHome,
  IconFridge,
  IconCalendarEvent,
  IconSalad,
  IconList,
  IconLogout2,
  IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { UsersById } from "./ApiCalls";
import { usePathname } from "next/navigation";

export function NavMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const idUser = session?.user.id;
  const userId = idUser ? parseInt(idUser as string) : null;
  const [imageUrl, setImageUrl] = useState({
    image: "",
  });

  const currentPath = usePathname();

  useEffect(() => {
    if (userId) {
      UsersById(userId).then((res) => {
        const userData = res;
        setImageUrl({
          image: userData.image,
        });
      });
    }
  }, [userId]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="custom-shadow-inner fixed left-0 top-0 z-50 bg-[#80FF95] py-4 ">
      <div className="flex w-screen items-center justify-center">
        <Image
          src={"/Logo.svg"}
          alt={"Logo of Meal Planner"}
          width={60}
          height={60}
          style={{ width: "auto", height: "auto" }}
        />
        <button className="fixed left-4 lg:hidden" onClick={toggleMenu}>
          <IconMenu2 />
        </button>

        {imageUrl.image && (
          <Link href="/home" className="fixed right-4">
            <Image
              src={imageUrl.image}
              alt="User avatar"
              width={35}
              height={35}
              style={{ width: "auto", height: "auto" }}
              className="cursor-pointer rounded-full"
            />
          </Link>
        )}
      </div>
      <div
        className={`fixed right-0 top-[72px] ${
          isMenuOpen ? "lg:block" : "hidden"
        }`}
      >
        <div className="flex flex-col bg-gradient-to-b from-[#80FF95] to-[#22859B]">
          <ul className="flex h-screen flex-col space-y-[54px] px-3 pt-6 lg:hidden">
            <li>
              <Link
                href="/home"
                className="flex flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconHome
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/depot"
                className="flex w-screen flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconFridge
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Almacén</span>
              </Link>
            </li>
            <li>
              <Link
                href="/calendar"
                className="flex flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconCalendarEvent
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Calendario</span>
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="flex flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconSalad
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Recetas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/shop-list"
                className="flex flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconList
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Lista de compras</span>
              </Link>
            </li>
            <li>
              <button
                className="flex flex-row space-x-3 px-10"
                onClick={async () => {
                  await signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                <IconLogout2
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Cerrar sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="custom-shadow-inner fixed left-0 top-0 mt-[70px] hidden h-screen bg-gradient-to-b from-[#80FF95] to-[#22859B]  lg:inline">
        <ul className=" top-green-shadow flex min-h-[620px] flex-col justify-between px-6 py-8">
          <li
            className={
              currentPath === "/home"
                ? "h-8 w-8 rounded-full bg-white/70 pl-1 pt-1 "
                : ""
            }
          >
            <Link href="/home">
              <IconHome size={24} stroke={1} className="hover:stroke-[1.5px]" />
            </Link>
          </li>
          <li
            className={
              currentPath === "/depot"
                ? "h-8 w-8 rounded-full bg-white/70 pl-1 pt-1 "
                : ""
            }
          >
            <Link href="/depot">
              <IconFridge
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li
            className={
              currentPath === "/calendar"
                ? "h-8 w-8 rounded-full bg-white/70 pl-1 pt-1 "
                : ""
            }
          >
            <Link href="/calendar">
              <IconCalendarEvent
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li
            className={
              currentPath === "/recipes"
                ? "h-8 w-8 rounded-full bg-white/70 pl-1 pt-1 "
                : ""
            }
          >
            <Link href="/recipes">
              <IconSalad
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li
            className={
              currentPath === "/shop-list"
                ? "h-8 w-8 rounded-full bg-white/70 pl-1 pt-1 "
                : ""
            }
          >
            <Link href="/shop-list">
              <IconList size={24} stroke={1} className="hover:stroke-[1.5px]" />
            </Link>
          </li>
          <li>
            <button
              onClick={async () => {
                await signOut({
                  callbackUrl: "/",
                });
              }}
            >
              <IconLogout2
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
