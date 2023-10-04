import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recFavourites = await prisma.recetas_favoritas.findMany();
    return NextResponse.json(recFavourites);
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
      usersId,
    } = await request.json();

    const newReceta = await prisma.recetas_favoritas.create({
      data: {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        tiempo_preparacion,
        usersId,
      },
    });

    return NextResponse.json(newReceta);
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
