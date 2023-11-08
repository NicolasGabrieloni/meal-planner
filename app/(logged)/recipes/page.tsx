import { Metadata } from "next";
import { CarouselRecipes } from "@/components/ui/carouselRecipes";
import CarouselFavourites from "@/components/recipes/CarouselFavourites";
import { SearchRecipes } from "@/components/recipes/Search";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <div className="flex flex-col lg:justify-around xl:flex-row">
        <CarouselFavourites label="Recetas favoritas" />
        <CarouselRecipes label="Destacados de la semana" />
      </div>
      <SearchRecipes />
    </>
  );
}
export default Recipes;
