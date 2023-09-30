import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER DESTACADOS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer usuario con el id que le pasemos
    const destacado = await prisma.destacados.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!destacado) {
      return NextResponse.json(
        {
          message: "featured not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el usuario encontrado
    return NextResponse.json(destacado);
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

// ELIMINAR DESTACADOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el plato con el id que le pasemos, si existe lo elimina
    const deletedFeatured = await prisma.destacados.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el plato eliminado
    return NextResponse.json(deletedFeatured);
  } catch (error) {
    // si el plato no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "featured not found",
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

// ACTUALIZAR DESTACADOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      tiempo_preparacion,
    } = await request.json();

    // busca el plato con el id que le pasemos para actualizar los datos
    const featuredUpdate = await prisma.destacados.update({
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
    // devuelve el plato actualizado
    return NextResponse.json(featuredUpdate);
  } catch (error) {
    // si el plato no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "featured not found",
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
