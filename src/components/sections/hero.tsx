"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles, SunMoon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PressableButton } from "@/components/animated/pressable-button";
import { useStore } from "@/components/store/use-store";

export function HeroSection() {
	const {
		channel,
		toggleChannel,
		locale,
		toggleLocale,
		theme,
		toggleTheme,
		itemCount,
		setCartOpen,
	} = useStore();

	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-40 left-1/2 h-130 w-205 -translate-x-1/2 rounded-full bg-linear-to-br from-amber-500/30 via-yellow-400/10 to-transparent blur-3xl" />
				<div className="absolute -bottom-55 -right-40 h-130 w-130 rounded-full bg-linear-to-tr from-orange-500/20 via-amber-500/10 to-transparent blur-3xl" />
			</div>

			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
				<div className="flex flex-col gap-6">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="gap-1">
								<Sparkles className="h-4 w-4" />
								Organic • Fresh Batch
							</Badge>
							<Badge variant="outline">Bangladesh</Badge>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<Card className="flex items-center gap-3 px-3 py-2">
								<span className="text-xs text-muted-foreground">
									B2C
								</span>
								<Switch
									checked={channel === "B2B"}
									onCheckedChange={() => toggleChannel()}
								/>
								<span className="text-xs text-muted-foreground">
									B2B
								</span>
							</Card>

							<Card className="flex items-center gap-3 px-3 py-2">
								<span className="text-xs text-muted-foreground">
									EN
								</span>
								<Switch
									checked={locale === "bn"}
									onCheckedChange={() => toggleLocale()}
								/>
								<span className="text-xs text-muted-foreground">
									বাংলা
								</span>
							</Card>

							<Card className="flex items-center gap-3 px-3 py-2">
								<SunMoon className="h-4 w-4 text-muted-foreground" />
								<Switch
									checked={theme === "dark"}
									onCheckedChange={() => toggleTheme()}
								/>
							</Card>

							<PressableButton
								variant="secondary"
								onClick={() => setCartOpen(true)}
								className="gap-2"
							>
								<ShoppingBag className="h-4 w-4" />
								Cart
								{itemCount > 0 ? (
									<span className="ml-1 rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
										{itemCount}
									</span>
								) : null}
							</PressableButton>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
						<div className="space-y-5">
							<h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
								Premium Organic Jaggery (Gur)
							</h1>
							<p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
								Minimal, modern, and production-ready checkout powered
								by SSLCommerz sandbox. Switch to B2B for bulk pricing
								and minimum order rules.
							</p>

							<div className="flex flex-wrap gap-3">
								<PressableButton asChild className="gap-2">
									<Link href="#products">
										Browse products <ArrowRight className="h-4 w-4" />
									</Link>
								</PressableButton>
								<PressableButton
									variant="outline"
									onClick={() => setCartOpen(true)}
								>
									View cart
								</PressableButton>
							</div>

							<p className="text-xs text-muted-foreground">
								{channel === "B2B"
									? "B2B: bulk discounts + minimum 5kg order (and per-variant minimums)."
									: "B2C: retail pricing. Free shipping thresholds apply."}
							</p>
						</div>

						<Card className="p-5">
							<div className="space-y-3">
								<div className="text-sm font-medium">Quick links</div>
								<div className="grid gap-2 text-sm text-muted-foreground">
									<a
										href="#products"
										className="hover:text-foreground"
									>
										Products
									</a>
									<a
										href="#policies"
										className="hover:text-foreground"
									>
										Policies
									</a>
									<a href="#contact" className="hover:text-foreground">
										Contact
									</a>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
