import type { CartLine, Channel, PricingBreakdown } from "@/lib/types";

export const B2B_MIN_TOTAL_WEIGHT_KG = 5;

const TAX_RATE = 0.05;

function roundMoney(value: number): number {
	return Math.round(value);
}

export function computePricing(
	lines: CartLine[],
	channel: Channel
): PricingBreakdown {
	const subtotalBdt = lines.reduce(
		(sum, line) => sum + line.unitPriceBdt * line.qty,
		0
	);
	const totalWeightKg = lines.reduce(
		(sum, line) => sum + line.weightKg * line.qty,
		0
	);

	const taxBdt = roundMoney(subtotalBdt * TAX_RATE);

	// Minimal, predictable shipping rules (documented in README).
	const shippingBdt = (() => {
		if (channel === "B2B") {
			if (subtotalBdt >= 10000) return 0;
			return subtotalBdt === 0 ? 0 : 150;
		}

		if (subtotalBdt >= 2000) return 0;
		return subtotalBdt === 0 ? 0 : 60;
	})();

	const totalBdt = subtotalBdt + taxBdt + shippingBdt;

	return {
		subtotalBdt: roundMoney(subtotalBdt),
		taxBdt,
		shippingBdt,
		totalBdt: roundMoney(totalBdt),
		totalWeightKg,
	};
}

export function formatBdt(amount: number): string {
	const rounded = Math.round(amount);
	const sign = rounded < 0 ? "-" : "";
	const num = Math.abs(rounded).toString();
	const withCommas = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `${sign}৳${withCommas}`;
}
