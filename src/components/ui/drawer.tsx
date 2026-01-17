"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;
const DrawerPortal = DialogPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className
		)}
		{...props}
	/>
));
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<DrawerPortal>
		<DrawerOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"fixed right-0 top-0 z-50 h-dvh w-full max-w-md border-l bg-background p-0 shadow-2xl outline-none",
				className
			)}
			{...props}
		/>
	</DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerTitle = DialogPrimitive.Title;
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = DialogPrimitive.Description;
DrawerDescription.displayName = "DrawerDescription";

export {
	Drawer,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
};
