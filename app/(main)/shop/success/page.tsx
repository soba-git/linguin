"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function SuccessInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get("reference");

    const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const run = async () => {
            const skip = process.env.NEXT_PUBLIC_SKIP_PAYSTACK === "1";
            if (skip) {
                setStatus("success");
                setMessage("Pro is now active (skipped checkout). Btw to showcase Paystack go to the root and in .env change NEXT_PUBLIC_SKIP_PAYSTACK to 0. Right now it is 1.");
                return;
            }
            if (!reference) return;
            setStatus("verifying");
            try {
                const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`);
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err?.error || "Verification failed");
                }
                setStatus("success");
                setMessage("Payment verified. Pro is now active.");
            } catch (e: any) {
                setStatus("error");
                setMessage(e?.message || "Something went wrong verifying your payment.");
            }
        };
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reference]);

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
            <Image src="/icons/infinity.png" alt="Pro" height={80} width={80} />
            <h1 className="text-2xl font-bold">Payment Status</h1>
            {status === "verifying" && <p>Verifying your payment...</p>}
            {status === "success" && <p className="text-green-600">{message}</p>}
            {status === "error" && <p className="text-red-600">{message}</p>}
            <div className="flex gap-3">
                <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
                <Button variant="secondary" onClick={() => router.push("/dashboard")}>Dashboard</Button>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-16">Loading…</div>}>
            <SuccessInner />
        </Suspense>
    );
}


