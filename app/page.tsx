"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ffffff] to-[#808080] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				></div>
			</div>
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
						FRC Team Performance Data
					</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-foreground/50 sm:text-xl/8">
						Access historical and current performance statistics for FRC
						robotics teams. {siteConfig.name} provides data to assist with team
						analysis, scouting, and strategic planning for competitive events.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href="/teams">
							<Button>Explore Teams</Button>
						</Link>
						<Link href="/events">
							<Button variant="secondary">
								Or Events <span aria-hidden="true">→</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ffffff] to-[#808080] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				></div>
			</div>
		</div>
	);
}
