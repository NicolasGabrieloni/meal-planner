import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const alacena = await prisma.stock.findMany({
      where: {
        type_food: "secos",
      },
    });
    return NextResponse.json(alacena);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "alacena"', error);
  }
}