import { Suspense } from "react";
import PaymentCancelClient from "./payment-cancel-client";

export default function PaymentCancelPage() {
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
			<PaymentCancelClient />
		</Suspense>
	);
}
