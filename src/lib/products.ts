import type { Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
	{
		id: "patali",
		nameEn: "Patali Gur",
		nameBn: "পাটালি গুড়",
		description:
			"Traditional Patali gur with a rich aroma — ideal for cooking and bulk usage.",
		descriptionBn:
			"ঐতিহ্যবাহী পাটালি গুড় একটি সমৃদ্ধ সুগন্ধ সহ — রান্না এবং বড় পরিমাণে ব্যবহারের জন্য আদর্শ।",
		imagePlaceholders: 5,
		variants: [
			{
				id: "patali-1kg",
				label: "1kg",
				weightKg: 1,
				b2cPriceBdt: 400,
				b2bPriceBdt: 380,
				b2bMinQty: 50,
			},
			{
				id: "patali-5kg",
				label: "5kg",
				weightKg: 5,
				b2cPriceBdt: 2000,
				b2bPriceBdt: 1900,
				b2bMinQty: 20,
			},
		],
	},
	{
		id: "khejur",
		nameEn: "Khejur Gur",
		nameBn: "খেজুরের ঝোলা গুড়",
		description:
			"Premium organic khejur gur — perfect for tea, desserts, and daily sweetness.",
		descriptionBn:
			"প্রিমিয়াম অর্গানিক খেজুরের ঝোলা গুড় — চা, মিষ্টান্ন এবং দৈনন্দিন মিষ্টতার জন্য উপযুক্ত।",
		imagePlaceholders: 5,
		variants: [
			{
				id: "khejur-500g",
				label: "500g",
				weightKg: 0.5,
				b2cPriceBdt: 200,
				b2bPriceBdt: 190,
				b2bMinQty: 50,
			},
			{
				id: "khejur-1kg",
				label: "1kg",
				weightKg: 1,
				b2cPriceBdt: 400,
				b2bPriceBdt: 380,
				b2bMinQty: 20,
			},
		],
	},
];
