"use client";

import React, {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import { getProductAndVariant } from "@/lib/catalog";
import { computePricing } from "@/lib/pricing";
import {
	getLocalStorageItem,
	removeLocalStorageItem,
	safeJsonParse,
	setLocalStorageItem,
} from "@/lib/storage";
import type {
	CartItem,
	CartLine,
	Channel,
	Locale,
	VariantId,
} from "@/lib/types";

const LS_CART = "jaggery_shop_cart_v1";
const LS_CHANNEL = "jaggery_shop_channel_v1";
const LS_LOCALE = "jaggery_shop_locale_v1";
const LS_THEME = "jaggery_shop_theme_v1";

export type ThemeMode = "light" | "dark";

export interface StoreState {
	channel: Channel;
	locale: Locale;
	theme: ThemeMode;
	cartOpen: boolean;
	checkoutOpen: boolean;
	cart: CartItem[];
}

export interface StoreComputed {
	lines: CartLine[];
	pricing: ReturnType<typeof computePricing>;
	itemCount: number;
	b2bValidationError: string | null;
}

export interface StoreActions {
	setChannel: (channel: Channel) => void;
	toggleChannel: () => void;
	setLocale: (locale: Locale) => void;
	toggleLocale: () => void;
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
	setCartOpen: (open: boolean) => void;
	setCheckoutOpen: (open: boolean) => void;

	addItem: (variantId: VariantId, qty?: number) => void;
	removeItem: (variantId: VariantId) => void;
	setQty: (variantId: VariantId, qty: number) => void;
	clearCart: () => void;
}

export type StoreContextValue = StoreState & StoreComputed & StoreActions;

export const StoreContext = createContext<StoreContextValue | null>(null);

function clampQty(qty: number): number {
	if (!Number.isFinite(qty)) return 1;
	return Math.max(0, Math.floor(qty));
}

function computeLines(cart: CartItem[], channel: Channel): CartLine[] {
	return cart
		.filter((item) => item.qty > 0)
		.map((item) => {
			const { product, variant } = getProductAndVariant(item.variantId);
			const unitPriceBdt =
				channel === "B2B" ? variant.b2bPriceBdt : variant.b2cPriceBdt;

			return {
				variantId: variant.id,
				productId: product.id,
				nameEn: product.nameEn,
				nameBn: product.nameBn,
				variantLabel: variant.label,
				weightKg: variant.weightKg,
				unitPriceBdt,
				qty: item.qty,
			};
		});
}

function computeB2bValidationError(lines: CartLine[]): string | null {
	if (lines.length === 0) return "Add items to continue.";

	const totalWeightKg = lines.reduce((sum, l) => sum + l.weightKg * l.qty, 0);
	if (totalWeightKg < 5) return "B2B minimum order is 5kg total.";

	for (const line of lines) {
		const { variant } = getProductAndVariant(line.variantId);
		if (line.qty < variant.b2bMinQty) {
			return `Minimum for ${line.variantLabel} is ${variant.b2bMinQty} units (B2B).`;
		}
	}

	return null;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const [channel, setChannelState] = useState<Channel>("B2C");
	const [locale, setLocaleState] = useState<Locale>("en");
	const [theme, setThemeState] = useState<ThemeMode>("light");

	const [cartOpen, setCartOpen] = useState(false);
	const [checkoutOpen, setCheckoutOpen] = useState(false);
	const [cart, setCart] = useState<CartItem[]>([]);

	// Restore persisted preferences + cart
	useEffect(() => {
		const restoredCart = safeJsonParse<CartItem[]>(
			getLocalStorageItem(LS_CART)
		);
		if (restoredCart) setCart(restoredCart);

		const restoredChannel = getLocalStorageItem(LS_CHANNEL) as Channel | null;
		if (restoredChannel === "B2B" || restoredChannel === "B2C")
			setChannelState(restoredChannel);

		const restoredLocale = getLocalStorageItem(LS_LOCALE) as Locale | null;
		if (restoredLocale === "en" || restoredLocale === "bn")
			setLocaleState(restoredLocale);

		const restoredTheme = getLocalStorageItem(LS_THEME) as ThemeMode | null;
		if (restoredTheme === "light" || restoredTheme === "dark")
			setThemeState(restoredTheme);
	}, []);

	// Persist cart
	useEffect(() => {
		setLocalStorageItem(LS_CART, JSON.stringify(cart));
	}, [cart]);

	// Persist toggles
	useEffect(() => {
		setLocalStorageItem(LS_CHANNEL, channel);
	}, [channel]);

	useEffect(() => {
		setLocalStorageItem(LS_LOCALE, locale);
	}, [locale]);

	useEffect(() => {
		setLocalStorageItem(LS_THEME, theme);
		if (theme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, [theme]);

	const lines = useMemo(() => computeLines(cart, channel), [cart, channel]);
	const pricing = useMemo(
		() => computePricing(lines, channel),
		[lines, channel]
	);

	const itemCount = useMemo(
		() => lines.reduce((sum, l) => sum + l.qty, 0),
		[lines]
	);

	const b2bValidationError = useMemo(() => {
		if (channel !== "B2B") return null;
		return computeB2bValidationError(lines);
	}, [channel, lines]);

	const setChannel = useCallback(
		(value: Channel) => setChannelState(value),
		[]
	);
	const toggleChannel = useCallback(
		() => setChannelState((c) => (c === "B2C" ? "B2B" : "B2C")),
		[]
	);

	const setLocale = useCallback((value: Locale) => setLocaleState(value), []);
	const toggleLocale = useCallback(
		() => setLocaleState((l) => (l === "en" ? "bn" : "en")),
		[]
	);

	const setTheme = useCallback((value: ThemeMode) => setThemeState(value), []);
	const toggleTheme = useCallback(
		() => setThemeState((t) => (t === "light" ? "dark" : "light")),
		[]
	);

	const addItem = useCallback((variantId: VariantId, qty = 1) => {
		const addQty = clampQty(qty);
		if (addQty <= 0) return;

		setCart((prev) => {
			const existing = prev.find((i) => i.variantId === variantId);
			if (!existing) return [...prev, { variantId, qty: addQty }];
			return prev.map((i) =>
				i.variantId === variantId ? { ...i, qty: i.qty + addQty } : i
			);
		});

		setCartOpen(true);
	}, []);

	const removeItem = useCallback((variantId: VariantId) => {
		setCart((prev) => prev.filter((i) => i.variantId !== variantId));
	}, []);

	const setQty = useCallback((variantId: VariantId, qty: number) => {
		const nextQty = clampQty(qty);
		setCart((prev) => {
			if (nextQty === 0)
				return prev.filter((i) => i.variantId !== variantId);
			return prev.map((i) =>
				i.variantId === variantId ? { ...i, qty: nextQty } : i
			);
		});
	}, []);

	const clearCart = useCallback(() => {
		setCart([]);
		removeLocalStorageItem(LS_CART);
	}, []);

	const value: StoreContextValue = {
		channel,
		locale,
		theme,
		cartOpen,
		checkoutOpen,
		cart,

		lines,
		pricing,
		itemCount,
		b2bValidationError,

		setChannel,
		toggleChannel,
		setLocale,
		toggleLocale,
		setTheme,
		toggleTheme,
		setCartOpen,
		setCheckoutOpen,

		addItem,
		removeItem,
		setQty,
		clearCart,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
