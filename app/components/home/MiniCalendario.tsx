"use client";
import { DayMeals, WeekMeals } from "@/Context";
import React, { useEffect, useState } from "react";
import { WeekMealsById } from "../ApiCalls";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export const MiniCalendario = () => {
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [miniWeekMeals, setMiniWeekMeals] = useState<WeekMeals>({
    Lunes: { Almuerzo: "", Cena: "" },
    Martes: { Almuerzo: "", Cena: "" },
    Miercoles: { Almuerzo: "", Cena: "" },
    Jueves: { Almuerzo: "", Cena: "" },
    Viernes: { Almuerzo: "", Cena: "" },
  });

  useEffect(() => {
    if (userId) {
      WeekMealsById(userId).then((res) => {
        const results = res;
        const updatedWeekMeals = { ...miniWeekMeals };
        const recipesArray: string[] = [];
        results?.forEach(
          (item: {
            dayName: keyof WeekMeals;
            mealType: keyof DayMeals;
            mealName: string;
          }) => {
            const { dayName, mealType, mealName } = item;
            if (
              dayName in updatedWeekMeals &&
              mealType in updatedWeekMeals[dayName]
            ) {
              updatedWeekMeals[dayName][mealType] = mealName;
              recipesArray.push(mealName);
            }
          },
        );
        setMiniWeekMeals(updatedWeekMeals);
      });
    }
  }, [userId]);

  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const today = new Date();
  const currentDay = today.getDay();
  const dayName = daysOfWeek[currentDay];
  const mealsOfDay = miniWeekMeals[dayName as keyof WeekMeals];

  if (!userId) {
    return <></>;
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-full " style={{ minWidth: "320px" }}>
          <div className="p-4 text-center text-xl font-medium text-[#00785C] lg:font-semibold">
            <h2>Comidas del día:</h2>
          </div>
          <section className="mx-auto rounded-lg border border-[#343434] bg-[#E9FFEB] p-5 pt-5 shadow-xl">
            <div>
              <div className="flex justify-center">
                <div className="h-[250px]">
                  {dayName === "Sábado" || dayName === "Domingo" ? (
                    <p>Hoy es día de permitidos. ¡Buen fin de semana!</p>
                  ) : (
                    mealsOfDay && (
                      <div className="text-center lg:space-y-12">
                        <h2 className="text-3xl font-semibold">{dayName}</h2>
                        <div className="flex flex-col space-y-8 pt-6 lg:flex-row lg:gap-20 lg:space-y-0 lg:pt-0">
                          <div>
                            <h3 className="text-xl font-medium text-[#00785C]">
                              Almuerzo
                            </h3>
                            {mealsOfDay.Almuerzo === "" ? (
                              <p>No has cargado tu almuerzo.</p>
                            ) : (
                              <p>{mealsOfDay.Almuerzo}</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-[#00785C]">
                              Cena
                            </h3>
                            {mealsOfDay.Cena === "" ? (
                              <p>No has cargado tu cena.</p>
                            ) : (
                              <p>{mealsOfDay.Cena}</p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant={"blue_outlined"}
                          className="my-4 w-fit"
                        >
                          <Link href="/calendar">Cambiar comidas</Link>
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
