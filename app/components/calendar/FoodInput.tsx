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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import router from "next/router";
import { Preset } from "@/data/presets";
interface PresetSelectorProps extends PopoverProps {
  presets: Preset[];
}

export default function FoodInput({ presets, ...props }: PresetSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="search">Agregar comida</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar comida</DialogTitle>
            <DialogDescription>
              Buscá entre todas las recetas, o aquello disponible según los
              ingredientes que tengas en tu almacén.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row space-x-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="search"
                  role="combobox"
                  aria-label="Buscar comidas..."
                  aria-expanded={open}
                  className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                  {selectedPreset ? selectedPreset.name : "Buscar comidas..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[270px]">
                <Command>
                  <CommandInput placeholder="Buscar comidas..." />
                  <CommandEmpty>Nada por aquí</CommandEmpty>
                  <CommandGroup heading="Disponibles al instante:">
                    {/* {presets.map((preset) => (
                    <CommandItem
                      key={preset.id}
                      onSelect={() => {
                        setSelectedPreset(preset);
                        setOpen(false);
                      }}
                    >
                      {preset.name}                 // ACÁ IRÍA EL MAP DE LAS RECETAS DISPONIBLES AL INSTANTE
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedPreset?.id === preset.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))} */}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <DialogFooter>
              <Button variant="green_outlined">Seleccionar</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
