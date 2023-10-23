import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { useMyContext } from "./Context";

const RemoveButton: React.FC = () => {
  const { removeData } = useMyContext();

  const handleRemoveClick = () => {
    removeData();
  };

  return (
    <div>
      <button
        className="flex h-[30px] w-[30px] justify-center rounded-md border border-black bg-[#ff8f8f] pt-[5px]"
        onClick={handleRemoveClick}
      >
        <IconTrash stroke={1} height={18} />
      </button>
    </div>
  );
};

export default RemoveButton;
