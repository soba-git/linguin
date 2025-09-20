import { ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="w-full h-20 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="relative w-24 h-24">
                    <Image
                        src="/header-logo.png"
                        alt="Linguin Logo"
                        fill
                        className="object-contain drop-shadow-lg transform transition-transform hover:scale-105"
                    />
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
            </div>
        </header>
    );
};

export default Header;
