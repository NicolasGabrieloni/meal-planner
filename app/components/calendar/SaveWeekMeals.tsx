import { NextResponse } from "next/server";
import { WeekMeals, DayMeals } from "../../Context";
import prisma from "@/lib/prisma";

const saveWeekMeals = async (
  dayName: keyof WeekMeals,
  mealType: keyof DayMeals,
  mealName: string,
  user_id: number,
) => {
  const res = await fetch(`/api/weekMeal`, {
    method: "POST",
    body: JSON.stringify({
      dayName,
      mealType,
      mealName,
      user_id,
    }),
  });
  if (res.ok) {
    console.log("todo ok");
  } else {
    console.error("todo mal");
  }
};

const getWeekMeals = async (userId: number) => {
  try {
    const weekMeals = await prisma.weekMeal.findMany({
      where: {
        user_id: userId,
      },
    });
    return NextResponse.json(weekMeals);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "weekmeal"', error);
  }
};

export { saveWeekMeals, getWeekMeals };
