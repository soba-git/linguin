import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="w-full h-20 px-4 border-2">
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
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" fallbackRedirectUrl="/learn" signUpFallbackRedirectUrl="/learn">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    );
};

export default Header;
