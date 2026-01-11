import type { Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
	{
		id: "liquid",
		nameEn: "Liquid Gur",
		nameBn: "ঝোলা গুড়",
		description:
			"Premium organic liquid jaggery (gur) — perfect for tea, desserts, and daily sweetness.",
		imagePlaceholders: 5,
		variants: [
			{
				id: "liquid-500g",
				label: "500g",
				weightKg: 0.5,
				b2cPriceBdt: 250,
				b2bPriceBdt: 225,
				b2bMinQty: 10,
			},
			{
				id: "liquid-1kg",
				label: "1kg",
				weightKg: 1,
				b2cPriceBdt: 450,
				b2bPriceBdt: 400,
				b2bMinQty: 5,
			},
		],
	},
	{
		id: "block",
		nameEn: "Block Gur",
		nameBn: "পাটালি গুড়",
		description:
			"Traditional block jaggery with a rich aroma — ideal for cooking and bulk usage.",
		imagePlaceholders: 5,
		variants: [
			{
				id: "block-1kg",
				label: "1kg",
				weightKg: 1,
				b2cPriceBdt: 280,
				b2bPriceBdt: 250,
				b2bMinQty: 5,
			},
			{
				id: "block-5kg",
				label: "5kg",
				weightKg: 5,
				b2cPriceBdt: 1300,
				b2bPriceBdt: 1100,
				b2bMinQty: 2,
			},
		],
	},
];
