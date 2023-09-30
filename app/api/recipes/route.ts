import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recetas = await prisma.recetas.findMany();
    return NextResponse.json(recetas);
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
      id_user,
    } = await request.json();

    const newUser = await prisma.recetas.create({
      data: {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        tiempo_preparacion,
        id_user,
      },
    });

    return NextResponse.json(newUser);
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
