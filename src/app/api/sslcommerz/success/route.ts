import { NextResponse } from "next/server";

function redirectTo(
	req: Request,
	path: string,
	params: Record<string, string | undefined>
) {
	const url = new URL(path, req.url);
	for (const [k, v] of Object.entries(params)) {
		if (v) url.searchParams.set(k, v);
	}
	// Add a signal for client-side cart clearing.
	url.searchParams.set("clear", "1");
	return NextResponse.redirect(url, { status: 303 });
}

export async function POST(req: Request) {
	const form = await req.formData();
	const tranId = String(form.get("tran_id") ?? "");
	const valId = String(form.get("val_id") ?? "");
	return redirectTo(req, "/payment/success", {
		tran_id: tranId,
		val_id: valId,
	});
}

export async function GET(req: Request) {
	// Fallback if the gateway redirects with GET.
	const { searchParams } = new URL(req.url);
	return redirectTo(req, "/payment/success", {
		tran_id: searchParams.get("tran_id") ?? undefined,
		val_id: searchParams.get("val_id") ?? undefined,
	});
}
