import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  active,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "relative flex flex-col items-center justify-start p-4 pt-6 min-h-[180px] min-w-[200px] border-2 border-b-4 rounded-xl bg-white cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-lg active:border-b-2",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {/* Active check mark top-right */}
      {active && (
        <div className="absolute top-2 right-2 rounded-full bg-green-600 p-1.5 flex items-center justify-center">
          <Check className="h-4 w-4 stroke-[3] text-white" />
        </div>
      )}

      {/* Flag image container */}
      <div className="w-24 h-16 mb-3 border relative rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover" // change from object-contain to object-cover
        />
      </div>

      {/* Title */}
      <p className="text-center font-bold text-neutral-700">{title}</p>

      {/* Optional: learners count */}
      {/* <p className="text-center text-sm text-neutral-500 mt-1">5.4K learners</p> */}
    </div>
  );
};
