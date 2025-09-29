
import { NotebookIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-5 text-white flex items-center justify-between shadow-md relative overflow-hidden">
      {/* Subtle decorative overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="space-y-2.5 relative z-10">
        <h3 className="text-2xl font-bold drop-shadow-sm">
          {title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      <Link href="/lesson" className="relative z-10">
        <Button 
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2 bg-white hover:bg-gray-50 text-green-600 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <NotebookIcon className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};