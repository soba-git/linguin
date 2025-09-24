import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebaritem";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
}

export const Sidebar = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "lg:fixed lg:w-[260px] left-0 top-0 h-full flex flex-col px-4 border-r-4 bg-sidebar text-sidebar-foreground ring-1 ring-sidebar-ring",
                className
            )}
        >
            <div className="flex-1 overflow-y-auto">
                <Link href="/dashboard" className="flex items-center justify-center h-20">
                    <div className="relative w-24 h-24">
                        <Image
                            src="/header-logo.png"
                            alt="Linguin Logo"
                            fill
                            className="object-contain drop-shadow-lg transform transition-transform hover:scale-105"
                        />
                    </div>
                </Link>

                <div className="flex flex-col space-y-1 mt-4">
                    <SidebarItem label="Learn" href="/dashboard" icon="./sidebar items/book.svg" />
                    <SidebarItem label="Quests" href="/quests" icon="./sidebar items/scroll.svg" />
                    <SidebarItem label="Leaderboards" href="/leaderboards" icon="./sidebar items/trophy.svg" />
                    <SidebarItem label="Shop" href="/shop" icon="./sidebar items/store.svg" />
                </div>
            </div>
            <div className="p-6">
                    <ClerkLoading>
                        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                    </ClerkLoading>
                    <ClerkLoaded>
                            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: { width: "32px", height: "32px" } } }} />


                    </ClerkLoaded>
                </div>
        </div>
    );
};

export default Sidebar;