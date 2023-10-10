import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER RECETAS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca la primer receta con el id que le pasemos
    const receta = await prisma.recipes.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!receta) {
      return NextResponse.json(
        {
          message: "recipe not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna la receta encontrado
    return NextResponse.json(receta);
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

// ELIMINAR RECETAS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca la receta con el id que le pasemos, si existe lo elimina
    const deletedRecipe = await prisma.recipes.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna la receta eliminado
    return NextResponse.json(deletedRecipe);
  } catch (error) {
    // si la receta no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "recipe not found",
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

// ACTUALIZAR RECETAS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { name, description, ingredients, instructions, userId } =
      await request.json();

    // busca la receta con el id que le pasemos para actualizar los datos
    const recipeUpdate = await prisma.recipes.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        description,
        ingredients,
        instructions,
        userId,
      },
    });
    // devuelve la receta actualizado
    return NextResponse.json(recipeUpdate);
  } catch (error) {
    // si la receta no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "recipe not found",
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
