import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recipes = await prisma.recipes.findMany();
    return NextResponse.json(recipes);
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
    const { name, description, ingredients, instructions, user_id } =
      await request.json();

    const newRecipes = await prisma.recipes.create({
      data: {
        name,
        description,
        ingredients,
        instructions,
        user_id,
      },
    });

    return NextResponse.json(newRecipes);
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
