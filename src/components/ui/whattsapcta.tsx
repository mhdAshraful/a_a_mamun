import Image from "next/image";
import React from "react";
import image from "@/app/phone.png";

export default function WhattspCTA() {
	return (
		<div className="mt-6 w-75 h-25 md:w-206 md:h-96 bg-lime-400 rounded-3xl flex flex-col items-center justify-center p-4 text-center gap-4">
			<p>Please Confirm with us before placing an order</p>
			<div className="w-[40%] h-[90] rounded-2xl bg-primary text-white ">
				
				<p>contact</p>
				<p>AS Enterprise</p>
				<p>+91 9876543210</p>
			</div>
		</div>
	);
}
