import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <header className="sticky top-0 bg-white pb-3 lg:pt-5 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
    <div className="flex items-center">
      <Link href="/courses" passHref>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-6 w-6 stroke-2 text-neutral-400" />
        </Button>
      </Link>
    </div>

    <h1 className="font-bold text-lg text-center flex-1">{title}</h1>

    <div className="w-[40px]" /> {/* Spacer div to keep heading centered */}
  </header>
);