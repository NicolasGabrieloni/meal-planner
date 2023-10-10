import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const recipeIngredient = await prisma.recipes_ingredients.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!recipeIngredient) {
      return NextResponse.json(
        {
          message: "not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(recipeIngredient);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedRI = await prisma.recipes_ingredients.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(deletedRI);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "not found",
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

// ACTUALIZAR DESTACADOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { recipes_id, ingredients_id } = await request.json();

    const RIUpdate = await prisma.recipes_ingredients.update({
      where: {
        id: Number(params.id),
      },
      data: {
        recipes_id,
        ingredients_id,
      },
    });
    return NextResponse.json(RIUpdate);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "not found",
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
