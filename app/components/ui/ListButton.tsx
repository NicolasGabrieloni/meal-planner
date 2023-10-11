import { IconList } from "@tabler/icons-react";
import { Button } from "./button";
import Link from "next/link";

interface LabelType {
  label: string;
}

const ListButton = ({ label }: LabelType) => {
  // ACÁ IRÍA TODA LA LÓGICA DEL BOTÓN GENERAR LISTA DE COMPRAS
  return (
    <Link href="/shop-list" className="flex min-w-full justify-center">
      <Button variant="green_outlined" className="min-w-fit">
        {label}
        <IconList stroke={1} height={18} />
      </Button>
    </Link>
  );
};

export default ListButton;
