"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = usePracticeModal();

    useEffect(() => setIsClient(true), []);

    
    
    if (!isClient) {
        return null;
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                        src="/icons/heart.png" alt="Heart" height={100} width={100}/>
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Practice Lesson
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Practice Lessons to regain hearts and points. You cannot lose hearts or points in practice lessons.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-5 mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant={"primary"} className="w-full" size={"lg"} onClick={()=> {
                            close();
                        }}>
                            Okay
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}