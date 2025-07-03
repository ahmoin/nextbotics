"use client";

import { useState } from "react";
import { getTeam, getTeamYear } from "@/app/actions";
import { type Team, TeamDisplay } from "@/components/team-display";
import { type TeamYear, TeamYearDisplay } from "@/components/team-year-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TeamsPage() {
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
						<TeamDisplay team={team} />
					</div>
				) : null}
				{team && teamYear ? (
					<div
						className={cn(
							"flex flex-col",
							year ? " md:flex-row md:w-xl md:mx-auto gap-1" : "mx-auto w-sm",
						)}
					>
						<div
							className={cn(
								"p-4 border w-full",
								year ? " md:w-1/2 max-h-96" : null,
							)}
						>
							<TeamDisplay team={team} />
						</div>
						{year ? (
							<div className="p-4 border w-full md:w-1/2">
								<TeamYearDisplay teamYear={teamYear} />
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
}
