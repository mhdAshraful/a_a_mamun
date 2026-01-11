"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PressableButton } from "@/components/animated/pressable-button";

export default function PaymentFailClient() {
	const params = useSearchParams();
	const tranId = params.get("tran_id") ?? "";
	const error = params.get("error") ?? "Payment failed";

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<Card className="p-6">
				<div className="flex items-start gap-3">
					<AlertTriangle className="mt-0.5 h-6 w-6 text-amber-500" />
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight">
							Payment failed
						</h1>
						<p className="text-sm text-muted-foreground">
							You can try checkout again.
						</p>
					</div>
				</div>

				<div className="mt-5 rounded-xl border bg-muted/20 p-4 text-sm">
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">Transaction ID</span>
						<span className="font-medium">{tranId || "—"}</span>
					</div>
					<div className="mt-2 text-sm text-muted-foreground">{error}</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<PressableButton onClick={() => (window.location.href = "/")}>
						Back to shop
					</PressableButton>
				</div>
			</Card>
		</div>
	);
}
