import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER FAVORITOS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer favorito con el id que le pasemos
    const favorito = await prisma.favourites.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!favorito) {
      return NextResponse.json(
        {
          message: "favourite not found",
        },
        {
          status: 404,
        },
      );
    }
    //si existe, retorna el favorito encontrado
    return NextResponse.json(favorito);
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

// ELIMINAR FAVORITOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el favorito con el id que le pasemos, si existe lo elimina
    const deletedFavourite = await prisma.favourites.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el favorito eliminado
    return NextResponse.json(deletedFavourite);
  } catch (error) {
    // si el favorito no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "user not found",
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

// ACTUALIZAR FAVORITOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { recipes_id, user_id } = await request.json();

    // busca el favorito con el id que le pasemos para actualizar los datos
    const userUpdate = await prisma.favourites.update({
      where: {
        id: Number(params.id),
      },
      data: {
        recipes_id,
        user_id,
      },
    });
    // devuelve el favorito actualizado
    return NextResponse.json(userUpdate);
  } catch (error) {
    // si el favorito no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "favourite not found",
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
