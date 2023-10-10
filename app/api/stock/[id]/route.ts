import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER ALIMENTOS DE DESPENSA MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer alimento con el id que le pasemos
    const food = await prisma.stock.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!food) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el usuario encontrado
    return NextResponse.json(food);
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

// ELIMINAR ALIMENTOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el alimento con el id que le pasemos, si existe lo elimina
    const deletedFood = await prisma.stock.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el alimento eliminado
    return NextResponse.json(deletedFood);
  } catch (error) {
    // si el alimento no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "food not found",
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

// ACTUALIZAR ALIMENTOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { user_id, name_food, quantity, unit, type_food } =
      await request.json();

    // busca el alimento con el id que le pasemos para actualizar los datos
    const foodUpdate = await prisma.stock.update({
      where: {
        id: Number(params.id),
      },
      data: {
        user_id,
        name_food,
        quantity,
        unit,
        type_food,
      },
    });
    // devuelve el alimento actualizado
    return NextResponse.json(foodUpdate);
  } catch (error) {
    // si el alimento no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "food not found",
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
