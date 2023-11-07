"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function AddRecipes() {
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = idUser ? parseInt(idUser as string) : null;
  const [file, setFile] = useState<File | undefined>();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: "",
    instructions: "",
    user_id: userId,
  });
  useEffect(() => {
    if (idUser) {
      const userId = parseInt(idUser as string);
      setFormData({
        ...formData,
        user_id: userId,
      });
    }
  }, [idUser]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleUpload = async () => {
    console.log(file);
    try {
      const response = await fetch("/api/updateFiles", {
        method: "POST",
        body: JSON.stringify({
          type: file?.type,
          name: file?.name,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image: result.url });
        handleSubmit();
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      formData.name &&
      formData.description &&
      formData.ingredients &&
      formData.instructions
    ) {
      try {
        const response = await fetch(`/api/recipes`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Receta enviada exitosamente");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error de red al enviar la receta", error);
      }
    } else {
      console.error("Completa todos los campos");
    }
  };

  return (
    <div className="flex justify-center p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="mt-4 h-[40px] min-w-[220px] text-sm font-semibold"
            variant="green_outlined"
          >
            Añadir nueva receta
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[310px] border border-[#343434]">
          <div className="grid gap-4">
            <div className="space-y-2 ">
              <h4 className="text-lg font-medium leading-none text-[#00785C]">
                Nueva receta
              </h4>
              <p className="text-muted-foreground text-sm">
                Agregá todo lo necesario para hacer la receta:
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Fideos con crema"
                  className="col-span-2 h-8 w-[180px] "
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Altos fideos bestia"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="ingredients">Ingredientes</Label>
                <Input
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Fideos, crema"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="instructions">Instrucciones</Label>
                <Input
                  id="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="..."
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="img">Imágen</Label>
                <Input
                  type="file"
                  name="file"
                  id="image"
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                  className="flex w-[160px] bg-[#E9FFEB]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="w-[100px] "
                variant="green_outlined"
                onClick={() => {
                  file === undefined ? handleSubmit() : handleUpload();
                }}
              >
                Enviar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
