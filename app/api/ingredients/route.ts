import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ingredientes = await prisma.ingredientes.findMany();
    return NextResponse.json(ingredientes);
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
    const { nombre, categoria, unidad_medida } = await request.json();

    const newIngredientes = await prisma.ingredientes.create({
      data: {
        nombre,
        categoria,
        unidad_medida,
      },
    });

    return NextResponse.json(newIngredientes);
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
