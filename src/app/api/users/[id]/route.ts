import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER USUARIOS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    // busca el primer usuario con el id que le pasemos
    const user = await prisma.users.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    // si no existe, devuelve not found 404
    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        {
          status: 404,
        }
      );
    }
    //si existe, retorna el usuario encontrado
    return NextResponse.json(user);
  } catch (error) {
    // si el error es del servidor retorna el error y status 500
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

// ELIMINAR USUARIOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // busca el usuario con el id que le pasemos, si existe lo elimina
    const deletedUser = await prisma.users.delete({
      where: {
        id: Number(params.id),
      },
    });
    // retorna el usuario eliminado
    return NextResponse.json(deletedUser);
  } catch (error) {
    // si el usuario no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "user not found",
          },
          { status: 404 }
        );
      }
      // si el error es del servidor retorna el error y status 500
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

// ACTUALIZAR USUARIOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const { first_name, last_name, email, password, description } =
      await request.json();

    // busca el usuario con el id que le pasemos para actualizar los datos
    const userUpdate = await prisma.users.update({
      where: {
        id: Number(params.id),
      },
      data: {
        first_name,
        last_name,
        email,
        password,
        description,
      },
    });
    // devuelve el usuario actualizado
    return NextResponse.json(userUpdate);
  } catch (error) {
    // si el usuario no existe retorna not found 404
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "user not found",
          },
          { status: 404 }
        );
      }
      // si el error es del servidor retorna el error y status 500
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
