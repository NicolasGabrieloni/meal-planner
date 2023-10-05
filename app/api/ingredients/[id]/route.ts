import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER INGREDIENTES MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer usuario con el id que le pasemos
    const destacado = await prisma.ingredientes.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!destacado) {
      return NextResponse.json(
        {
          message: "ingrediente not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el ingrediente encontrado
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
    // busca el ingrediente con el id que le pasemos, si existe lo elimina
    const deletedFeatured = await prisma.ingredientes.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el ingrediente eliminado
    return NextResponse.json(deletedFeatured);
  } catch (error) {
    // si el ingrediente no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "ingrediente not found",
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

// ACTUALIZAR INGREDIENTE MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { nombre, categoria, unidad_medida } = await request.json();

    // busca el ingrediente con el id que le pasemos para actualizar los datos
    const featuredUpdate = await prisma.ingredientes.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre,
        categoria,
        unidad_medida,
      },
    });
    // devuelve el ingrediente actualizado
    return NextResponse.json(featuredUpdate);
  } catch (error) {
    // si el ingrediente no existe retorna not found 404
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
