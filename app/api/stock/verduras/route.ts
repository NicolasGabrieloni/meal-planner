import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const verdura = await prisma.stock.findMany({
      where: {
        OR: [{ type_food: "verduras" }, { type_food: "frutas" }],
      },
    });
    return NextResponse.json(verdura);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "verdura"', error);
  }
}
