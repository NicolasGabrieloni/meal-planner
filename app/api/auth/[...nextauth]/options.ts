import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          description: token.description,
          age: token.age,
          location: token.location,
          sex: token.sex,
        };
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        //@ts-ignore
        token.description = user.description;
        //@ts-ignore
        token.age = user.age;
        //@ts-ignore
        token.location = user.location;
        //@ts-ignore
        token.sex = user.sex;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await prisma.users.findFirst({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          return null;
        }
        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatch) {
          return null;
        }
        return {
          id: `${existingUser.id}`,
          name: existingUser.username,
          email: existingUser.email,
          image: existingUser.image,
          description: existingUser.description,
          age: existingUser.age,
          location: existingUser.location,
          sex: existingUser.sex,
        };
      },
    }),
  ],
};
