// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { siteConfig } from "@/lib/config";

export function SiteHeader() {
	return (
		<header className="bg-background sticky top-0 z-50 w-full border-b border-zinc-800">
			<div className="container-wrapper 3xl:fixed:px-0 px-6">
				<div className="flex justify-start h-12 items-center gap-2 font-serif italic"></div>
			</div>
		</header>
	);
}
