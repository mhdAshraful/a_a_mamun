"use client";

import * as React from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export function BounceLoader({ className }: { className?: string }) {
	const dotsRef = React.useRef<Array<HTMLSpanElement | null>>([]);

	React.useEffect(() => {
		const dots = dotsRef.current.filter(Boolean);
		if (dots.length === 0) return;

		const tl = gsap.timeline({ repeat: -1 });
		tl.to(dots, {
			y: -4,
			duration: 0.25,
			ease: "power2.out",
			stagger: 0.08,
		}).to(
			dots,
			{ y: 0, duration: 0.25, ease: "power2.in", stagger: 0.08 },
			0.12
		);

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<span
			className={cn("inline-flex items-center gap-1", className)}
			aria-label="Loading"
		>
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					ref={(node) => {
						dotsRef.current[i] = node;
					}}
					className="inline-block size-1.5 rounded-full bg-current opacity-70"
				/>
			))}
		</span>
	);
}
