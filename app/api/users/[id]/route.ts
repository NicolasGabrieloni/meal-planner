import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// OBTENER USUARIOS MEDIANTE ID
export async function GET(request: Request, { params }: Params) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(user);
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

// ELIMINAR USUARIOS MEDIANTE ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "user not found",
          },
          { status: 404 },
        );
      }
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

// ACTUALIZAR USUARIOS MEDIANTE ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const {
      username,
      email,
      password,
      description,
      image,
      age,
      sex,
      location
    } = await request.json();

    const userUpdate = await prisma.users.update({
      where: {
        id: Number(params.id),
      },
      data: {
        username,
        email,
        password,
        description,
        image,
        age,
        sex,
        location,
      },
    });
    return NextResponse.json(userUpdate);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "user not found",
          },
          { status: 404 },
        );
      }
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
