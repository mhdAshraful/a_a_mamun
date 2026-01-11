"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Printer } from "lucide-react";

import { useStore } from "@/components/store/use-store";
import { Card } from "@/components/ui/card";
import { PressableButton } from "@/components/animated/pressable-button";
import { formatBdt } from "@/lib/pricing";
import { getLocalStorageItem, safeJsonParse } from "@/lib/storage";

const LS_LAST_ORDER = "jaggery_shop_last_order_v1";

type LastOrder = {
	customer: {
		fullName: string;
		email: string;
		phone: string;
		address: string;
		city: string;
	};
	channel: "B2B" | "B2C";
	locale: "en" | "bn";
	lines: Array<{
		nameEn: string;
		nameBn: string;
		variantLabel: string;
		qty: number;
		unitPriceBdt: number;
	}>;
	pricing: {
		subtotalBdt: number;
		taxBdt: number;
		shippingBdt: number;
		totalBdt: number;
	};
	createdAt: string;
};

export default function PaymentSuccessClient() {
	const params = useSearchParams();
	const tranId = params.get("tran_id") ?? "";
	const valId = params.get("val_id") ?? "";
	const clear = params.get("clear") === "1";

	const { clearCart, setCartOpen, setCheckoutOpen } = useStore();
	const [lastOrder, setLastOrder] = React.useState<LastOrder | null>(null);

	React.useEffect(() => {
		setCartOpen(false);
		setCheckoutOpen(false);

		const restored = safeJsonParse<LastOrder>(
			getLocalStorageItem(LS_LAST_ORDER)
		);
		if (restored) setLastOrder(restored);

		if (clear) clearCart();
	}, [clear, clearCart, setCartOpen, setCheckoutOpen]);

	function onPrint() {
		window.print();
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<Card className="p-6">
				<div className="flex items-start gap-3">
					<CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-500" />
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight">
							Payment successful
						</h1>
						<p className="text-sm text-muted-foreground">
							Your transaction was completed via SSLCommerz sandbox.
						</p>
					</div>
				</div>

				<div className="mt-5 grid gap-2 rounded-xl border bg-muted/20 p-4 text-sm">
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">Transaction ID</span>
						<span className="font-medium">{tranId || "—"}</span>
					</div>
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">Validation ID</span>
						<span className="font-medium">{valId || "—"}</span>
					</div>
				</div>

				{lastOrder ? (
					<div className="mt-5 space-y-3">
						<div className="text-sm font-semibold">Invoice preview</div>
						<div className="rounded-xl border p-4 text-sm">
							<div className="text-muted-foreground">Customer</div>
							<div className="mt-1 font-medium">
								{lastOrder.customer.fullName}
							</div>
							<div className="text-muted-foreground">
								{lastOrder.customer.email}
							</div>
							<div className="text-muted-foreground">
								{lastOrder.customer.phone}
							</div>

							<div className="mt-4 space-y-2">
								{lastOrder.lines.map((l, idx) => (
									<div
										key={idx}
										className="flex justify-between gap-3"
									>
										<div>
											<div className="font-medium">
												{lastOrder.locale === "bn"
													? l.nameBn
													: l.nameEn}{" "}
												<span className="text-muted-foreground">
													• {l.variantLabel}
												</span>
											</div>
											<div className="text-xs text-muted-foreground">
												Qty: {l.qty}
											</div>
										</div>
										<div className="font-medium">
											{formatBdt(l.unitPriceBdt * l.qty)}
										</div>
									</div>
								))}
							</div>

							<div className="mt-4 space-y-1 border-t pt-3">
								<div className="flex justify-between text-muted-foreground">
									<span>Subtotal</span>
									<span>
										{formatBdt(lastOrder.pricing.subtotalBdt)}
									</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Tax</span>
									<span>{formatBdt(lastOrder.pricing.taxBdt)}</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Shipping</span>
									<span>
										{formatBdt(lastOrder.pricing.shippingBdt)}
									</span>
								</div>
								<div className="flex justify-between pt-2 font-semibold">
									<span>Total</span>
									<span>{formatBdt(lastOrder.pricing.totalBdt)}</span>
								</div>
							</div>
						</div>
					</div>
				) : null}

				<div className="mt-6 flex flex-wrap gap-3">
					<PressableButton onClick={() => (window.location.href = "/")}>
						Back to shop
					</PressableButton>
					<PressableButton
						variant="outline"
						onClick={onPrint}
						className="gap-2"
					>
						<Printer className="h-4 w-4" /> Print
					</PressableButton>
				</div>
			</Card>
		</div>
	);
}
