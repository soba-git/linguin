import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { initializeTransaction } from "@/lib/paystack";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { email, amount, plan, callback_url } = body || {};

        if (!email || !amount || typeof amount !== "number") {
            return NextResponse.json({ error: "email and numeric amount are required" }, { status: 400 });
        }

        const reference = `${userId}_${Date.now()}`;

        const init = await initializeTransaction({
            email,
            amount,
            callback_url,
            reference,
            plan,
            metadata: { userId },
        });

        if (!init.status) {
            return NextResponse.json({ error: init.message || "Failed to initialize transaction" }, { status: 400 });
        }

        return NextResponse.json({
            authorizationUrl: init.data.authorization_url,
            accessCode: init.data.access_code,
            reference: init.data.reference,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}


