import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";
import db from "@/db/drizzle";
import { proMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const reference = searchParams.get("reference");
        if (!reference) {
            return NextResponse.json({ error: "reference is required" }, { status: 400 });
        }

        const result = await verifyTransaction(reference);
        if (!result.status) {
            return NextResponse.json({ error: result.message || "Verification failed" }, { status: 400 });
        }

        const data = result.data;
        const metadataUserId = data?.metadata?.userId as string | undefined;
        if (!metadataUserId) {
            return NextResponse.json({ error: "Missing userId in metadata" }, { status: 400 });
        }

        const customerId = String(data?.customer?.id ?? data?.customer?.customer_code ?? "");
        const subscriptionId = String(
            data?.subscription?.subscription_code ?? data?.plan_subscriptions?.[0]?.subscription_code ?? ""
        );
        const priceId = String(data?.plan ?? data?.plan_object?.plan_code ?? "");

        const paidAt = data?.paidAt || data?.paid_at || data?.paid_at_date;
        const nextPaymentDate = data?.next_payment_date || data?.subscription?.next_payment_date;
        const endDate = nextPaymentDate ? new Date(nextPaymentDate) : paidAt ? new Date(paidAt) : new Date();

        // Upsert into pro_members
        const existing = await db.query.proMembers.findFirst({ where: eq(proMembers.userId, metadataUserId) });
        if (existing) {
            await db
                .update(proMembers)
                .set({
                    paystackCustomerId: customerId || existing.paystackCustomerId,
                    paystackSubscriptionId: subscriptionId || existing.paystackSubscriptionId,
                    paystackPriceId: priceId || existing.paystackPriceId,
                    paystackCurrentSubscriptionEnd: endDate,
                })
                .where(eq(proMembers.userId, metadataUserId));
        } else {
            await db.insert(proMembers).values({
                userId: metadataUserId,
                paystackCustomerId: customerId,
                paystackSubscriptionId: subscriptionId,
                paystackPriceId: priceId,
                paystackCurrentSubscriptionEnd: endDate,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}


