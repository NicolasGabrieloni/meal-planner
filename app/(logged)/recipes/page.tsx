import { Metadata } from "next";
import { CarouselRecipes } from "@/components/ui/carouselRecipes";
import CarouselFavourites from "@/components/recipes/CarouselFavourites";
import { SearchRecipes } from "@/components/Search";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <div>
        <CarouselFavourites label="Recetas favoritas" />
        <CarouselRecipes label="Destacados de la semana" />
      </div>
      <SearchRecipes />
    </>
  );
}
export default Recipes;
