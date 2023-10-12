import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export async function GET() {
  try {
    const verdura = await prisma.stock.findMany({
      where: {
        OR: [{ type_food: "verdura" }, { type_food: "fruta" }],
      },
    });
    return NextResponse.json(verdura);
  } catch (error) {
    console.error('Error al obtener elementos de tipo "verdura"', error);
  }
}
