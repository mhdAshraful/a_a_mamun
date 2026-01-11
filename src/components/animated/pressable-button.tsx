"use client";

import * as React from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PressableButton({
	className,
	onPointerDown,
	asChild,
	children,
	...props
}: React.ComponentProps<typeof Button>) {
	const rippleRef = React.useRef<HTMLSpanElement | null>(null);

	// When `asChild` is true, shadcn/ui's Button uses Radix Slot, which requires
	// a single React element child. We therefore disable the ripple span in that mode.
	if (asChild) {
		return (
			<Button
				className={cn("relative", className)}
				asChild
				onPointerDown={(e) => {
					onPointerDown?.(e);

					const btn = e.currentTarget as HTMLElement;
					gsap.killTweensOf(btn);
					gsap.fromTo(
						btn,
						{ scale: 1 },
						{ scale: 0.98, duration: 0.08, ease: "power2.out" }
					);
					gsap.to(btn, {
						scale: 1,
						duration: 0.2,
						ease: "power2.out",
						delay: 0.08,
					});
				}}
				{...props}
			>
				{children}
			</Button>
		);
	}

	return (
		<Button
			className={cn("relative overflow-hidden", className)}
			onPointerDown={(e) => {
				onPointerDown?.(e);

				const btn = e.currentTarget as HTMLElement;

				gsap.killTweensOf(btn);
				gsap.fromTo(
					btn,
					{ scale: 1 },
					{ scale: 0.98, duration: 0.08, ease: "power2.out" }
				);
				gsap.to(btn, {
					scale: 1,
					duration: 0.2,
					ease: "power2.out",
					delay: 0.08,
				});

				const ripple = rippleRef.current;
				if (!ripple) return;

				const rect = btn.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				ripple.style.left = `${x}px`;
				ripple.style.top = `${y}px`;

				gsap.killTweensOf(ripple);
				gsap.fromTo(
					ripple,
					{ opacity: 0.35, scale: 0, xPercent: -50, yPercent: -50 },
					{ opacity: 0, scale: 6, duration: 0.45, ease: "power2.out" }
				);
			}}
			{...props}
		>
			<span
				ref={rippleRef}
				aria-hidden
				className="pointer-events-none absolute size-8 rounded-full bg-white/30"
				style={{
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					opacity: 0,
				}}
			/>
			{children}
		</Button>
	);
}
