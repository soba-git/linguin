import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "incorrect" | "none";
  type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  const [audio, , controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
    controls.play();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative h-full rounded-2xl border-2 border-b-[5px] p-3 sm:p-4 lg:p-6 cursor-pointer transition-all duration-200",
        "hover:border-b-[3px] hover:translate-y-[2px] active:border-b-2 active:translate-y-[3px]",
        // Default state
        "bg-white border-gray-200 hover:bg-gray-50/80",
        // Selected state
        selected && "border-sky-300 border-b-sky-400 bg-sky-50 hover:bg-sky-50",
        // Correct state
        selected &&
          status === "correct" &&
          "border-green-300 border-b-green-400 bg-green-50 hover:bg-green-50",
        // Incorrect state
        selected &&
          status === "incorrect" &&
          "border-rose-300 border-b-rose-400 bg-rose-50 hover:bg-rose-50",
        // Disabled state
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        // Assist type modifications
        type === "ASSIST" && "p-4 w-full h-16 flex items-center"
      )}
    >
      {audio}

      {/* Image Container */}
      {imageSrc && (
        <div className="relative aspect-square mb-3 sm:mb-4 max-h-[70px] sm:max-h-[80px] lg:max-h-[120px] w-full flex items-center justify-center">
          <Image
            src={imageSrc}
            fill
            alt={text ?? "option"}
            className="object-contain"
          />
        </div>
      )}

      {/* Text and Shortcut Container */}
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          type === "ASSIST" && "w-full"
        )}
      >
        {/* Keyboard Shortcut Badge */}
        <div
          className={cn(
            "flex-shrink-0 min-w-[24px] min-h-[24px] sm:min-w-[28px] sm:min-h-[28px] lg:min-w-[32px] lg:min-h-[32px]",
            "border-2 rounded-lg flex items-center justify-center",
            "text-xs sm:text-sm lg:text-[15px] font-bold transition-colors",
            "bg-white border-gray-300 text-gray-400",
            selected && "border-sky-400 bg-sky-100 text-sky-600",
            selected &&
              status === "correct" &&
              "border-green-400 bg-green-100 text-green-600",
            selected &&
              status === "incorrect" &&
              "border-rose-400 bg-rose-100 text-rose-600"
          )}
        >
          {shortcut}
        </div>
        
        {/* Text */}
        <p
          className={cn(
            "text-neutral-700 text-sm sm:text-base lg:text-lg font-normal flex-1",
            selected && "text-sky-600 font-medium",
            selected && status === "correct" && "text-green-600 font-medium",
            selected && status === "incorrect" && "text-rose-600 font-medium",
            type === "ASSIST" && "text-center"
          )}
        >
          {text}
        </p>

        {/* Spacer for ASSIST type */}
        {type === "ASSIST" && <div className="w-8" />}
      </div>

      {/* Status Icon - Checkmark for correct */}
      {selected && status === "correct" && (
        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {/* Status Icon - X for incorrect */}
      {selected && status === "incorrect" && (
        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg z-10">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  );
};