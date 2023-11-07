import { Metadata } from "next";
import ListButton from "@/components/ui/ListButton";
import { Buttton } from "@/components/ui/buttton";
import Profile from "@/components/home/Profile";
import { MiniCalendario } from "@/components/home/MiniCalendario";
import { MiniDespensa } from "@/components/home/MiniDespensa";
import { CarouselRecipes } from "@/components/ui/carouselRecipes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio",
};
export default function Home() {
  return (
    <div className="flex-col items-center p-4">
      <Profile />
      <div className="grid-cols-2 gap-4 md:grid ">
        <div className="pt-8">
          <MiniCalendario />
        </div>
        <div className="pt-8">
          <MiniDespensa />
        </div>
      </div>
      <div className="flex flex-col py-8">
        <CarouselRecipes label="Destacados de la semana" />
        <Button variant="blue_outlined" className="mx-auto my-4 w-fit">
          <Link href="/recipes">Ver todas las recetas</Link>
        </Button>
      </div>
    </div>
  );
}
