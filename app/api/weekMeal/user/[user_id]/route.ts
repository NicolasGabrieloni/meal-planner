import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.user_id);
  try {
    const weekmeal = await prisma.weekMeal.findMany({
      where: {
        user_id: Number(params.user_id),
      },
    });
    if (!weekmeal) {
      return NextResponse.json(
        {
          message: "weekmeal not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(weekmeal);
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { dayName, mealType, mealName, id } = await request.json();

    const userUpdate = await prisma.weekMeal.upsert({
      where: {
        id: id,
      },
      update: {
        dayName,
        mealType,
        mealName,
      },
      create: {
        dayName,
        mealType,
        mealName,
      },
    });
    return NextResponse.json(userUpdate);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "weekmeal not found",
          },
          { status: 404 },
        );
      }
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
