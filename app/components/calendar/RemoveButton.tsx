import { IconTrash } from "@tabler/icons-react";

export default function RemoveButton() {
  return (
    <div>
      <button className="flex h-[30px] w-[30px] justify-center rounded-md border border-black bg-[#fa5252] pt-[2px] ">
        <IconTrash stroke={1} />
      </button>
    </div>
  );
}
