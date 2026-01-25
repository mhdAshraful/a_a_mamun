"use client";
import { useStore } from "../store/use-store";
import { info } from "@/lib/products";
export function FooterSection() {
	const { locale } = useStore();
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
				<div className="grid gap-8 sm:grid-cols-2">
					<div id="contact" className="space-y-2">
						<div className="text-sm font-semibold">
							{locale === "en" ? info.nameEn : info.nameBn}
						</div>
						<div className="text-sm text-muted-foreground">
							{locale === "en" ? info.addressEn : info.addressBn}
						</div>
						<div className="text-sm text-muted-foreground">
							Email: {info.email}
						</div>
						<div className="text-sm text-muted-foreground">
							Phone: {info.phone}
						</div>
					</div>

					<div id="policies" className="space-y-2">
						<div className="text-sm font-semibold">Policies</div>
						<div className="grid gap-1 text-sm text-muted-foreground">
							<a href="#" className="hover:text-foreground">
								Privacy policy
							</a>
							<a href="#" className="hover:text-foreground">
								Shipping & returns
							</a>
							<a href="#" className="hover:text-foreground">
								Terms
							</a>
						</div>
					</div>
				</div>

				<div className="mt-8 text-xs text-muted-foreground">
					© {new Date().getFullYear()} AS Enterprise. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
