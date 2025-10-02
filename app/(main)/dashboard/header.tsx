"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="sticky top-0 bg-white py-3 flex items-center justify-between border-b-2 mb-5 text-neutral-600 z-50">
      {/* Back button */}
      <Link href="/courses" passHref>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-6 w-6 stroke-2 text-neutral-400" />
        </Button>
      </Link>

      {/* Title */}
      <h1 className="font-bold text-lg text-center flex-1 truncate">
        {title}
      </h1>

      {/* Spacer to balance layout */}
      <div className="w-[40px]" />
    </header>
  );
};
