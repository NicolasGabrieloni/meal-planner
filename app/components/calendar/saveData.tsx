"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "./Context";
import { saveWeekMeals } from "./SaveWeekMeals";

function SaveData() {
  const { weekMeals, loadWeekMeals } = useMyContext();
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  useEffect(() => {
    if (userId) {
      loadWeekMeals(userId);
      console.log(userId);
    }
  }, [userId]);

  const handlerSaveData: MouseEventHandler<HTMLButtonElement> = () => {
    for (const day in weekMeals) {
      for (const mealType in weekMeals[day]) {
        const id = weekMeals.id;
        const mealName = weekMeals[day][mealType];
        saveWeekMeals(day, mealType, mealName, id);
      }
    }
  };

  if (!userId) {
    return <></>;
  }

  return (
    <div>
      <button onClick={handlerSaveData}>guardar datos</button>
    </div>
  );
}

export default SaveData;
