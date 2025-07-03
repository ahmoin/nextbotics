"use client";

import { useState } from "react";
import { getEvents } from "@/app/actions";
import { type Event, EventsDisplay } from "@/components/events-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const COUNTRY_FULL_NAMES: { [key: string]: string } = {
	USA: "USA",
	CAN: "Canada",
	TUR: "Türkiye",
	MEX: "Mexico",
	ISR: "Israel",
	BRA: "Brazil",
	AUS: "Australia",
	TWN: "Chinese Taipei",
	CHN: "China",
	JPN: "Japan",
	COL: "Colombia",
	IND: "India",
	POL: "Poland",
};

const countryOptions = Object.entries(COUNTRY_FULL_NAMES).map(
	([value, label]) => ({
		value,
		label,
	}),
);

export default function EventsPage() {
	const [year, setYear] = useState<number | undefined>();
	const [country, setCountry] = useState<string | undefined>();
	const [events, setEvents] = useState<Event[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFetchData = async () => {
		if (year === undefined) {
			setError("Please enter a year.");
			return;
		}
		setLoading(true);
		setEvents(null);
		setError(null);
		try {
			const resultEvents = await getEvents({ year, country });
			if (resultEvents.error) {
				setError(resultEvents.error);
			} else {
				setEvents(resultEvents);
			}
		} catch (e) {
			setError(`Failed to fetch Events data: ${e}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<div className="flex flex-col mx-auto max-w-sm pt-2 gap-1">
				<div className="flex flex-row gap-1">
					<Input
						type="number"
						placeholder="Year"
						value={year}
						onChange={(e) => setYear(parseInt(e.target.value, 10))}
						className="h-16 w-1/2"
					/>
					<Select
						options={countryOptions}
						value={country || ""}
						onValueChange={setCountry}
						placeholder="Select Country"
						className="h-16 w-1/2"
					/>
				</div>
				<Button className="w-full" onClick={handleFetchData} disabled={loading}>
					{loading ? "Loading..." : "Submit"}
				</Button>
				<h2 className="text-sm text-foreground/50">
					* Only works for USA currently
				</h2>
			</div>
			{error && <p className="text-red-500 text-center mt-4">{error}</p>}
			<div className="flex flex-row mt-1">
				{events ? (
					<div className="p-4 border-t mx-auto w-full">
						<EventsDisplay events={events} />
					</div>
				) : null}
			</div>
		</div>
	);
}
