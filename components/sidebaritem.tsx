"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon: string;
};

export const SidebarItem = ({ href, label, icon }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      asChild
      variant={active ? "sidebarOutline" : "sidebar"}
      className="h-[52px] w-full justify-start px-4 transition"
    >
      <Link href={href} className="flex items-center gap-3 w-full">
        <div className="w-7 h-7 flex items-center justify-center">
          <Image
            src={icon}
            alt={label}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <span className="font-medium">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
