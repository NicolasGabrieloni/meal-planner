import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lacteos = await prisma.stock.findMany({
      where: {
        type_food: "lacteo",
      },
    });
    return NextResponse.json(lacteos);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "lacteos"', error);
  }
}
