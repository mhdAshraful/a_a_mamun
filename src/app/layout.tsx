import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store/store-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jaggery Shop — Premium Organic Gur",
	description:
		"Premium organic jaggery (gur) with B2B/B2C pricing and SSLCommerz checkout.",
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
	),
	openGraph: {
		title: "Jaggery Shop",
		description:
			"Premium organic jaggery (gur) with B2B/B2C pricing and SSLCommerz checkout.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
			>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
