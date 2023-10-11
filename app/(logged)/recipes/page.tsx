import { Metadata } from "next";
import { SearchRecipes } from "@/components/recipes/Search";
import LabelAndImages from "@/components/recipes/LabelAndImages";
import { AddRecipes } from "@/components/recipes/AddRecipes";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <AddRecipes />
      <LabelAndImages label="Recetas favoritas" />
      <LabelAndImages label="Destacadas de la semana" />
      <SearchRecipes />
    </>
  );
}
export default Recipes;
