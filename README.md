# Jaggery Shop (Next.js 16 + SSLCommerz)

One-page e-commerce app for selling Jaggery (Gur) products in both **B2C** and **B2B** modes.

## Stack

-  Next.js 15 (App Router) + TypeScript
-  Tailwind CSS + shadcn/ui
-  GSAP micro-animations
-  Cart persistence via LocalStorage
-  Checkout validation with zod + react-hook-form
-  SSLCommerz sandbox payment flow
-  Recharts order summary

## Local Development

1. Install deps

```bash
pnpm i
```

2. Create env file

```bash
cp .env.example .env.local
```

3. Run

```bash
pnpm run dev
```

Open http://localhost:3000

## SSLCommerz (Sandbox)

This project uses the **official SSLCommerz gateway API** (form-url-encoded POST to the gateway endpoint) and handles the redirect callbacks via Next.js route handlers.

### Required env vars

-  `NEXT_PUBLIC_SITE_URL` (example: `http://localhost:3000`)
-  `SSLCOMMERZ_IS_SANDBOX` (`true` for sandbox)
-  `SSLCOMMERZ_STORE_ID` (sandbox: `testbox`)
-  `SSLCOMMERZ_STORE_PASS` (sandbox: `qwerty`)

### Flow

1. Client submits checkout form
2. `POST /api/sslcommerz/init` creates a payment session and returns `GatewayPageURL`
3. Browser redirects to SSLCommerz
4. SSLCommerz calls back to:
   -  `POST /api/sslcommerz/success` → redirects to `/payment/success?tran_id=...&val_id=...&clear=1`
   -  `POST /api/sslcommerz/fail` → redirects to `/payment/fail`
   -  `POST /api/sslcommerz/cancel` → redirects to `/payment/cancel`
5. The success page clears the LocalStorage cart and shows the transaction id.

## B2B Rules

-  Toggle B2B/B2C in the hero.
-  **B2B minimum total order:** 5kg
-  **Per-variant minimums (B2B):**
   -  Powdered Gur 500g: min 10
   -  Powdered Gur 1kg: min 5
   -  Block Gur 1kg: min 5
   -  Block Gur 5kg: min 2

## Pricing, Tax, Shipping

-  Tax: 5%
-  Shipping:
   -  B2C: ৳60 (free over ৳2000)
   -  B2B: ৳150 (free over ৳10000)

Adjust rules in `src/lib/pricing.ts`.
