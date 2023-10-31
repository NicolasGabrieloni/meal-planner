import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const alacena = await prisma.stock.findMany({
      where: {
        AND: [{ user_id: Number(params.user_id) }, { type_food: "secos" }],
      },
    });
    if (!alacena) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(alacena);
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
