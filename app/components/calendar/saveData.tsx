"use client";

import React, { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "./Context";
import { saveWeekMeals } from "./SaveWeekMeals";

function saveData() {
  const { data: session } = useSession();
  const { weekMeals } = useMyContext();

  const idUser = session?.user.id;
  const idasNumber = parseInt(idUser as string);

  const handlerSaveData: MouseEventHandler<HTMLButtonElement> = () => {
    for (const day in weekMeals) {
      for (const mealType in weekMeals[day]) {
        const mealName = weekMeals[day][mealType];
        saveWeekMeals(day, mealType, mealName, idasNumber);
      }
    }
  };

  return (
    <div>
      <button onClick={handlerSaveData}>guardar datos</button>
    </div>
  );
}

export default saveData;
