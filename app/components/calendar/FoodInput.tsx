"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopoverProps } from "@radix-ui/react-popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import { Preset } from "@/data/presets";
import { Recetas } from "../ApiCalls";
import { recipe } from "@/components/Types";
import { RecipesAvailable } from "./RecipesAvailable";
import { MyContextProvider, useMyContext } from "./Context";

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[];
}

export default function FoodInput({ presets, ...props }: PresetSelectorProps) {
  const [openRecipePopover, setOpenRecipePopover] = useState(false);
  const [openInstantPopover, setOpenInstantPopover] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const [recetas, setRecetas] = useState([]);
  const { data } = useMyContext();

  useEffect(() => {
    Recetas().then((resultados) => {
      const resultadosSinMapear = resultados;
      setRecetas(resultadosSinMapear);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedPreset(data);
    }
    console.log(data);
  }, [data]);

  const handleRecipeClick = (receta: recipe) => {
    setSelectedPreset(receta);
    setOpenRecipePopover(false);
  };

  console.log(selectedPreset);

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="search" className="w-fit min-w-[200px] ">
              {selectedPreset ? selectedPreset.name : "Agregar Comida"}
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
                      {selectedPreset
                        ? selectedPreset.name
                        : "Disponibles al instante"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[270px]">
                    <Command>
                      <CommandInput placeholder="Buscar:" />
                      <CommandEmpty>Nada por aquí</CommandEmpty>
                      <CommandGroup>
                        <RecipesAvailable />
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
                      {selectedPreset
                        ? selectedPreset.name
                        : "Todas las recetas"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[270px]">
                    <Command>
                      <CommandInput placeholder="Buscar:" />
                      <CommandEmpty>Nada por aquí</CommandEmpty>
                      <CommandGroup>
                        {recetas.map((receta: recipe) => (
                          <div key={receta.id} className="cursor-pointer">
                            <h3 onClick={() => handleRecipeClick(receta)}>
                              {receta.name}
                            </h3>
                          </div>
                        ))}
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
