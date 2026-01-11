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
	title: "AES Enterprise, Premium Organic Gur | এইএস এন্টারপ্রাইজ, প্রিমিয়াম অর্গানিক গুড়",
	description:
		"Premium organic jaggery (gur) with B2B/B2C Retail and wholesale seller . প্রিরিমিয়াম অর্গানিক পটালি গুড় — B2B/B2C খুচরা এবং পাইকারি বিক্রেতা",
	keywords: ["AES Enterprise", "Organic Gur", "Premium Jaggery", "B2B Gur Supplier", "B2C Jaggery Seller", "Wholesale Organic Gur", "Natural Sweetener Bangladesh", "Healthy Jaggery Options", 
		"এইএস এন্টারপ্রাইজ", "অর্গানিক গুড়", "প্রিমিয়াম পটালি গুড়", "B2B গুড় সরবরাহকারী", "B2C পটালি গুড় বিক্রেতা", "পাইকারি অর্গানিক গুড়", "বাংলাদেশের প্রাকৃতিক মিষ্টিকারক", "স্বাস্থ্যকর পটালি গুড় বিকল্প"],
	authors: [
		{ name: "AES Enterprise", url: "https://aesenterprise.com" },
	],
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
	),
	openGraph: {
		title: "AES Enterprise, Premium Organic Gur | এইএস এন্টারপ্রাইজ, প্রিমিয়াম অর্গানিক গুড়",
		description:
			"Premium organic jaggery (gur) with B2B/B2C Retail and wholesale seller . প্রিরিমিয়াম অর্গানিক পটালি গুড় — B2B/B2C খুচরা এবং পাইকারি বিক্রেতা",
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
