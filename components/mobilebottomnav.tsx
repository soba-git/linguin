"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type BottomTab = {
  href: string;
  label: string;
  icon: string;
};

const TABS: BottomTab[] = [
  { href: "/dashboard", label: "Learn", icon: "/sidebar items/book.png" },
  { href: "/quests", label: "Quests", icon: "/sidebar items/scroll.svg" },
  { href: "/leaderboards", label: "Leaders", icon: "/sidebar items/trophy.svg" },
  { href: "/shop", label: "Shop", icon: "/sidebar items/store.svg" },
];

export const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-50">
      <ul className="h-full grid grid-cols-4">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="h-full">
              <Link
                href={tab.href}
                className="h-full w-full flex flex-col items-center justify-center gap-1"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className={`text-xs ${active ? "text-green-600 font-semibold" : "text-neutral-600"}`}>
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;

