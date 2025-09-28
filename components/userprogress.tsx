import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  isProActive: boolean;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  isProActive,
}: Props) => {
  return (
    <div className="flex items-center justify-end gap-4 w-full">
      {/* Active course */}
      <Link href="/courses">
        <Button
          variant="ghost"
          className="p-1 hover:bg-neutral-100 transition rounded-full"
        >
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={36}
            height={36}
            className="rounded-lg border shadow-sm"
          />
        </Button>
      </Link>

      {/* Points */}
      <Link href="/shop">
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 text-orange-500 font-semibold w-28 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition"
        >
          <Image
            src="/icons/bolt.png"
            alt="Points"
            width={20}
            height={20}
            className="drop-shadow-sm"
          />
          {points}
        </Button>
      </Link>

      {/* Hearts / Lives */}
      <Link href="/shop">
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 text-red-500 font-semibold w-28 h-10 rounded-full bg-red-50 hover:bg-red-100 transition"
        >
          <Image
            src="/icons/heart.png"
            alt="Hearts"
            width={20}
            height={20}
            className="drop-shadow-sm"
          />
          {isProActive ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
