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
	return redirectTo(req, "/payment/cancel", { tran_id: tranId });
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	return redirectTo(req, "/payment/cancel", {
		tran_id: searchParams.get("tran_id") ?? undefined,
	});
}
