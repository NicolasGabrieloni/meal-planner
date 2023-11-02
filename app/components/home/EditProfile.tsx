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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { IconDots } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";

const EditFormSchema = z.object({
  description: z
    .string()
    .min(10, "Mínimo 10 caracteres")
    .max(200, "Máximo 200 caracteres")
    .optional(),
  age: z.number().min(1).min(3).optional(),
  sex: z.string(),
  location: z
    .string()
    .min(4, "Ingresa una localización correcta.")
    .max(100)
    .optional(),
});

export const EditProfile = () => {
  const fileInputRef = useRef(null);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof EditFormSchema>) => {
    const imageFile = fileInputRef.current?.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    setSubmitting(true);
    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: values.description,
          image: imageFile,
          age: values.age,
          sex: values.sex,
          location: values.location,
        }),
      });
      if (response.ok) {
        console.log("godetooo");
      } else {
        console.error("negativo rey");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setSubmitting(false);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-3 py-4">
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
                  ref={fileInputRef}
                  className="flex w-[160px] bg-[#E9FFEB]"
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Descripción</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Edad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sexo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Prefiero no decirlo.">
                          Prefiero no decirlo.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Ciudad</FormLabel>
                    <FormControl>
                      <Input placeholder="Santa Fe, Argentina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center space-y-1 py-2">
              <Button variant={"green_outlined"} disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
