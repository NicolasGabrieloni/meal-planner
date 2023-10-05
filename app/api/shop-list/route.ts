import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const shopList = await prisma.shop_list.findMany();
    return NextResponse.json(shopList);
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
    const { user_id, cantidad, unidad_medida, nombre_alimento, tipo_alimento } =
      await request.json();

    const newAlimento = await prisma.shop_list.create({
      data: {
        user_id,
        cantidad,
        unidad_medida,
        nombre_alimento,
        tipo_alimento
      },
    });

    return NextResponse.json(newAlimento);
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
