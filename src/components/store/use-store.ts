"use client";

import { useContext } from "react";
import { StoreContext } from "@/components/store/store-provider";

export function useStore() {
	const ctx = useContext(StoreContext);
	if (!ctx) throw new Error("useStore must be used within StoreProvider");
	return ctx;
}
