import { NextResponse } from "next/server";

import type { CartLine, CheckoutCustomer, PricingBreakdown } from "@/lib/types";

type InitBody = {
	customer: CheckoutCustomer;
	channel: "B2B" | "B2C";
	lines: CartLine[];
	pricing: PricingBreakdown;
};

function getBaseUrl(): string {
	return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function getGatewayUrl(): string {
	const isSandbox = (process.env.SSLCOMMERZ_IS_SANDBOX ?? "true") === "true";
	return isSandbox
		? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
		: "https://securepay.sslcommerz.com/gwprocess/v4/api.php";
}

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as InitBody;

		const storeId = process.env.SSLCOMMERZ_STORE_ID;
		const storePass = process.env.SSLCOMMERZ_STORE_PASS;

		if (!storeId || !storePass) {
			return new NextResponse(
				"Missing SSLCOMMERZ_STORE_ID / SSLCOMMERZ_STORE_PASS",
				{ status: 500 }
			);
		}

		if (!body?.pricing?.totalBdt || body.pricing.totalBdt <= 0) {
			return new NextResponse("Invalid total", { status: 400 });
		}

		const tranId = crypto.randomUUID();
		const base = getBaseUrl();

		const params = new URLSearchParams();
		params.set("store_id", storeId);
		params.set("store_passwd", storePass);
		params.set("total_amount", String(body.pricing.totalBdt));
		params.set("currency", "BDT");
		params.set("tran_id", tranId);

		// Callback routes receive POST from SSLCOMMERZ and redirect to the user-facing pages.
		params.set("success_url", `${base}/api/sslcommerz/success`);
		params.set("fail_url", `${base}/api/sslcommerz/fail`);
		params.set("cancel_url", `${base}/api/sslcommerz/cancel`);

		params.set("cus_name", body.customer.fullName);
		params.set("cus_email", body.customer.email);
		params.set("cus_add1", body.customer.address);
		params.set("cus_city", body.customer.city);
		params.set("cus_phone", body.customer.phone);

		params.set("shipping_method", "NO");
		params.set("product_name", "Jaggery (Gur)");
		params.set("product_category", body.channel);
		params.set("product_profile", "general");

		const resp = await fetch(getGatewayUrl(), {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params.toString(),
			cache: "no-store",
		});

		const data = (await resp.json()) as {
			GatewayPageURL?: string;
			sessionkey?: string;
			status?: string;
			failedreason?: string;
		};

		if (!resp.ok || !data.GatewayPageURL) {
			return new NextResponse(
				data.failedreason ?? "SSLCommerz init failed",
				{ status: 502 }
			);
		}

		return NextResponse.json({
			gatewayPageUrl: data.GatewayPageURL,
			sessionKey: data.sessionkey,
			tranId,
		});
	} catch (e) {
		const msg = e instanceof Error ? e.message : "Server error";
		return new NextResponse(msg, { status: 500 });
	}
}
