import axios from "axios";

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

if (!PAYSTACK_SECRET_KEY) {
    // Throwing here ensures misconfiguration is caught during server start
    throw new Error("PAYSTACK_SECRET_KEY is not set in environment variables");
}

const paystackClient = axios.create({
    baseURL: PAYSTACK_BASE_URL,
    headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

export type InitializeTransactionParams = {
    email: string;
    amount: number; // amount in kobo (NGN minor unit)
    callback_url?: string;
    reference?: string;
    metadata?: Record<string, unknown>;
    plan?: string; // optional Paystack plan code for subscriptions
    currency?: string; // e.g., NGN, GHS, ZAR, USD
};

export async function initializeTransaction(params: InitializeTransactionParams) {
    const response = await paystackClient.post("/transaction/initialize", params);
    return response.data as {
        status: boolean;
        message: string;
        data: {
            authorization_url: string;
            access_code: string;
            reference: string;
        };
    };
}

export async function verifyTransaction(reference: string) {
    const response = await paystackClient.get(`/transaction/verify/${reference}`);
    return response.data as {
        status: boolean;
        message: string;
        data: any; // Paystack verification payload
    };
}

export async function fetchSubscriptionByCode(subscriptionCode: string) {
    const response = await paystackClient.get(`/subscription/${subscriptionCode}`);
    return response.data as any;
}