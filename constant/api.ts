export const API = {
	BASE_URL: 'https://api.example.com', // change to your backend URL
	TIMEOUT: 15000,
	DEFAULT_HEADERS: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	ENDPOINTS: {
		AUTH: {
			LOGIN: '/auth/login',
			PROFILE: '/auth/me',
			LOGOUT: '/auth/logout',
			REGISTER: '/auth/register',
		},
		// add more modules/endpoints here
	},
};

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export const buildUrl = (path: string, query?: QueryParams) => {
	const url = new URL(path, API.BASE_URL);
	if (query) {
		Object.entries(query).forEach(([k, v]) => {
			if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
		});
	}
	return url.toString();
};
