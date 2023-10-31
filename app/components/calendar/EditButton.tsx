import { IconEdit } from "@tabler/icons-react";
import { Button } from "../ui/button";

const EditButton = () => {
  return (
    <>
      <button className="flex h-[30px] w-[30px] justify-center rounded-md border border-black bg-[#E9FFEB] pt-[5px] ">
        <IconEdit stroke={1} height={18} />
      </button>
    </>
  );
};

export default EditButton;
