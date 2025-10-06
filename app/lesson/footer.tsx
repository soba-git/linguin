import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stat } from "fs";

type Props = {
    onCheck: () => void;
    status: "correct" | "incorrect" | "none" | "completed";
    disabled?: boolean;
    lessonId?: number;
};

export const Footer = ({
    onCheck,
    status,
    disabled,
    lessonId,
}: Props) => {
    const isMobile = useMedia("(max-width: 1024px)");
    useKey("Enter", onCheck, {}, [onCheck]);


    return (
        <footer className={cn(
            "lg:h-[140px] h-[100px] border-2",
            status === "correct" && "border-transparent bg-green-100",
            status === "incorrect" && "border-transparent bg-rose-100",
        )}>
            <div className="max-w-[1140px] h-full mx-auto flex-auto flex items-center justify-between px-6 lg:px-10">
                {status === "correct" && (
                    <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"></CheckCircle>Well done!
                    </div>
                )}
                {status === "incorrect" && (
                    <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"></XCircle>Try Again.
                    </div>
                )}
                {status === "completed" && (
                    <Button variant={"default"} size={isMobile ? "sm" : "lg"} onClick={() => window.location.href = `/lesson/${lessonId}`}>
                        Practice Again
                    </Button>
                )}
                <Button disabled={disabled} onClick={onCheck} variant={status === "incorrect" ? "danger" : "secondary"} size={isMobile ? "sm" : "lg"} className="ml-auto">
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "incorrect" && "Retry"}
                    {status === "completed" && "Continue"}
                </Button> 
            </div>


        </footer>
    )
}