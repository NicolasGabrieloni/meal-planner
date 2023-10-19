import { signIn } from "next-auth/react";
import { Button } from "./button";
import { IconBrandGoogle } from "@tabler/icons-react";

interface LabelType {
  label: string;
}

const GoogleButton = ({ label }: LabelType) => {
  return (
    <>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/home" })}
        variant="blue_outlined"
      >
        {label}
        <IconBrandGoogle height={19} className="ml-2" stroke={2.5} />
      </Button>
    </>
  );
};

export default GoogleButton;
