import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const carnes = await prisma.stock.findMany({
      where: {
        type_food: "carnes",
      },
    });
    return NextResponse.json(carnes);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "carnes"', error);
  }
}
