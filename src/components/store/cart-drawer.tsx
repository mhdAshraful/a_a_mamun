"use client";

import * as React from "react";
import gsap from "gsap";
import { Minus, Plus, Trash2 } from "lucide-react";

import { formatBdt } from "@/lib/pricing";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { PressableButton } from "@/components/animated/pressable-button";
import { useStore } from "@/components/store/use-store";

export function CartDrawer() {
	const {
		cartOpen,
		setCartOpen,
		setCheckoutOpen,
		channel,
		locale,
		lines,
		pricing,
		b2bValidationError,
		setQty,
		removeItem,
	} = useStore();

	const contentRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const el = contentRef.current;
		if (!el) return;

		if (cartOpen) {
			gsap.set(el, { x: 40, opacity: 1 });
			gsap.to(el, { x: 0, duration: 0.3, ease: "power2.out" });
		}
	}, [cartOpen]);

	return (
		<Drawer open={cartOpen} onOpenChange={setCartOpen}>
			<DrawerContent ref={contentRef} className="flex flex-col">
				<div className="flex items-center justify-between border-b px-5 py-4">
					<div className="flex items-center gap-2">
						<div className="text-base font-semibold">Cart</div>
						<Badge variant={channel === "B2B" ? "secondary" : "outline"}>
							{channel}
						</Badge>
					</div>
					<PressableButton
						variant="ghost"
						size="sm"
						onClick={() => setCartOpen(false)}
					>
						Close
					</PressableButton>
				</div>

				<div className="flex-1 overflow-auto px-5 py-4">
					{lines.length === 0 ? (
						<div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
							Your cart is empty.
						</div>
					) : (
						<div className="space-y-3">
							{lines.map((line) => {
								const name =
									locale === "bn" ? line.nameBn : line.nameEn;
								return (
									<div
										key={line.variantId}
										className="rounded-xl border p-4"
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<div className="text-sm font-medium">
													{name}{" "}
													<span className="text-muted-foreground">
														• {line.variantLabel}
													</span>
												</div>
												<div className="mt-1 text-sm text-muted-foreground">
													{formatBdt(line.unitPriceBdt)} each
												</div>
											</div>
											<PressableButton
												variant="ghost"
												size="icon"
												onClick={() => removeItem(line.variantId)}
												aria-label="Remove"
											>
												<Trash2 className="h-4 w-4" />
											</PressableButton>
										</div>

										<div className="mt-3 flex items-center justify-between">
											<div className="flex items-center gap-2">
												<PressableButton
													variant="outline"
													size="icon"
													onClick={() =>
														setQty(line.variantId, line.qty - 1)
													}
													aria-label="Decrease"
												>
													<Minus className="h-4 w-4" />
												</PressableButton>
												<div className="min-w-10 text-center text-sm font-medium">
													{line.qty}
												</div>
												<PressableButton
													variant="outline"
													size="icon"
													onClick={() =>
														setQty(line.variantId, line.qty + 1)
													}
													aria-label="Increase"
												>
													<Plus className="h-4 w-4" />
												</PressableButton>
											</div>

											<div className="text-sm font-semibold">
												{formatBdt(line.unitPriceBdt * line.qty)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				<div className="border-t px-5 py-4">
					<div className="space-y-2 text-sm">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>{formatBdt(pricing.subtotalBdt)}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Tax</span>
							<span>{formatBdt(pricing.taxBdt)}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Shipping</span>
							<span>{formatBdt(pricing.shippingBdt)}</span>
						</div>
						<div className="flex items-center justify-between border-t pt-2">
							<span className="font-medium">Total</span>
							<span className="font-semibold">
								{formatBdt(pricing.totalBdt)}
							</span>
						</div>
					</div>

					{channel === "B2B" && b2bValidationError ? (
						<div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-200">
							{b2bValidationError}
						</div>
					) : null}

					<div className="mt-4 flex gap-3">
						<PressableButton
							className="flex-1"
							disabled={
								lines.length === 0 ||
								(channel === "B2B" && Boolean(b2bValidationError))
							}
							onClick={() => setCheckoutOpen(true)}
						>
							Checkout
						</PressableButton>
						<PressableButton
							variant="outline"
							onClick={() => setCartOpen(false)}
						>
							Continue
						</PressableButton>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
