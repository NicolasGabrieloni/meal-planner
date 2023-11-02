import { Metadata } from "next";
import ListButton from "@/components/ui/ListButton";
import { Buttton } from "@/components/ui/buttton";
import Profile from "@/components/home/Profile";
import { MiniCalendario } from "@/components/MiniCalendario";
import { MiniDespensa } from "@/components/MiniDespensa";

export const metadata: Metadata = {
  title: "Inicio",
};
export default function Home() {
  return (
    <div className="flex-col items-center p-4">
      <Profile />
      <div className="grid-cols-2 gap-4 md:grid ">
        <div className="pt-8">
          <MiniCalendario />
          <div className="pt-8 md:items-center">
            <ListButton label="Ver lista de compras" />
          </div>
        </div>
        <div className="pt-8">
          <MiniDespensa />
        </div>
      </div>
    </div>
  );
}
