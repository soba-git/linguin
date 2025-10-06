"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push("/store");
    }
    
    if (!isClient) {
        return null;
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                        src="/pengi/knocked out.png" alt="Sad Penguin" height={120} width={120}/>
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Out of Hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Pro for unlimited hearts, or use your points to purchase them.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-5 mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant={"primary"} className="w-full" size={"lg"} onClick={onClick}>
                            Go to Store
                        </Button>
                        <Button variant={"primaryOutline"} className="w-full" size={"lg"} onClick={()=> {
                            close();
                            router.push("/dashboard");
                        }}>
                            No Thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}