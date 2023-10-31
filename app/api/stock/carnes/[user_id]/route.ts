import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const carnes = await prisma.stock.findMany({
      where: {
        AND: [{ user_id: Number(params.user_id) }, { type_food: "carnes" }],
      },
    });
    if (!carnes) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(carnes);
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