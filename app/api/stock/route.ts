import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stock = await prisma.stock.findMany();
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



export async function POST(request: Request) {
  try {
    const { user_id, name_food, quantity, unit, type_food } =
      await request.json();

    const newFood = await prisma.stock.create({
      data: {
        user_id,
        name_food,
        quantity,
        unit,
        type_food,
      },
    });

    return NextResponse.json(newFood);
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
