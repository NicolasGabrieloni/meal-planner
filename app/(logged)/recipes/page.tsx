import { Metadata } from "next";
import RecipesComponents from "@/components/recipes/RecipesComponents";
import { CarouselRecipes } from "@/components/ui/carouselRecipes";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <RecipesComponents />
      <CarouselRecipes label="Destacados de la semana" />
    </>
  );
}
export default Recipes;
