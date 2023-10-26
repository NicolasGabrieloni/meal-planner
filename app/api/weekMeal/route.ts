import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const weekMeals = await prisma.weekMeal.findMany();
    return NextResponse.json(weekMeals);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { dayName, mealType, recipe_id, user_id } = await request.json();

    const newWeekMeal = await prisma.weekMeal.create({
      data: {
        dayName,
        mealType,
        recipe_id,
        user_id,
      },
    });

    return NextResponse.json(newWeekMeal);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}
