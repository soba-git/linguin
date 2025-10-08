"use client";

import { rechargeHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

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
  const [isPaying, setIsPaying] = useState(false);
  const { user } = useUser();

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
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/icons/infinity.png"
          alt="Pro"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlock Pro
          </p>
          <p className="text-neutral-500 text-sm">Unlimited hearts and more.</p>
        </div>
        <Button
          disabled={isProActive || isPaying}
          onClick={async () => {
            try {
              if (!user?.primaryEmailAddress?.emailAddress) {
                toast.error("Missing email on account");
                return;
              }
              setIsPaying(true);
              const skip = process.env.NEXT_PUBLIC_SKIP_PAYSTACK === "1";
              if (skip) {
                const res = await fetch("/api/pro/activate", { method: "POST" });
                if (!res.ok) {
                  const err = await res.json().catch(() => ({}));
                  throw new Error(err?.error || "Activation failed");
                }
                window.location.href = "/shop/success";
                return;
              }

              const res = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: user.primaryEmailAddress.emailAddress,
                  amount: 100, // R1.00 in cents
                  currency: "ZAR",
                  callback_url: `${window.location.origin}/shop/success`,
                }),
              });
              if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.error || "Failed to start checkout");
              }
              const json = await res.json();
              const url = json?.authorizationUrl as string | undefined;
              if (!url) {
                throw new Error("Invalid checkout response");
              }
              window.location.href = url;
            } catch (e: any) {
              toast.error(e?.message || "Payment init failed");
            } finally {
              setIsPaying(false);
            }
          }}
        >
          {isProActive ? "Active" : isPaying ? "Redirecting..." : "Go Pro"}
        </Button>
      </div>
    </ul>
  );
};
