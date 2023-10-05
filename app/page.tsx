"use client"

import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { UserInfo } from "./components/UserInfo";
import Calendar from "./(logged)/calendar/page";
import { WeeklyCalendar } from "./components/WeeklyCalendar";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5">
      <Button variant="blue_outlined">Hola</Button>
      <Button variant="green_outlined">Hola</Button>
      <InputWithLabel labelText="Teletubi azul" />
      <UserInfo/>
      <WeeklyCalendar/>
      <Button variant="blue_outlined">Lista de compras</Button>
    </div>
  );
}
