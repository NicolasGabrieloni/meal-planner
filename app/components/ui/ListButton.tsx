import { IconList } from "@tabler/icons-react";
import { Button } from "./button";
import Link from "next/link";

interface LabelType {
  label: string;
}

const ListButton = ({ label }: LabelType) => {
  return (
    <Link href="/shop-list" className="flex min-w-full justify-center">
      <Button variant="green_outlined" className="w-[220px] min-w-fit sm:h-10">
        {label}
        <IconList stroke={1} height={18} />
      </Button>
    </Link>
  );
};

export default ListButton;
