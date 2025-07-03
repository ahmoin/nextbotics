import { Video } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export interface Event {
	country: string;
	current_match: number;
	district: string | null;
	end_date: string;
	epa: {
		max: number;
		top_8: number;
		top_24: number;
		// biome-ignore lint/suspicious/noExplicitAny: needed for custom data
		[key: string]: any;
	};
	key: string;
	metrics: {
		// biome-ignore lint/suspicious/noExplicitAny: needed for custom data
		score_pred: any;
		// biome-ignore lint/suspicious/noExplicitAny: needed for custom data
		rp_pred: any;
		// biome-ignore lint/suspicious/noExplicitAny: needed for custom data
		[key: string]: any;
	};
	name: string;
	num_teams: number;
	qual_matches: number;
	start_date: string;
	state: string;
	status: string;
	status_str: string;
	time: number;
	type: string;
	video: string;
	week: number;
	year: number;
}

export function EventsDisplay({ events }: { events: Event[] }) {
	console.log("events", events);
	if (!events || events.length === 0) {
		return (
			<h2 className="text-2xl font-bold text-center mt-4">
				No event data available for this criteria.
			</h2>
		);
	}

	return (
		<div className="py-2">
			<h2 className="text-2xl font-bold text-center mb-4">Upcoming Events</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-full mx-auto px-2">
				{events.map((event) => (
					<div
						key={event.key}
						className="p-3 border border-zinc-700 bg-zinc-800/40 shadow-sm flex flex-col justify-between"
					>
						<div>
							<h3 className="text-xl font-bold mb-1">
								{event.name} ({event.year})
							</h3>
							<p className="text-xs text-zinc-400 mb-1">
								Event Key: <span className="font-mono">{event.key}</span>
							</p>
							<p className="text-sm leading-tight">
								<span className="font-semibold">Location:</span> {event.country}
								{event.state && `, ${event.state}`}
								{event.district && ` (Dist: ${event.district})`}
							</p>
							<p className="text-sm leading-tight">
								<span className="font-semibold">Status:</span>{" "}
								{event.status_str}
							</p>
							<p className="text-sm leading-tight">
								<span className="font-semibold">Dates:</span> {event.start_date}{" "}
								to {event.end_date} (Wk {event.week})
							</p>
							<p className="text-sm leading-tight">
								<span className="font-semibold">Teams:</span> {event.num_teams}
							</p>
							{event.current_match > 0 && (
								<p className="text-sm leading-tight">
									<span className="font-semibold">Current Match:</span>{" "}
									{event.current_match}
								</p>
							)}
							<p className="text-sm leading-tight">
								<span className="font-semibold">Qual Matches:</span>{" "}
								{event.qual_matches}
							</p>
						</div>

						{event.epa && (
							<div className="mt-3 pt-3 border-t border-zinc-700">
								<h4 className="font-semibold text-base mb-1"> EPA Averages:</h4>
								<ul className="list-disc list-inside text-xs">
									<li>
										Max:{" "}
										<span className="font-mono">
											{event.epa?.max?.toFixed(2) || "N/A"}
										</span>
									</li>
									<li>
										Top 8:{" "}
										<span className="font-mono">
											{event.epa?.top_8?.toFixed(2) || "N/A"}
										</span>
									</li>
									<li>
										Top 24:{" "}
										<span className="font-mono">
											{event.epa?.top_24?.toFixed(2) || "N/A"}
										</span>
									</li>
								</ul>
							</div>
						)}

						{event.video && (
							<div className="mt-3 pt-3 border-t border-zinc-700">
								<h4 className="font-semibold text-base mb-1">Broadcast:</h4>
								<Link
									href={event.video}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-sm"
								>
									<Button variant="link">
										<Video className="size-4" />
										Watch Live / Replay
									</Button>
								</Link>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
