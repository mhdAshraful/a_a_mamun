import { PRODUCTS } from "@/lib/products";
import type { Product, ProductVariant, VariantId } from "@/lib/types";

export function getProductAndVariant(variantId: VariantId): {
	product: Product;
	variant: ProductVariant;
} {
	for (const product of PRODUCTS) {
		const variant = product.variants.find((v) => v.id === variantId);
		if (variant) return { product, variant };
	}

	// This should never happen unless the catalog changes without migrating stored carts.
	throw new Error(`Unknown variantId: ${variantId}`);
}
