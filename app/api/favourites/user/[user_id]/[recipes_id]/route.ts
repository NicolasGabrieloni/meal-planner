import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    user_id: number;
    recipes_id: number;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    if (request.method === "DELETE") {
      const { user_id, recipes_id } = params;

      const deletedFavourites = await prisma.favourites.deleteMany({
        where: {
          user_id: Number(user_id),
          recipes_id: Number(recipes_id),
        },
      });

      if (!deletedFavourites || deletedFavourites.count === 0) {
        return NextResponse.json(
          {
            message: "No se encontraron favoritos para eliminar.",
          },
          {
            status: 404,
          },
        );
      }

      return NextResponse.json(
        {
          message: "Favoritos eliminados exitosamente.",
        },
        {
          status: 200,
        },
      );
    } else {
      return NextResponse.json(
        {
          message:
            "Método no permitido. Utiliza DELETE para eliminar favoritos.",
        },
        {
          status: 405,
        },
      );
    }
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
