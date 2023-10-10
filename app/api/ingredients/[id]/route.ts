import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER INGREDIENTES MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer ingrediente con el id que le pasemos
    const ingredients = await prisma.ingredients.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!ingredients) {
      return NextResponse.json(
        {
          message: "ingredient not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el ingrediente encontrado
    return NextResponse.json(ingredients);
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

// ELIMINAR INGREDIENTES MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el ingrediente con el id que le pasemos, si existe lo elimina
    const deletedIngredient = await prisma.ingredients.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el ingrediente eliminado
    return NextResponse.json(deletedIngredient);
  } catch (error) {
    // si el ingrediente no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "ingredient not found",
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

// ACTUALIZAR INGREDIENTE MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { name, unit, usersId } = await request.json();

    // busca el ingrediente con el id que le pasemos para actualizar los datos
    const ingredientUpdate = await prisma.ingredients.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        unit,
        usersId,
      },
    });
    // devuelve el ingrediente actualizado
    return NextResponse.json(ingredientUpdate);
  } catch (error) {
    // si el ingrediente no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "ingredient not found",
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
