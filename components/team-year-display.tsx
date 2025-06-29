export interface TeamYear {
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

export function TeamYearDisplay({ teamYear }: { teamYear: TeamYear }) {
	if (!teamYear.record) {
		return <h2 className="text-2xl font-bold">Team did not play this year.</h2>;
	}
	return (
		<>
			<h2 className="text-2xl font-bold">{teamYear.year} Stats</h2>
			<p>
				Yearly Record: {teamYear.record.wins} W - {teamYear.record.losses} L -{" "}
				{teamYear.record.ties} T
			</p>
			<p>Yearly Winrate: {(teamYear.record.winrate * 100).toFixed(2)}%</p>
			{teamYear.epa && (
				<>
					<h3 className="font-semibold mt-2">Yearly EPA:</h3>
					<p>
						Mean Total Points: {teamYear.epa.total_points?.mean?.toFixed(2)}
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
					{Object.entries(teamYear.epa.breakdown).map(([key, value]) => (
						<p key={key}>
							{key
								.replace(/_/g, " ")
								.replace(/\b\w/g, (char) => char.toUpperCase())}
							: {value.toFixed(2)}
						</p>
					))}
				</div>
			)}
		</>
	);
}
