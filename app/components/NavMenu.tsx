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
import { useState } from "react";

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed left-0 top-0 bg-[#80FF95] py-4">
      <div className="flex w-screen items-center justify-center">
        <Image
          src={"/Logo.svg"}
          alt={"Logo of Meal Planner"}
          width={60}
          height={60}
        />
        <button className="fixed right-4 lg:hidden" onClick={toggleMenu}>
          <IconMenu2 />
        </button>
      </div>
      <div
        className={`fixed right-0 top-[72px] ${
          isMenuOpen ? "lg:block" : "hidden"
        }`}
      >
        <div className="flex flex-col bg-gradient-to-b from-[#80FF95]/80 to-[#22859B]/80 ">
          <ul className="flex h-screen flex-col space-y-12 px-3 pt-6 lg:hidden">
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
              <Link
                href="/"
                className="flex flex-row space-x-3 px-10"
                onClick={closeMenu}
              >
                <IconLogout2
                  size={24}
                  stroke={1}
                  className="hover:stroke-[1.5px]"
                />
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed left-0 hidden h-screen bg-gradient-to-b from-[#80FF95] to-[#22859B] lg:inline">
        <ul className="flex flex-col space-y-14 px-6 py-8">
          <li>
            <Link href="/home">
              <IconHome size={24} stroke={1} className="hover:stroke-[1.5px]" />
            </Link>
          </li>
          <li>
            <Link href="/depot">
              <IconFridge
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li>
            <Link href="/calendar">
              <IconCalendarEvent
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li>
            <Link href="/recipes">
              <IconSalad
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
          <li>
            <Link href="/shop-list">
              <IconList size={24} stroke={1} className="hover:stroke-[1.5px]" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <IconLogout2
                size={24}
                stroke={1}
                className="hover:stroke-[1.5px]"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
