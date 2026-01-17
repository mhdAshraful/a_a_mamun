import Image from "next/image";

import image from "@/app/whattspacard.svg";

export default function WhattspCTA() {
	return (
		<Image src={image} alt="phone" className=" w-full lg:w-4/5  h-auto" />
	);
}
