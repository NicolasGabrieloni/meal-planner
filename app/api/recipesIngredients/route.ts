import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recipesIngredients = await prisma.recipes_ingredients.findMany();
    return NextResponse.json(recipesIngredients);
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
    const { recipes_id, ingredients_id } = await request.json();

    const newRI = await prisma.recipes_ingredients.create({
      data: {
        recipes_id,
        ingredients_id,
      },
    });

    return NextResponse.json(newRI);
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
