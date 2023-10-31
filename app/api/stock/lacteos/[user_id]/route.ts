import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const lacteos = await prisma.stock.findMany({
      where: {
        AND: [{ user_id: Number(params.user_id) }, { type_food: "lacteos" }],
      },
    });
    if (!lacteos) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(lacteos);
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
