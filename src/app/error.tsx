"use client";

import * as React from "react";

import { PressableButton } from "@/components/animated/pressable-button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body className="min-h-dvh bg-background text-foreground">
				<div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6">
					<h2 className="text-2xl font-semibold tracking-tight">
						Something went wrong
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						An unexpected error occurred. Try again, or refresh the page.
					</p>
					<pre className="mt-4 overflow-auto rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground">
						{error.message}
					</pre>
					<div className="mt-5 flex gap-3">
						<PressableButton onClick={() => reset()}>
							Try again
						</PressableButton>
						<PressableButton
							variant="outline"
							onClick={() => window.location.reload()}
						>
							Refresh
						</PressableButton>
					</div>
				</div>
			</body>
		</html>
	);
}
