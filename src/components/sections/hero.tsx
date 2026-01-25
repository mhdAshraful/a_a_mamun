"use client";

import { ShoppingBag, Sparkles, SunMoon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PressableButton } from "@/components/animated/pressable-button";
import { useStore } from "@/components/store/use-store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import WhattspCTA from "../ui/whattsapcta";

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

	console.log(theme);

	const headings =
		locale === "bn"
			? "প্রিমিয়াম অর্গানিক পটালি গুড়"
			: "Premium Organic Patali (Gur)";

	const subheadings =
		locale === "bn"
			? "শতভাগ বিশুদ্ধ খেজুরের গুড়। পাইকারি মূল্য অর্ডার করতে B2B / 'পাইকারি' তে সুইচ করুন।"
			: "Switch to B2B for bulk pricing and minimum orders.";

	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-40 left-1/2 h-130 w-205 -translate-x-1/2 rounded-full bg-linear-to-br from-amber-500/30 via-yellow-400/10 to-transparent blur-3xl" />
				<div className="absolute -bottom-55 -right-40 h-130 w-140 rounded-full bg-linear-to-tr from-orange-500/20 via-amber-500/10 to-transparent blur-3xl" />
			</div>

			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
				<div className="flex flex-col gap-6">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Image
									src="/icon.svg"
									alt="AES Enterprise Logo"
									width={32}
									height={32}
								/>
								<h1 className="text-4xl font-semibold">
									AS Enterprise
								</h1>
							</div>
							<div className="flex items-center gap-2">
								<Badge variant="default" className="gap-2">
									<Sparkles
										color="oklch(84.1% 0.238 128.85)"
										fill="oklch(84.1% 0.238 128.85)"
										stroke="oklch(84.1% 0.238 128.85)"
									/>
									Organic • Fresh Batch
								</Badge>
								<Badge
									variant="outline"
									className="min-h-5 h-6 w-auto gap-2 text-violet-500"
								>
									Bangladesh
								</Badge>
							</div>
						</div>

						{/* Site Options + Cart */}
						<div className="flex flex-wrap gap-2 items-start">
							{/* Channel + Language */}
							<div className="flex flex-col md:flex-row  flex-wrap items-start">
								{/* Channel */}
								<div className="rounded-t-xl md:rounded-none md:rounded-l-xl h-10 border flex  items-center px-2">
									<span
										onClick={() =>
											channel !== "B2C" && toggleChannel()
										}
										className={cn(
											"w-14 text-xs text-center transition-colors cursor-pointer px-2 py-1 rounded-md",
											channel === "B2C"
												? "font-semibold text-violet-500 bg-violet-500/10"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{locale === "bn" ? "খুচরা" : "B2C"}
									</span>
									<span
										onClick={() =>
											channel !== "B2B" && toggleChannel()
										}
										className={cn(
											"w-14 text-xs text-center transition-colors cursor-pointer px-2 py-1 rounded-md",
											channel === "B2B"
												? "font-semibold text-violet-500 bg-violet-500/10"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{locale === "bn" ? "পাইকারি" : "B2B"}
									</span>
								</div>
								{/* Language */}
								<div className="rounded-b-xl md:rounded-none md:rounded-r-xl h-10 border flex items-center px-2">
									<span
										onClick={() => locale !== "en" && toggleLocale()}
										className={cn(
											" w-14 text-center text-xs transition-colors cursor-pointer px-2 py-1 rounded-md",
											locale === "en"
												? "font-semibold text-violet-500 bg-violet-500/10"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										EN
									</span>
									<span
										onClick={() => locale !== "bn" && toggleLocale()}
										className={cn(
											"w-14 text-center text-xs transition-colors cursor-pointer px-2 py-1 rounded-md",
											locale === "bn"
												? "font-semibold text-violet-500 bg-violet-500/10"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										বাংলা
									</span>
								</div>
							</div>

							{/* Theme + Cart */}
							<div className="flex flex-col md:flex-row  flex-wrap items-center justify-center">
								{/* Theme */}
								<div
									onClick={() => toggleTheme()}
									className={cn(
										"p-2 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors",
										theme === "light" ? "bg-black" : "bg-white",
										theme === "light"
											? "hover:bg-black/80"
											: "hover:bg-white/80",
									)}
								>
									<SunMoon
										className={cn(
											"h-4 w-4 ",
											theme === "light"
												? "text-orange-300"
												: "text-orange-700",
										)}
									/>
								</div>
								{/* Cart */}
								<PressableButton
									variant="secondary"
									onClick={() => setCartOpen(true)}
									className="mx-2 gap-2 items-center"
								>
									<ShoppingBag className="h-4 w-4" />
									Cart
									{itemCount > 0 ? (
										<span className="rounded-full bg-foreground text-xs text-background">
											{itemCount}
										</span>
									) : null}
								</PressableButton>
							</div>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
						<div className="space-y-5">
							<h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
								{headings}
							</h1>
							<p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
								{subheadings}
							</p>

							{/* whattsapp section */}
							<div className="flex flex-wrap gap-3">
								<WhattspCTA />
							</div>

							<p className="text-xs text-violet-800">
								{channel === "B2B"
									? "B2B: bulk discounts + minimum 5kg order (and per-variant minimums)."
									: "B2C: retail pricing. Free shipping thresholds apply."}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
