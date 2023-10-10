import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ingredientes = await prisma.ingredients.findMany();
    return NextResponse.json(ingredientes);
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
    const { name, unit, usersId } = await request.json();

    const newIngredientes = await prisma.ingredients.create({
      data: {
        name,
        unit,
        usersId,
      },
    });

    return NextResponse.json(newIngredientes);
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
