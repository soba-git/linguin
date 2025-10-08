import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { proMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(_req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const suffix = `${userId.slice(-6)}_${Date.now()}`;
        const generatedCustomer = `mock_c_${suffix}`;
        const generatedSubscription = `mock_s_${suffix}`;
        const generatedPrice = `mock_p_${suffix}`;

        const existing = await db.query.proMembers.findFirst({ where: eq(proMembers.userId, userId) });
        if (existing) {
            await db
                .update(proMembers)
                .set({
                    paystackCustomerId: existing.paystackCustomerId || generatedCustomer,
                    paystackSubscriptionId: existing.paystackSubscriptionId || generatedSubscription,
                    paystackPriceId: existing.paystackPriceId || generatedPrice,
                    paystackCurrentSubscriptionEnd: endDate,
                })
                .where(eq(proMembers.userId, userId));
        } else {
            await db.insert(proMembers).values({
                userId,
                paystackCustomerId: generatedCustomer,
                paystackSubscriptionId: generatedSubscription,
                paystackPriceId: generatedPrice,
                paystackCurrentSubscriptionEnd: endDate,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}


