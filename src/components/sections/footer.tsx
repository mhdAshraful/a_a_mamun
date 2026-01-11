export function FooterSection() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
				<div className="grid gap-8 sm:grid-cols-2">
					<div id="contact" className="space-y-2">
						<div className="text-sm font-semibold">Jaggery Shop</div>
						<div className="text-sm text-muted-foreground">
							Dhaka, Bangladesh
						</div>
						<div className="text-sm text-muted-foreground">
							Email: hello@example.com
						</div>
						<div className="text-sm text-muted-foreground">
							Phone: +880 1X XXXXXXXX
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
					© {new Date().getFullYear()} Jaggery Shop. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
