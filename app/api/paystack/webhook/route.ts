import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/db/drizzle";
import { proMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

const secret = process.env.PAYSTACK_SECRET_KEY as string;

function verifySignature(req: NextRequest, rawBody: string) {
    const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
    const header = req.headers.get("x-paystack-signature");
    return header && hash === header;
}

export async function POST(req: NextRequest) {
    try {
        const raw = await req.text();
        if (!verifySignature(req, raw)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const event = JSON.parse(raw);
        const type = event?.event as string;
        const data = event?.data;

        if (!type || !data) {
            return NextResponse.json({ ok: true });
        }

        if (type === "charge.success" || type === "subscription.create" || type === "subscription.enable" || type === "invoice.payment_succeeded") {
            const metadataUserId = data?.metadata?.userId as string | undefined;
            if (!metadataUserId) {
                return NextResponse.json({ ok: true });
            }

            const customerId = String(data?.customer?.id ?? data?.customer?.customer_code ?? "");
            const subscriptionId = String(data?.subscription?.subscription_code ?? data?.subscription_code ?? "");
            const priceId = String(data?.plan ?? data?.plan_object?.plan_code ?? data?.plan_code ?? "");
            const nextPaymentDate = data?.next_payment_date || data?.subscription?.next_payment_date;
            const endDate = nextPaymentDate ? new Date(nextPaymentDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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
        }

        if (type === "subscription.disable" || type === "invoice.payment_failed") {
            const metadataUserId = data?.metadata?.userId as string | undefined;
            if (metadataUserId) {
                const existing = await db.query.proMembers.findFirst({ where: eq(proMembers.userId, metadataUserId) });
                if (existing) {
                    await db
                        .update(proMembers)
                        .set({ paystackCurrentSubscriptionEnd: new Date() })
                        .where(eq(proMembers.userId, metadataUserId));
                }
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}


