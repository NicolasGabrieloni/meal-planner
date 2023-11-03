"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "../../Context";
import { saveWeekMeals } from "./SaveWeekMeals";
import { Button } from "../ui/button";

function SaveData() {
  const { weekMeals, loadWeekMeals } = useMyContext();
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (userId) {
      loadWeekMeals(userId);
    }
  }, [userId]);

  const handlerSaveData = () => {
    for (const day in weekMeals) {
      for (const mealType in weekMeals[day]) {
        const mealName = weekMeals[day][mealType];
        saveWeekMeals(day, mealType, mealName, userId);
      }
    }
    setHasChanges(false);
  };
  useEffect(() => {
    setHasChanges(true);
  }, [weekMeals]);

  if (!userId) {
    return <></>;
  }

  return (
    <div>
      <Button
        variant="blue_outlined"
        className="text-sm font-semibold"
        onClick={handlerSaveData}
        disabled={!hasChanges}
      >
        Guardar
      </Button>
    </div>
  );
}

export default SaveData;
