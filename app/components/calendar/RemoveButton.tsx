import { IconTrash } from "@tabler/icons-react";

export default function RemoveButton() {
  return (
    <div>
      <button className="flex h-[30px] w-[30px] justify-center rounded-md border border-black bg-[#ff8f8f] pt-[5px] ">
        <IconTrash stroke={1} height={18} />
      </button>
    </div>
  );
}
