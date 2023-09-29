import { NavMenu } from "@/components/NavMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-white">
      <NavMenu />
      {children}
    </div>
  );
}
