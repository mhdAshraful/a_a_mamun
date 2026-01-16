"use client";

import * as React from "react";
import gsap from "gsap";

import type { Product } from "@/lib/types";
import { formatBdt } from "@/lib/pricing";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PressableButton } from "@/components/animated/pressable-button";
import { useStore } from "@/components/store/use-store";

export function ProductCard({ product }: { product: Product }) {
	const { channel, locale, addItem } = useStore();

	const cardRef = React.useRef<HTMLDivElement | null>(null);
	const placeholdersRef = React.useRef<Array<HTMLDivElement | null>>([]);

	React.useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const onEnter = () => {
			gsap.to(card, {
				scale: 1.01,
				duration: 0.18,
				ease: "power2.out",
				boxShadow: "0 24px 60px -24px rgba(251,191,36,0.35)",
			});
		};

		const onLeave = () => {
			gsap.to(card, {
				scale: 1,
				duration: 0.22,
				ease: "power2.out",
				boxShadow: "none",
			});
		};

		card.addEventListener("mouseenter", onEnter);
		card.addEventListener("mouseleave", onLeave);
		return () => {
			card.removeEventListener("mouseenter", onEnter);
			card.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	React.useEffect(() => {
		const els = placeholdersRef.current.filter(Boolean);
		if (els.length === 0) return;

		gsap.set(els, { opacity: 0, y: 6 });
		gsap.to(els, {
			opacity: 1,
			y: 0,
			duration: 0.35,
			ease: "power2.out",
			stagger: 0.06,
		});
	}, []);

	const title = locale === "bn" ? product.nameBn : product.nameEn;
	const description =
		locale === "bn" ? product.descriptionBn : product.description;

	const channelLabel =
		locale === "bn" ? (channel === "B2B" ? "পাইকারি" : "খুচরা") : channel;

	return (
		<Card ref={cardRef} className="transition-colors">
			<CardHeader className="space-y-2">
				<div className="flex items-start justify-between gap-3">
					<div className="space-y-1">
						<CardTitle className="text-lg">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</div>
					<Badge variant={channel === "B2B" ? "secondary" : "outline"}>
						{channelLabel}
					</Badge>
				</div>

				<div className="grid grid-cols-5 gap-2">
					{Array.from({ length: product.imagePlaceholders }).map(
						(_, idx) => (
							<div
								key={idx}
								ref={(node) => {
									placeholdersRef.current[idx] = node;
								}}
								className="aspect-square rounded-md border bg-linear-to-br from-muted/80 to-muted"
								aria-label="Image placeholder"
							/>
						)
					)}
				</div>
			</CardHeader>

			<CardContent className="space-y-3">
				<div className="grid gap-2">
					{product.variants.map((v) => {
						const price =
							channel === "B2B" ? v.b2bPriceBdt : v.b2cPriceBdt;
						const defaultQty = channel === "B2B" ? v.b2bMinQty : 1;
						return (
							<div
								key={v.id}
								className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
							>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<div className="text-sm font-medium">
											{v.label}
										</div>
										{channel === "B2B" ? (
											<Badge variant="outline" className="text-xs">
												Min {v.b2bMinQty}
											</Badge>
										) : null}
									</div>
									<div className="text-sm text-muted-foreground">
										{formatBdt(price)}
									</div>
								</div>

								<PressableButton
									size="sm"
									onClick={() => addItem(v.id, defaultQty)}
									className="shrink-0"
								>
									Add
								</PressableButton>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
