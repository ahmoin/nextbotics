export interface Team {
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

export function TeamDisplay({ team }: { team: Team }) {
	if (!team.name) {
		return <h2 className="text-2xl font-bold">Team does not exist.</h2>;
	}
	return (
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
					Wins: {team.record?.wins}, Losses: {team.record?.losses}, Ties:{" "}
					{team.record?.ties}
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
	);
}
