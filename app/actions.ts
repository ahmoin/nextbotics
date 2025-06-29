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
