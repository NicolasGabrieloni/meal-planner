"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "./Context";
import { saveWeekMeals } from "./SaveWeekMeals";
import { WeekMealsById } from "../ApiCalls";
import { WeekMeal } from "@prisma/client";

function saveData() {
  const { weekMeals, loadWeekMeals } = useMyContext();
  // const [wkAll, setWkAll] = useState<WeekMeal[]>([]);

  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  loadWeekMeals;

  // useEffect(() => {
  //   WeekMealsById(userId).then((res) => {
  //     const resultados = res;
  //     setWkAll(resultados);

  //     const updatedWeekMeals = { ...weekMeals };

  //     resultados.forEach((item) => {
  //       const { dayName, mealType, mealName } = item;
  //       if (
  //         dayName in updatedWeekMeals &&
  //         mealType in updatedWeekMeals[dayName]
  //       ) {
  //         updatedWeekMeals[dayName][mealType] = mealName;
  //       }
  //     });
  //   });
  // }, []);

  const handlerSaveData: MouseEventHandler<HTMLButtonElement> = () => {
    for (const day in weekMeals) {
      for (const mealType in weekMeals[day]) {
        const mealName = weekMeals[day][mealType];
        saveWeekMeals(day, mealType, mealName, userId);
      }
    }
  };

  const handlerTraerData: MouseEventHandler<HTMLButtonElement> = () => {
    console.log(weekMeals);
  };

  return (
    <div>
      <button onClick={handlerSaveData}>guardar datos</button>
      <button onClick={handlerTraerData}>traer data</button>
    </div>
  );
}

export default saveData;
