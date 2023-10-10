import { Metadata } from "next";
import { SearchRecipes } from "@/components/Search";

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
