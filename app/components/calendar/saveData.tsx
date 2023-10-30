"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "./Context";
import { saveWeekMeals } from "./SaveWeekMeals";

function saveData() {
  const { weekMeals, loadWeekMeals } = useMyContext();
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  console.log(userId);

  useEffect(() => {
    loadWeekMeals(userId);
  }, []);

  const handlerSaveData: MouseEventHandler<HTMLButtonElement> = () => {
    for (const day in weekMeals) {
      for (const mealType in weekMeals[day]) {
        const mealName = weekMeals[day][mealType];
        saveWeekMeals(day, mealType, mealName, userId);
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
