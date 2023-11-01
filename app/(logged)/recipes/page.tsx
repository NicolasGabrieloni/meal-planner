import { Metadata } from "next";
import { CarouselRecipes } from "@/components/ui/carouselRecipes";
import CarouselFavourites from "@/components/recipes/CarouselFavourites";
import { SearchRecipes } from "@/components/Search";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  // PARA QUE FUNCIONEN LOS FAVS EN TIEMPO REAL HAY QUE PONER TODAS LAS FUNCIONES Y
  // LOS ESTADOS EN EL COMPONENTE PADRE Y PASARLAS POR PROPS A LOS HIJOS.

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
