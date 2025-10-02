"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileSidebar } from "@/components/mobilesiderbar";
import { useEffect, useState } from "react";

export const MobileHeader = () => {
    // This compact top bar shows course flag, points and hearts
    // Data is currently not fetched here; the dashboard already shows them in the right panel on desktop.
    // For mobile we render placeholders that can be hydrated later.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <nav className="px-3 fixed border-b top-0 left-0 w-full right-0 h-[50px] bg-white lg:hidden flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <MobileSidebar />
                <Link href="/courses" className="flex items-center">
                    <Image src="/flags/usa.webp" alt="Course" width={28} height={28} className="rounded" />
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Link href="/shop" className="flex items-center gap-1 text-orange-500">
                    <Image src="/icons/bolt.png" alt="Energy" width={18} height={18} />
                    <span className="text-sm font-semibold">1</span>
                </Link>
                <Link href="/shop" className="flex items-center gap-1 text-red-500">
                    <Image src="/icons/heart.png" alt="Hearts" width={18} height={18} />
                    <span className="text-sm font-semibold">5</span>
                </Link>
            </div>
        </nav>
    );
};

export default MobileHeader;