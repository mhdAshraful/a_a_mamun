"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Mail, Printer, ShieldCheck } from "lucide-react";

import type { PaymentInitResponse } from "@/lib/types";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/checkout";
import { formatBdt } from "@/lib/pricing";
import { setLocalStorageItem } from "@/lib/storage";

import { useStore } from "@/components/store/use-store";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PressableButton } from "@/components/animated/pressable-button";
import { BounceLoader } from "@/components/animated/bounce-loader";

const LS_LAST_ORDER = "jaggery_shop_last_order_v1";

function createInvoiceHtml(params: {
	customer: CheckoutFormValues;
	channel: string;
	items: Array<{ label: string; qty: number; lineTotal: string }>;
	subtotal: string;
	tax: string;
	shipping: string;
	total: string;
}) {
	const rows = params.items
		.map(
			(i) => `
        <tr>
          <td style="padding:8px 0;">${i.label}</td>
          <td style="padding:8px 0; text-align:right;">${i.qty}</td>
          <td style="padding:8px 0; text-align:right;">${i.lineTotal}</td>
        </tr>
      `
		)
		.join("\n");

	return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice — Jaggery Shop</title>
  </head>
  <body style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; padding: 24px;">
    <h2 style="margin:0 0 4px;">Jaggery Shop</h2>
    <div style="color:#666; margin-bottom:16px;">Invoice • ${params.channel}</div>

    <div style="margin-bottom: 16px;">
      <div><strong>Customer</strong></div>
      <div>${params.customer.fullName}</div>
      <div>${params.customer.email}</div>
      <div>${params.customer.phone}</div>
      <div>${params.customer.address}, ${params.customer.city}</div>
    </div>

    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px 0;">Item</th>
          <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px 0;">Qty</th>
          <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px 0;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <div style="margin-top:16px; max-width: 320px; margin-left:auto;">
      <div style="display:flex; justify-content:space-between; padding:6px 0; color:#444;"><span>Subtotal</span><span>${params.subtotal}</span></div>
      <div style="display:flex; justify-content:space-between; padding:6px 0; color:#444;"><span>Tax</span><span>${params.tax}</span></div>
      <div style="display:flex; justify-content:space-between; padding:6px 0; color:#444;"><span>Shipping</span><span>${params.shipping}</span></div>
      <div style="display:flex; justify-content:space-between; padding:10px 0; border-top:1px solid #ddd; font-weight:700;"><span>Total</span><span>${params.total}</span></div>
    </div>

    <script>
      window.onload = () => window.print();
    </script>
  </body>
</html>
  `.trim();
}

export function CheckoutDialog() {
	const {
		checkoutOpen,
		setCheckoutOpen,
		channel,
		locale,
		lines,
		pricing,
		b2bValidationError,
		setCartOpen,
	} = useStore();

	const [submitting, setSubmitting] = React.useState(false);
	const [submitError, setSubmitError] = React.useState<string | null>(null);

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			address: "",
			city: "Dhaka",
		},
	});

	const chartData = React.useMemo(
		() => [
			{ name: "Subtotal", value: pricing.subtotalBdt },
			{ name: "Tax", value: pricing.taxBdt },
			{ name: "Shipping", value: pricing.shippingBdt },
		],
		[pricing]
	);

	const canSubmit =
		lines.length > 0 &&
		!submitting &&
		(channel !== "B2B" || !b2bValidationError) &&
		pricing.totalBdt > 0;

	async function onSubmit(values: CheckoutFormValues) {
		setSubmitError(null);

		if (!canSubmit) {
			setSubmitError(b2bValidationError ?? "Add items to checkout.");
			return;
		}

		setSubmitting(true);

		try {
			setLocalStorageItem(
				LS_LAST_ORDER,
				JSON.stringify({
					customer: values,
					channel,
					locale,
					lines,
					pricing,
					createdAt: new Date().toISOString(),
				})
			);

			const res = await fetch("/api/sslcommerz/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ customer: values, channel, lines, pricing }),
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || "Failed to initialize payment");
			}

			const data = (await res.json()) as PaymentInitResponse;
			window.location.href = data.gatewayPageUrl;
		} catch (e) {
			const msg = e instanceof Error ? e.message : "Something went wrong";
			setSubmitError(msg);
			setSubmitting(false);
		}
	}

	function onPrintInvoice() {
		const values = form.getValues();
		const invoice = createInvoiceHtml({
			customer: values,
			channel,
			items: lines.map((l) => ({
				label: `${locale === "bn" ? l.nameBn : l.nameEn} • ${
					l.variantLabel
				}`,
				qty: l.qty,
				lineTotal: formatBdt(l.unitPriceBdt * l.qty),
			})),
			subtotal: formatBdt(pricing.subtotalBdt),
			tax: formatBdt(pricing.taxBdt),
			shipping: formatBdt(pricing.shippingBdt),
			total: formatBdt(pricing.totalBdt),
		});

		const w = window.open("", "_blank", "noopener,noreferrer");
		if (!w) return;
		w.document.open();
		w.document.write(invoice);
		w.document.close();
	}

	return (
		<Dialog
			open={checkoutOpen}
			onOpenChange={(open) => {
				setCheckoutOpen(open);
				if (!open) setSubmitting(false);
			}}
		>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						Checkout{" "}
						<Badge variant={channel === "B2B" ? "secondary" : "outline"}>
							{channel}
						</Badge>
					</DialogTitle>
					<DialogDescription className="flex items-center gap-2">
						<ShieldCheck className="h-4 w-4" /> SSLCommerz sandbox payment
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-6 md:grid-cols-2">
					<form
						className="space-y-3"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Full name
							</label>
							<Input
								{...form.register("fullName")}
								placeholder="Your name"
							/>
							{form.formState.errors.fullName ? (
								<div className="mt-1 text-xs text-destructive">
									{form.formState.errors.fullName.message}
								</div>
							) : null}
						</div>

						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Email
							</label>
							<Input
								{...form.register("email")}
								placeholder="you@example.com"
							/>
							{form.formState.errors.email ? (
								<div className="mt-1 text-xs text-destructive">
									{form.formState.errors.email.message}
								</div>
							) : null}
						</div>

						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Phone
							</label>
							<Input
								{...form.register("phone")}
								placeholder="01XXXXXXXXX"
							/>
							{form.formState.errors.phone ? (
								<div className="mt-1 text-xs text-destructive">
									{form.formState.errors.phone.message}
								</div>
							) : null}
						</div>

						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								Address
							</label>
							<Input
								{...form.register("address")}
								placeholder="Street, area"
							/>
							{form.formState.errors.address ? (
								<div className="mt-1 text-xs text-destructive">
									{form.formState.errors.address.message}
								</div>
							) : null}
						</div>

						<div>
							<label className="mb-1 block text-xs text-muted-foreground">
								City
							</label>
							<Input {...form.register("city")} placeholder="Dhaka" />
							{form.formState.errors.city ? (
								<div className="mt-1 text-xs text-destructive">
									{form.formState.errors.city.message}
								</div>
							) : null}
						</div>

						{submitError ? (
							<div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
								{submitError}
							</div>
						) : null}

						<DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
							<div className="flex gap-2">
								<PressableButton
									type="button"
									variant="outline"
									onClick={onPrintInvoice}
									className="gap-2"
								>
									<Printer className="h-4 w-4" /> Print invoice
								</PressableButton>
								<PressableButton
									type="button"
									variant="outline"
									onClick={() => {
										setCheckoutOpen(false);
										setCartOpen(true);
									}}
								>
									Back to cart
								</PressableButton>
							</div>

							<PressableButton
								type="submit"
								disabled={!canSubmit}
								className="gap-2"
							>
								{submitting ? (
									<>
										Redirecting <BounceLoader />
									</>
								) : (
									<>Pay {formatBdt(pricing.totalBdt)}</>
								)}
							</PressableButton>
						</DialogFooter>
					</form>

					<div className="space-y-3">
						<Card className="p-4">
							<div className="mb-2 flex items-center justify-between">
								<div className="text-sm font-medium">Order summary</div>
								<Badge variant="outline">{lines.length} items</Badge>
							</div>

							<div className="h-40">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={chartData}
											dataKey="value"
											nameKey="name"
											innerRadius={34}
											outerRadius={56}
										/>
										<Tooltip
											formatter={(v) => formatBdt(Number(v))}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>

							<div className="mt-2 space-y-1 text-sm">
								<div className="flex justify-between text-muted-foreground">
									<span>Subtotal</span>
									<span>{formatBdt(pricing.subtotalBdt)}</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Tax</span>
									<span>{formatBdt(pricing.taxBdt)}</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Shipping</span>
									<span>{formatBdt(pricing.shippingBdt)}</span>
								</div>
								<div className="flex justify-between border-t pt-2 font-semibold">
									<span>Total</span>
									<span>{formatBdt(pricing.totalBdt)}</span>
								</div>
							</div>

							{channel === "B2B" && b2bValidationError ? (
								<div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-200">
									{b2bValidationError}
								</div>
							) : null}
						</Card>

						<Card className="p-4">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Mail className="h-4 w-4" /> Email receipt preview
							</div>
							<div className="mt-2 text-sm text-muted-foreground">
								We’ll send a receipt preview to:{" "}
								<span className="font-medium text-foreground">
									{form.watch("email") || "—"}
								</span>
							</div>
							<div className="mt-3 rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground">
								Payment confirmation arrives after SSLCommerz redirects
								back to this site.
							</div>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
