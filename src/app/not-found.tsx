import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6">
			<h2 className="text-2xl font-semibold tracking-tight">
				Page not found
			</h2>
			<p className="mt-2 text-sm text-muted-foreground">
				The page you requested doesn’t exist.
			</p>
			<div className="mt-5">
				<Button asChild>
					<Link href="/">Back to shop</Link>
				</Button>
			</div>
		</div>
	);
}
