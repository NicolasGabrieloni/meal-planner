import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "Meal Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#80FF95] to-[#22859B]`}
      >
        {children}
      </body>
    </html>
  );
}
