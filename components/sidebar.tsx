import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebaritem";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "lg:fixed lg:w-[260px] left-0 top-0 h-full flex flex-col px-4 border-r-4 bg-sidebar text-sidebar-foreground ring-1 ring-sidebar-ring",
        className
      )}
    >
      {/* Logo */}
      <div className="flex-1 overflow-y-auto">
        <Link
          href="/dashboard"
          className="flex items-center justify-center h-20"
        >
          <div className="relative w-24 h-24">
            <Image
              src="/header-logo.png"
              alt="Linguin Logo"
              fill
              className="object-contain drop-shadow-lg transform transition-transform hover:scale-105"
            />
          </div>
        </Link>

        {/* Sidebar items */}
        <div className="flex flex-col space-y-1 mt-4">
          <SidebarItem
            label="Learn"
            href="/dashboard"
            icon="/sidebar items/book.png"
          />
          <SidebarItem
            label="Quests"
            href="/quests"
            icon="./sidebar items/scroll.svg"
          />
          <SidebarItem
            label="Leaderboards"
            href="/leaderboards"
            icon="./sidebar items/trophy.svg"
          />
          <SidebarItem
            label="Shop"
            href="/shop"
            icon="./sidebar items/store.svg"
          />
        </div>
      </div>

      {/* User button */}
      <div className="p-6 flex justify-center">
        <ClerkLoading>
          <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: { width: "36px", height: "36px" },
                },
              }}
            />
          </div>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;