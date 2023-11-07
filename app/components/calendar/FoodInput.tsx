"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup } from "cmdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//@ts-ignore
import { RecipesAvailable } from "./RecipesAvailable";
import { useMyContext, WeekMeals, DayMeals } from "../../Context";
import AllRecipes from "./AllRecipes";

export default function FoodInput({
  dayName,
  mealType,
}: {
  dayName: keyof WeekMeals;
  mealType: keyof DayMeals;
}) {
  const [openRecipePopover, setOpenRecipePopover] = useState(false);
  const [openInstantPopover, setOpenInstantPopover] = useState(false);
  const { weekMeals } = useMyContext();

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="search"
              className="w-full min-w-[240px] sm:h-10 sm:text-sm md:min-w-[300px]"
            >
              {weekMeals[dayName][mealType]
                ? weekMeals[dayName][mealType]
                : "Agregar Comida"}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-screen rounded-xl border border-[#343434] md:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-[#00785C]">
                Agregar comida
              </DialogTitle>
              <DialogDescription>
                Buscá entre todas las recetas, o aquellas disponible según los
                ingredientes que tengas en tu almacén.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="available">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="available">Disponibles</TabsTrigger>
                <TabsTrigger value="recipes">Recetas</TabsTrigger>
              </TabsList>
              <TabsContent value="available" className="mx-auto flex w-[260px]">
                <Popover
                  open={openInstantPopover}
                  onOpenChange={setOpenInstantPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="search"
                      role="combobox"
                      aria-label="Disponibles al instante"
                      aria-expanded={openInstantPopover}
                      className="mt-2 flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                    >
                      {weekMeals[dayName][mealType]
                        ? weekMeals[dayName][mealType]
                        : "Disponibles al instante"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[270px]">
                    <Command>
                      <CommandEmpty></CommandEmpty>
                      <CommandGroup>
                        <RecipesAvailable
                          dayName={dayName}
                          mealType={mealType}
                        />
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TabsContent>
              <TabsContent value="recipes" className="mx-auto flex w-[260px]">
                <Popover
                  open={openRecipePopover}
                  onOpenChange={setOpenRecipePopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="search"
                      role="combobox"
                      aria-label="Todas las recetas"
                      aria-expanded={openRecipePopover}
                      className="mb-2 flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                    >
                      {weekMeals[dayName][mealType]
                        ? weekMeals[dayName][mealType]
                        : "Todas las recetas"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[270px]">
                    <Command>
                      <CommandGroup>
                        <AllRecipes dayName={dayName} mealType={mealType} />
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
