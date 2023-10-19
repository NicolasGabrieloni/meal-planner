import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const despensa = await prisma.despensa.findMany();
    return NextResponse.json(despensa);
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

    const newAlimentoDesp = await prisma.despensa.create({
      data: {
        user_id,
        cantidad,
        unidad_medida,
        nombre_alimento,
        tipo_alimento
      },
    });

    return NextResponse.json(newAlimentoDesp);
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
