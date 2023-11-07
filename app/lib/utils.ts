import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const uploadFile = async (file: File) => {
  let {
    data: { url, fileName },
  } = await axios.put(
    "https://g7os8mg446.execute-api.us-east-1.amazonaws.com/api/update-file-signature",
    {
      ext: "png",
    },
  );
  axios.put(url, file, {
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return fileName as string;
};

export default uploadFile;
