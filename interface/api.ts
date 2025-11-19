export interface ApiError {
	status: number;
	message: string;
	details?: unknown;
	url?: string;
	method?: string;
}

export interface ApiResult<T> {
	data?: T;
	error?: ApiError | null;
	loading: boolean;
}
