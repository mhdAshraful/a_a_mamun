import { Suspense } from "react";
import PaymentSuccessClient from "./payment-success-client";

export default function PaymentSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
					<div className="rounded-xl border bg-muted/20 p-6 text-sm text-muted-foreground">
						Loading…
					</div>
				</div>
			}
		>
			<PaymentSuccessClient />
		</Suspense>
	);
}
