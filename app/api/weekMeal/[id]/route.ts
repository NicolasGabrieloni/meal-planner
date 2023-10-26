import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER WEEKMEALS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer WEEKMEAL con el id que le pasemos
    const weekmeal = await prisma.weekMeal.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
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
    //si existe, retorna el weekmeal encontrado
    return NextResponse.json(weekmeal);
  } catch (error) {
    // si el error es del servidor retorna el error y status 500
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
    const { dayName, mealType, recipe_id, user_id } = await request.json();

    // busca el weekmeal con el id que le pasemos para actualizar los datos
    const userUpdate = await prisma.weekMeal.update({
      where: {
        id: Number(params.id),
      },
      data: {
        dayName,
        mealType,
        recipe_id,
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