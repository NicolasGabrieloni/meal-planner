import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recFavourites = await prisma.favourites.findMany();
    return NextResponse.json(recFavourites);
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
    const { recipes_id, user_id } = await request.json();

    const newReceta = await prisma.favourites.create({
      data: {
        recipes_id,
        user_id,
      },
    });

    return NextResponse.json(newReceta);
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
