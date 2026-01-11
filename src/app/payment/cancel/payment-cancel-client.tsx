"use client";

import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PressableButton } from "@/components/animated/pressable-button";

export default function PaymentCancelClient() {
	const params = useSearchParams();
	const tranId = params.get("tran_id") ?? "";

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<Card className="p-6">
				<div className="flex items-start gap-3">
					<XCircle className="mt-0.5 h-6 w-6 text-muted-foreground" />
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight">
							Payment cancelled
						</h1>
						<p className="text-sm text-muted-foreground">
							No charge was made.
						</p>
					</div>
				</div>

				<div className="mt-5 rounded-xl border bg-muted/20 p-4 text-sm">
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">Transaction ID</span>
						<span className="font-medium">{tranId || "—"}</span>
					</div>
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
