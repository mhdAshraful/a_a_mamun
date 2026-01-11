import { z } from "zod";

export const checkoutSchema = z.object({
	fullName: z.string().min(2, "Name is required"),
	email: z.email("Enter a valid email"),
	phone: z
		.string()
		.min(7, "Enter a valid phone")
		.max(20, "Enter a valid phone"),
	address: z.string().min(5, "Address is required"),
	city: z.string().min(2, "City is required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
