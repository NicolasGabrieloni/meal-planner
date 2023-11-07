import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        user_id: Number(params.user_id),
      },
    });
    if (!stock) {
      return NextResponse.json(
        {
          message: "stock not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(stock);
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
