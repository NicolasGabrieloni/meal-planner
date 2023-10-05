import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER RECOMENDADOS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer recomendado con el id que le pasemos
    const recomendado = await prisma.recomendados.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!recomendado) {
      return NextResponse.json(
        {
          message: "recomended not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el recomendado encontrado
    return NextResponse.json(recomendado);
  } catch (error) {
    // si el error es del servidor retorna el error y status 500
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

// ELIMINAR RECOMENDADOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el recomendado con el id que le pasemos, si existe lo elimina
    const deletedRecomended = await prisma.recomendados.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el recomendado eliminado
    return NextResponse.json(deletedRecomended);
  } catch (error) {
    // si el recomendado no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "recomendado not found",
          },
          { status: 404 },
        );
      }
      // si el error es del servidor retorna el error y status 500
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

// ACTUALIZAR RECOMENDADOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      tiempo_preparacion,
    } = await request.json();

    // busca el recomendado con el id que le pasemos para actualizar los datos
    const recomendedUpdate = await prisma.recomendados.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        tiempo_preparacion,
      },
    });
    // devuelve el recomendado actualizado
    return NextResponse.json(recomendedUpdate);
  } catch (error) {
    // si el recomendado no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "recomendado not found",
          },
          { status: 404 },
        );
      }
      // si el error es del servidor retorna el error y status 500
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
