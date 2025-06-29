"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getTeam } from "@/app/actions";

interface Team {
	team: number;
	name: string;
	country: string;
	state: string;
	district: string | null;
	rookie_year: number;
	active: boolean;
	record: {
		wins: number;
		losses: number;
		ties: number;
		count: number;
		winrate: number;
	};
	norm_epa: {
		current: number;
		recent: number;
		mean: number;
		max: number;
	};
}

export default function Home() {
	const [teamNumber, setTeamNumber] = useState<number | undefined>();
	const [team, setTeam] = useState<Team | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFetchData = async () => {
		if (teamNumber === undefined) {
			setError("Please enter a team number.");
			return;
		}
		setLoading(true);
		setTeam(null);
		setError(null);
		try {
			const result = await getTeam(teamNumber);
			if (result.error) {
				setError(result.error);
			} else {
				setTeam(result);
			}
		} catch (e) {
			setError("Failed to fetch data.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<div className="flex flex-col mx-auto max-w-sm pt-2 gap-1">
				<Input
					type="number"
					placeholder="Team Number"
					onChange={(e) => setTeamNumber(parseInt(e.target.value, 10))}
					className="h-16"
				/>
				<Button onClick={handleFetchData} disabled={loading}>
					{loading ? "Loading..." : "Submit"}
				</Button>
			</div>

			{error && <p className="text-red-500 text-center mt-4">{error}</p>}

			{team && (
				<div className="mx-auto max-w-sm mt-4 p-4 border">
					{team.name ? (
						<>
							<h2 className="text-2xl font-bold">
								{team.name} (#{team.team})
							</h2>
							<p>Rookie Year: {team.rookie_year}</p>
							<p>
								Country: {team.country}, State: {team.state}
							</p>
							<p>Active: {team.active ? "Yes" : "No"}</p>
							<div className="mt-2">
								<h3 className="font-semibold">Record:</h3>
								<p>
									Wins: {team.record?.wins}, Losses: {team.record?.losses},
									Ties: {team.record?.ties}
								</p>
								<p>Winrate: {(team.record?.winrate * 100).toFixed(2)}%</p>
							</div>
							<div className="mt-2">
								<h3 className="font-semibold">EPA:</h3>
								<p>Current: {team.norm_epa?.current}</p>
								<p>Recent: {team.norm_epa?.recent}</p>
								<p>Mean: {team.norm_epa?.mean}</p>
								<p>Max: {team.norm_epa?.max}</p>
							</div>
						</>
					) : (
						<h2 className="text-2xl font-bold">Team does not exist</h2>
					)}
				</div>
			)}
		</div>
	);
}
