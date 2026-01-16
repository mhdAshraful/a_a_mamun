export type Channel = "B2C" | "B2B" | "পাইকারি " | "খুচরা";
export type Locale = "bn" | "en";

export type ProductId = "khejur" | "patali";
export type VariantId =
	| "khejur-500g"
	| "khejur-1kg"
	| "patali-1kg"
	| "patali-5kg";

export interface ProductVariant {
	id: VariantId;
	label: string;
	weightKg: number;
	b2cPriceBdt: number;
	b2bPriceBdt: number;
	b2bMinQty: number;
}

export interface Product {
	id: ProductId;
	nameEn: string;
	nameBn: string;
	description: string;
	descriptionBn: string;
	variants: ProductVariant[];
	imagePlaceholders: number;
}

export interface CartLine {
	variantId: VariantId;
	productId: ProductId;
	nameEn: string;
	nameBn: string;
	variantLabel: string;
	weightKg: number;
	unitPriceBdt: number;
	qty: number;
}

export interface CartItem {
	variantId: VariantId;
	qty: number;
}

export interface PricingBreakdown {
	subtotalBdt: number;
	taxBdt: number;
	shippingBdt: number;
	totalBdt: number;
	totalWeightKg: number;
}

export interface CheckoutCustomer {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
}

export interface PaymentInitResponse {
	gatewayPageUrl: string;
	sessionKey?: string;
	tranId: string;
}
