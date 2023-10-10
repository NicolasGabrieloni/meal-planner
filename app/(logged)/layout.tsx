import { NavMenu } from "@/components/NavMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto  bg-[#FAFAFA] ">
      <NavMenu />
      <div className="mt-[71px] h-max w-max lg:ml-[71px]">{children}</div>
    </div>
  );
}
