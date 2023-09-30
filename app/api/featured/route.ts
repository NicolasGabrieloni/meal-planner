import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const usuarios = await prisma.destacados.findMany();
    return NextResponse.json(usuarios);
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

    const newUser = await prisma.destacados.create({
      data: {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        tiempo_preparacion,
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
