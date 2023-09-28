import {
  IconHome,
  IconFridge,
  IconCalendarEvent,
  IconSalad,
  IconList,
  IconLogout2,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export function NavMenu() {
  return (
    <div className="flex flex-col items-center rounded-br-[50px] bg-gradient-to-br from-[#80FF95] to-[#22859B] ">
      <Image
        src="/Logo.svg"
        width={60}
        height={60}
        alt="Logo from Meal Planner"
      />
      <ul className="flex flex-col gap-10 px-6 py-8">
        <li>
          <Link href="/nav">
            <IconHome size={24} stroke={1} className="hover:stroke-[1.5px]" />
          </Link>
        </li>
        <li>
          <Link href="/nav">
            <IconFridge size={24} stroke={1} className="hover:stroke-[1.5px]" />
          </Link>
        </li>
        <li>
          <Link href="/nav">
            <IconCalendarEvent
              size={24}
              stroke={1}
              className="hover:stroke-[1.5px]"
            />
          </Link>
        </li>
        <li>
          <Link href="/nav">
            <IconSalad size={24} stroke={1} className="hover:stroke-[1.5px]" />
          </Link>
        </li>
        <li>
          <Link href="/nav">
            <IconList size={24} stroke={1} className="hover:stroke-[1.5px]" />
          </Link>
        </li>
        <li>
          <Link href="/nav">
            <IconLogout2
              size={24}
              stroke={1}
              className="hover:stroke-[1.5px]"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
