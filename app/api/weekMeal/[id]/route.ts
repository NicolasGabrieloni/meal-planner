import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: number;
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const weekmeal = await prisma.weekMeal.findMany({
      where: {
        user_id: params.user_id,
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

// ELIMINAR WEEKMEALS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el weekmeal con el id que le pasemos, si existe lo elimina
    const deletedWeekMeal = await prisma.weekMeal.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el weekmeal eliminado
    return NextResponse.json(deletedWeekMeal);
  } catch (error) {
    // si el weekmeal no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "weekmeal not found",
          },
          { status: 404 },
        );
      }
      // si el error es del servidor retorna el error y status 500
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

// ACTUALIZAR WEEKMEALS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { dayName, mealType, mealName, user_id } = await request.json();

    // busca el weekmeal con el id que le pasemos para actualizar los datos
    const userUpdate = await prisma.weekMeal.update({
      where: {
        id: Number(params.id),
      },
      data: {
        dayName,
        mealType,
        mealName,
        user_id,
      },
    });
    // devuelve el weekmeal actualizado
    return NextResponse.json(userUpdate);
  } catch (error) {
    // si el weekmeal no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "weekmeal not found",
          },
          { status: 404 },
        );
      }
      // si el error es del servidor retorna el error y status 500
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
