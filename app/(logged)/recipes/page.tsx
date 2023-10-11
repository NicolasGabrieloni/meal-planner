import { Metadata } from "next";
import { SearchRecipes } from "@/components/recipes/Search";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <SearchRecipes />
    </>
  );
}
export default Recipes;
