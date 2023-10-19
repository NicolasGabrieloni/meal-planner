import { Metadata } from "next";
import RecipesComponents from "@/components/recipes/RecipesComponents";

export const metadata: Metadata = {
  title: "Recetas",
};

async function Recipes() {
  return (
    <>
      <RecipesComponents />
    </>
  );
}
export default Recipes;
