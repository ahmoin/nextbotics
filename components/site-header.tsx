import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function SiteHeader() {
	return (
		<header className="bg-background sticky top-0 z-50 w-full border-b border-zinc-800">
			<div className="container-wrapper 3xl:fixed:px-0 px-6">
				<div className="flex justify-start h-12 items-center gap-2">
					<Link href="/">
						<Button variant="link">
							<Image
								src="/android-chrome-192x192.png"
								width={32}
								height={32}
								alt={siteConfig.name}
							/>
						</Button>
					</Link>
					<Link href="/teams">
						<Button variant="link">Teams</Button>
					</Link>
					<Link href="/events">
						<Button variant="link">Events</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
