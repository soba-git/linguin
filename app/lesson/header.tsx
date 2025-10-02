import { X, Infinity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/store/use-exit-modal";

type Props = {
    hearts: number;
    percentage: number;
    isProActive: boolean;
};

export const Header = ({
    hearts,
    percentage,
    isProActive,
}: Props) => {
    const { open } = useExitModal();

    return (
        <header className="bg-white">
            <div className="lg:pt-[50px] pt-[20px] pb-[16px] px-4 sm:px-6 lg:px-10 max-w-[1140px] mx-auto">
                <div className="flex items-center justify-between gap-4 lg:gap-7">
                    {/* Exit Button */}
                    <button
                        onClick={open}
                        className="flex-shrink-0 hover:opacity-75 transition-opacity"
                        aria-label="Exit quiz"
                    >
                        <X className="h-6 w-6 lg:h-7 lg:w-7 text-gray-400 stroke-[2.5]" />
                    </button>

                    {/* Progress Bar - Takes up remaining space */}
                    <div className="flex-1 min-w-0 max-w-[900px]">
                        <Progress value={percentage} />
                    </div>

                    {/* Hearts Display */}
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-lg lg:text-xl">
                        <Image
                            src="/icons/heart.png"
                            alt="Heart"
                            width={28}
                            height={28}
                        />
                        {isProActive ? (
                            <Infinity className="h-5 w-5 lg:h-6 lg:w-6 stroke-[3]" />
                        ) : (
                            hearts
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};