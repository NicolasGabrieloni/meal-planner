import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number | unknown
      description: string | unknown
    } & DefaultSession["user"]
  }
}