"use client";

import { AddRecipes } from "./AddRecipes";
import LabelDestacated from "./LabelDestacated";
import LabelFavourites from "./LabelFavourites";
import { SearchRecipes } from "./Search";

export default function RecipesComponents() {
  return (
    <>
      <AddRecipes />
      <LabelFavourites label="Recetas favoritas" />
      <LabelDestacated label="Destacadas de la semana" />
      <SearchRecipes />
    </>
  );
}
