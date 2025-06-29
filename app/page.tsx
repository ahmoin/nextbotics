"use client";

import { useState } from "react";
import { getTeam, getTeamYear } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

interface TeamYear {
	team: number;
	year: number;
	name: string;
	country: string;
	state: string;
	district: string | null;
	rookie_year: number;
	epa: {
		total_points: {
			mean: number;
			sd: number;
		};
		unitless: number;
		norm: number;
		conf: [number, number];
		breakdown: {
			[key: string]: number;
		};
		stats: {
			start: number;
			pre_champs: number;
			max: number;
		};
		ranks: {
			total: { rank: number; percentile: number; team_count: number };
			country: { rank: number; percentile: number; team_count: number };
			state: { rank: number; percentile: number; team_count: number };
			district?: { rank: number; percentile: number; team_count: number };
		};
	};
	record: {
		wins: number;
		losses: number;
		ties: number;
		count: number;
		winrate: number;
	};
	district_points: number | null;
	district_rank: number | null;
}

export default function Home() {
	const [teamNumber, setTeamNumber] = useState<number | undefined>();
	const [year, setYear] = useState<number | undefined>();
	const [team, setTeam] = useState<Team | null>(null);
	const [teamYear, setTeamYear] = useState<TeamYear | null>(null);
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
			const resultTeam = await getTeam(teamNumber);
			if (resultTeam.error) {
				setError(resultTeam.error);
			} else {
				setTeam(resultTeam);
			}
		} catch (e) {
			setError(`Failed to fetch Team data: ${e}`);
		} finally {
			setLoading(false);
		}
		if (year === undefined) {
			return;
		}
		setTeamYear(null);
		setError(null);
		try {
			const resultTeamYear = await getTeamYear(teamNumber, year);
			if (resultTeamYear.error) {
				setError(resultTeamYear.error);
			} else {
				setTeamYear(resultTeamYear);
			}
		} catch (e) {
			setError(`Failed to fetch TeamYear data: ${e}`);
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
						placeholder="Team Number"
						value={teamNumber}
						onChange={(e) => setTeamNumber(parseInt(e.target.value, 10))}
						className="h-16 w-1/2"
					/>
					<Input
						type="number"
						placeholder="Year (optional)"
						value={year}
						onChange={(e) => setYear(parseInt(e.target.value, 10))}
						className="h-16 w-1/2"
					/>
				</div>
				<Button className="w-full" onClick={handleFetchData} disabled={loading}>
					{loading ? "Loading..." : "Submit"}
				</Button>
			</div>
			{error && <p className="text-red-500 text-center mt-4">{error}</p>}
			<div className="flex flex-row mt-1">
				{team && !teamYear ? (
					<div className="p-4 border mx-auto w-sm">
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
							<h2 className="text-2xl font-bold">Team does not exist.</h2>
						)}
					</div>
				) : null}
				{team && teamYear ? (
					<div
						className={cn(
							"flex flex-col",
							year ? " md:flex-row md:w-xl md:mx-auto gap-1" : "mx-auto w-sm",
						)}
					>
						<div className={cn("p-4 border w-full", year ? " md:w-1/2" : null)}>
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
								<h2 className="text-2xl font-bold">Team does not exist.</h2>
							)}
						</div>
						{year ? (
							<div className="p-4 border w-full md:w-1/2">
								{teamYear.record ? (
									<>
										<h2 className="text-2xl font-bold">
											{teamYear.year} Stats
										</h2>
										<p>
											Yearly Record: {teamYear.record.wins} W -{" "}
											{teamYear.record.losses} L - {teamYear.record.ties} T
										</p>
										<p>
											Yearly Winrate:{" "}
											{(teamYear.record.winrate * 100).toFixed(2)}%
										</p>
										{teamYear.epa && (
											<>
												<h3 className="font-semibold mt-2">Yearly EPA:</h3>
												<p>
													Mean Total Points:{" "}
													{teamYear.epa.total_points?.mean?.toFixed(2)}
												</p>
												<p>Norm EPA: {teamYear.epa.norm?.toFixed(2)}</p>
												<p>
													Rank (Total): {teamYear.epa.ranks?.total?.rank} (
													{teamYear.epa.ranks?.total?.percentile.toFixed(2)}%)
												</p>
											</>
										)}
										{teamYear.epa?.breakdown && (
											<div className="mt-2">
												<h3 className="font-semibold">Breakdown:</h3>
												{Object.entries(teamYear.epa.breakdown).map(
													([key, value]) => (
														<p key={key}>
															{key
																.replace(/_/g, " ")
																.replace(/\b\w/g, (char) => char.toUpperCase())}
															: {value.toFixed(2)}
														</p>
													),
												)}
											</div>
										)}
									</>
								) : (
									<h2 className="text-2xl font-bold">
										Team did not play this year.
									</h2>
								)}
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
}
