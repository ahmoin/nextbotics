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

export async function getEvent(eventKey: string) {
	const response = await fetch(
		`https://api.statbotics.io/v3/event/${eventKey}`,
		{
			headers: {
				accept: "application/json",
			},
		},
	);
	return response.json();
}

export async function getEvents(params?: {
	year?: number;
	country?: string;
	state?: string;
	district?:
		| "fma"
		| "fnc"
		| "fsc"
		| "fit"
		| "fin"
		| "fim"
		| "ne"
		| "chs"
		| "ont"
		| "pnw"
		| "pch"
		| "isr";
	type?:
		| "regional"
		| "district"
		| "district_cmp"
		| "cmp_division"
		| "cmp_finals";
	week?: number;
	metric?: string;
	ascending?: boolean;
	limit?: number;
	offset?: number;
}) {
	const url = new URL("https://api.statbotics.io/v3/events");
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	const response = await fetch(url.toString(), {
		headers: {
			accept: "application/json",
		},
	});
	return response.json();
}

export async function getTeamEvent(teamNumber: number, eventKey: string) {
	const response = await fetch(
		`https://api.statbotics.io/v3/team_event/${teamNumber}/${eventKey}`,
		{
			headers: {
				accept: "application/json",
			},
		},
	);
	return response.json();
}

export async function getTeamEvents(params?: {
	team?: number;
	year?: number;
	event?: string;
	country?: string;
	state?: string;
	district?:
		| "fma"
		| "fnc"
		| "fsc"
		| "fit"
		| "fin"
		| "fim"
		| "ne"
		| "chs"
		| "ont"
		| "pnw"
		| "pch"
		| "isr";
	type?:
		| "regional"
		| "district"
		| "district_cmp"
		| "cmp_division"
		| "cmp_finals";
	week?: number;
	metric?: string;
	ascending?: boolean;
	limit?: number;
	offset?: number;
}) {
	const url = new URL("https://api.statbotics.io/v3/team_events");
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	const response = await fetch(url.toString(), {
		headers: {
			accept: "application/json",
		},
	});
	return response.json();
}

export async function getTeams(params?: {
	country?: string;
	state?: string;
	district?:
		| "fma"
		| "fnc"
		| "fsc"
		| "fit"
		| "fin"
		| "fim"
		| "ne"
		| "chs"
		| "ont"
		| "pnw"
		| "pch"
		| "isr";
	active?: boolean;
	metric?: string;
	ascending?: boolean;
	limit?: number;
	offset?: number;
}) {
	const url = new URL("https://api.statbotics.io/v3/teams");
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	if (!url.searchParams.has("limit")) {
		url.searchParams.append("limit", "1000");
	}

	const response = await fetch(url.toString(), {
		headers: {
			accept: "application/json",
		},
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Failed to fetch teams: ${response.status} ${response.statusText} - ${errorText}`,
		);
	}

	return response.json();
}
