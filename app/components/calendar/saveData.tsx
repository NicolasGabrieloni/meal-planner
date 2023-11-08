"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMyContext } from "../../Context";
import { saveWeekMeals } from "./SaveWeekMeals";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SaveData() {
  const { weekMeals, loadWeekMeals } = useMyContext();
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [hasChanges, setHasChanges] = useState(false);

  const notify = () =>
    toast.success("Guardado correctamente", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    notify();
  };

  useEffect(() => {
    setHasChanges(true);
  }, [weekMeals]);

  if (!userId) {
    return <></>;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Button
        variant="blue_outlined"
        className="w-full max-w-[400px] text-base font-semibold sm:h-12 sm:text-lg"
        onClick={handlerSaveData}
        disabled={!hasChanges}
      >
        Guardar
      </Button>
    </div>
  );
}

export default SaveData;
