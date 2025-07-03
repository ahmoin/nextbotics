"use client";

import { useState } from "react";
import { getTeams } from "@/app/actions";
import { BubbleChart, type ChartDataPoint } from "@/components/bubble-chart";
import type { Team } from "@/components/team-display";
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
const countryOptions = [
	{ value: "", label: "Any Country" },
	...Object.entries(COUNTRY_FULL_NAMES).map(([value, label]) => ({
		value,
		label,
	})),
];

export default function HomePage() {
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	const [selectedState, setSelectedState] = useState<string>("");

	const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFetchChartData = async () => {
		setLoading(true);
		setChartData(null);
		setError(null);

		try {
			const params: { country?: string; state?: string; active?: boolean } = {};
			if (selectedCountry) params.country = selectedCountry;
			if (selectedState) params.state = selectedState;

			const fetchedTeams: Team[] = await getTeams(params);

			if (fetchedTeams && fetchedTeams.length > 0) {
				const transformedData: ChartDataPoint[] = fetchedTeams
					.filter(
						(team) =>
							team.record &&
							typeof team.record.wins === "number" &&
							typeof team.record.losses === "number",
					)
					.map((team) => ({
						id: team.team,
						xValue: team.record.losses,
						yValue: team.record.wins,
						label: String(team.team),
						color: "bg-blue-600",
					}));

				if (transformedData.length === 0) {
					setError(
						"No teams with valid record data found for the given criteria.",
					);
				} else {
					setChartData(transformedData);
				}
			} else {
				setError("No teams found for the given criteria.");
			}
		} catch (e) {
			setError(
				`Failed to fetch chart data: ${e instanceof Error ? e.message : String(e)}`,
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
			<h1 className="text-4xl font-bold mb-8">Team Win/Loss Scatter Plot</h1>

			<div className="flex flex-col mx-auto sm:min-w-lg max-w-lg pt-2 gap-2 mb-8">
				<div className="flex flex-row gap-2">
					<Select
						options={countryOptions}
						value={selectedCountry}
						onValueChange={setSelectedCountry}
						placeholder="Filter by Country"
						className="h-10 w-1/2"
					/>
					<Input
						type="text"
						placeholder="Filter by State (e.g., OH)"
						value={selectedState}
						onChange={(e) => setSelectedState(e.target.value.toUpperCase())}
						className="h-10 w-1/2"
					/>
				</div>
				<Button
					className="w-full h-10"
					onClick={handleFetchChartData}
					disabled={loading}
				>
					{loading ? "Loading..." : "Load Team Data"}
				</Button>
				<h2 className="text-sm text-foreground/50">
					* Only works for USA currently
				</h2>
			</div>

			{error && <p className="text-red-500 text-center mb-4">{error}</p>}

			<div className="p-4 border bg-background w-full max-w-2xl">
				<h2 className="text-xl font-bold text-center mb-4">
					Teams by Losses vs Wins (Overall)
				</h2>
				<BubbleChart
					data={chartData || []}
					width="100%"
					height="500px"
					bubbleSizePx={8}
					xAxisLabel="Losses"
					yAxisLabel="Wins"
					className="mx-auto"
					paddingPx={45}
					tickLabelCount={5}
				/>
				{!chartData && !loading && !error && (
					<p className="text-center text-foreground/50 mt-4">
						Use filters and click "Load Team Data" to see chart.
					</p>
				)}
			</div>
		</div>
	);
}
