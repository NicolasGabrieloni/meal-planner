import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
    recipes_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const favourites = await prisma.favourites.findMany({
      where: {
        user_id: Number(params.user_id),
      },
    });
    if (!favourites) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(favourites);
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
