import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

export async function GET() {
  try {
    const usuarios = await prisma.users.findMany();
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

const UserSchema = z.object({
  username: z.string().min(1, "Nombre requerido").max(100),
  email: z
    .string()
    .min(1, "Email requerido")
    .email("El email ingresado no es válido"),
  password: z
    .string()
    .min(1, "Contraseña requerida")
    .min(8, "La contraseña debe tener 8 o más caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = UserSchema.parse(body);

    //chequear si el mail ya existe
    const existingEmail = await prisma.users.findFirst({
      where: { email: email as string },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Ya existe una cuenta registrada con este email",
        },
        { status: 409 },
      );
    }
    const hashedPass = await hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "Usuario registrado exitosamente",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Algo anduvo mal!" }, { status: 500 });
  }
}
