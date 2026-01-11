"use client";

import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/store/product-card";

export function ProductsGridSection() {
	return (
		<section id="products" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
			<div className="mb-6 space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight">Products</h2>
				<p className="text-sm text-muted-foreground">
					Two premium jaggery formats, with variants for retail and bulk.
				</p>
			</div>

			<div className="grid gap-5 md:grid-cols-2">
				{PRODUCTS.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</section>
	);
}
