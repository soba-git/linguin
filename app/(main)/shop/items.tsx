"use client";

import { rechargeHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

/**
 * Calculates how many points it costs to recharge missing hearts.
 * Exported for use elsewhere (e.g., backend, other components).
 */
export const getRechargeCost = (hearts: number, maxHearts = 10): number => {
  const missingHearts = maxHearts - hearts;
  return missingHearts * 50;
};

type Props = {
  hearts: number;
  points: number;
  isProActive: boolean;
};

export const Items = ({ hearts, points, isProActive }: Props) => {
  const maxHearts = 10;
  const rechargeCost = getRechargeCost(hearts, maxHearts);

  const [isPending, startTransition] = useTransition();

  const onRecharge = () => {
    if (isPending || hearts === maxHearts || points < rechargeCost) {
      return;
    }

    startTransition(() => {
        rechargeHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image
          src="/icons/heart.png"
          alt="Heart"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Recharge Hearts
          </p>
        </div>

        <Button
          onClick={onRecharge}
          disabled={hearts === maxHearts || points < rechargeCost || isPending}
        >
          {hearts === maxHearts ? (
            "Full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/icons/bolt.png"
                alt="Bolt"
                height={20}
                width={20}
              />
              <p>{rechargeCost}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};
