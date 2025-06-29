"use server";

export async function getTeam(teamNumber: number) {
	const response = await fetch(
		`https://api.statbotics.io/v3/team/${teamNumber}`,
		{
			headers: {
				accept: "application/json",
			},
		},
	);
	return response.json();
}

export async function getTeamYear(teamNumber: number, year: number) {
	const response = await fetch(
		`https://api.statbotics.io/v3/team_year/${teamNumber}/${year}`,
		{
			headers: {
				accept: "application/json",
			},
		},
	);
	return response.json();
}
