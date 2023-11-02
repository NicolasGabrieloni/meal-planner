"use client";
import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { DayMeals, WeekMeals, useMyContext } from "../../Context";

const RemoveButton = ({
  dayName,
  mealType,
}: {
  dayName: keyof WeekMeals;
  mealType: keyof DayMeals;
}) => {
  const { removeMeal } = useMyContext();

  const handleRemoveClick = () => {
    removeMeal(dayName, mealType);
  };
  return (
    <div>
      <button
        className="flex h-[30px] w-[30px] justify-center rounded-md border border-black bg-[#ff8f8f] pt-[5px]"
        onClick={handleRemoveClick}
      >
        <IconTrash stroke={1} height={18} />
      </button>
    </div>
  );
};

export default RemoveButton;
