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
	return NextResponse.redirect(url, { status: 303 });
}

export async function POST(req: Request) {
	const form = await req.formData();
	const tranId = String(form.get("tran_id") ?? "");
	const error = String(
		form.get("error") ?? form.get("failedreason") ?? "Payment failed"
	);
	return redirectTo(req, "/payment/fail", { tran_id: tranId, error });
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	return redirectTo(req, "/payment/fail", {
		tran_id: searchParams.get("tran_id") ?? undefined,
		error: searchParams.get("error") ?? undefined,
	});
}
