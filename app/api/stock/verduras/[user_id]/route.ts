import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const verdura = await prisma.stock.findMany({
      where: {
        AND: [
          { user_id: Number(params.user_id) },
          {
            OR: [{ type_food: "verduras" }, { type_food: "frutas" }],
          },
        ],
      },
    });
    if (!verdura) {
      return NextResponse.json(
        {
          message: "food not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(verdura);
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
