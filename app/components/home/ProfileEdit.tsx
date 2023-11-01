"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDots } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEventHandler, SetStateAction, useState } from "react";

export function ProfileEdit() {
  const { data: session } = useSession();
  const [description, setDescription] = useState(session?.user?.description);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDescriptionChange = (event: { target: { value: string } }) => {
    setDescription(event.target.value);
  };

  // const handleImageChange = (event: {
  //   target: { files: ChangeEventHandler<HTMLInputElement> };
  // }) => {
  //   setSelectedImage(event.target.files[0]);
  // };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("description", description);
    // if (selectedImage) {
    //   formData.append("image", selectedImage);
    // }
    try {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("bien rey");
      } else {
        console.log("mmm no");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex h-[16px] w-[25px] items-center rounded-md border border-black bg-[#80FF95]  ">
          <IconDots stroke={1} height={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-screen rounded-xl border border-[#343434] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium text-[#00785C]">
            Editar perfil
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between space-y-5">
          <div className="flex flex-row items-center space-x-5">
            <Image
              src={session?.user?.image as string}
              alt="User profile image"
              width={200}
              height={200}
              className="max-h-[70px] max-w-[70px] rounded-full"
            />
            <Input
              type="file"
              id="image"
              //onChange={handleImageChange}
              className="flex w-[160px] bg-[#E9FFEB]"
            />
          </div>
          <div>
            <h4>Edad:</h4>
            <input type="number" />
          </div>
          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="description" className="items-center">
              Descripción
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={3}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            />
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button
            variant={"green_outlined"}
            className="w-fit"
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
