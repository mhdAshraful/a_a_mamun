import { FooterSection } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProductsGridSection } from "@/components/sections/products-grid";
import { CartDrawer } from "@/components/store/cart-drawer";
import { CheckoutDialog } from "@/components/store/checkout-dialog";

export default function Home() {
	return (
		<div className="min-h-dvh">
			<main className="font-sans">
				{/* One-page layout */}
				<div className="mx-auto">
					<HeroSection />
					<ProductsGridSection />
					<FooterSection />

					{/* Overlays */}
					<CartDrawer />
					<CheckoutDialog />
				</div>
			</main>
		</div>
	);
}
