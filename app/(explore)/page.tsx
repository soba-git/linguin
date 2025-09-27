import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ClerkLoading, ClerkLoaded, SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 min-h-screen">
      <div className="relative w-[240px] h-[240px] lg:w-[480px] lg:h-[420px] mb-12 lg:mb-0">
        <Image
          src="/hero.png"
          fill
          className="object-contain"
          alt="Hero Image"
        />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn Languages of the World with Linguin.
        </h1>
        <div className="flex flex-col w-full max-w-[320px] lg:max-w-[360px] space-y-2 justify-center">
          <ClerkLoading>
            <Loader className="animate-spin h-5 w-5 text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard" signInFallbackRedirectUrl="/dashboard" asChild>
                <Button className="w-full" size="lg" variant={"secondary"}>Get Started</Button>
              </SignUpButton>
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/dashboard" asChild>
                <Button className="w-full" size="lg" variant={"primaryOutline"}>I Already Have an Account</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="w-full" size="lg" variant={"secondary"}>Continue Learning</Button>
              </Link>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}