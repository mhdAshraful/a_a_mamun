import { Suspense } from "react";
import PaymentFailClient from "./payment-fail-client";

export default function PaymentFailPage() {
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
			<PaymentFailClient />
		</Suspense>
	);
}
