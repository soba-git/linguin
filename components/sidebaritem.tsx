"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
    href: string;
    label: string;
    icon: string;
}

export const SidebarItem = ({ href, label, icon }: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button asChild variant={active ? "sidebarOutline" : "sidebar"} className="h-[52px] justify-start">
            <Link href={href} className="flex items-center w-full">
                <Image src={icon} alt={label} height= {34} width={34} className="mr-4" />
                {label}
            </Link>
        </Button>
    );
};
export default SidebarItem;