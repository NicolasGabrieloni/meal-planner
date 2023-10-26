import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recomended = await prisma.recomendados.findMany();
    return NextResponse.json(recomended);
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
    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      tiempo_preparacion,
    } = await request.json();

    const newReco = await prisma.recomendados.create({
      data: {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        tiempo_preparacion,
      },
    });

    return NextResponse.json(newReco);
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
