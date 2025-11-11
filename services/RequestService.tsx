import { API, buildUrl, QueryParams } from '../constant/api';
import { ApiError } from '../interface/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
	method?: HttpMethod;
	query?: QueryParams;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

class RequestServiceClass {
	private authToken: string | null = null;

	setAuthToken(token: string | null) {
		this.authToken = token;
	}

	clearAuthToken() {
		this.authToken = null;
	}

	private composeHeaders(extra?: Record<string, string>) {
		const headers: Record<string, string> = { ...API.DEFAULT_HEADERS, ...(extra || {}) };
		if (this.authToken) headers.Authorization = `Bearer ${this.authToken}`;
		return headers;
	}

	private async doFetch<T>(path: string, opts: RequestOptions = {}): Promise<T> {
		const { method = 'GET', query, body, headers, signal } = opts;
		const url = buildUrl(path, query);

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);
		const finalSignal = signal ?? controller.signal;

		const init: RequestInit = {
			method,
			headers: this.composeHeaders(headers),
			signal: finalSignal,
		};
		if (body !== undefined && body !== null && method !== 'GET') {
			init.body = typeof body === 'string' ? body : JSON.stringify(body);
		}

		try {
			const res = await fetch(url, init);
			clearTimeout(timeoutId);

			const contentType = res.headers.get('content-type') || '';
			const isJson = contentType.includes('application/json');
			const parsed = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

			if (!res.ok) {
				const err: ApiError = {
					status: res.status,
					message:
						(parsed && typeof parsed === 'object' && 'message' in parsed && parsed.message) ||
						res.statusText ||
						'Request failed',
					details: parsed,
					url,
					method,
				};
				throw err;
			}

			return (parsed as T) ?? (undefined as unknown as T);
		} catch (e: any) {
			if (e?.name === 'AbortError') {
				const err: ApiError = { status: 0, message: 'Request timed out', url, method };
				throw err;
			}
			throw e;
		}
	}

	get<T>(path: string, query?: QueryParams, headers?: Record<string, string>) {
		return this.doFetch<T>(path, { method: 'GET', query, headers });
	}
	post<T>(path: string, body?: unknown, headers?: Record<string, string>) {
		return this.doFetch<T>(path, { method: 'POST', body, headers });
	}
	put<T>(path: string, body?: unknown, headers?: Record<string, string>) {
		return this.doFetch<T>(path, { method: 'PUT', body, headers });
	}
	patch<T>(path: string, body?: unknown, headers?: Record<string, string>) {
		return this.doFetch<T>(path, { method: 'PATCH', body, headers });
	}
	delete<T>(path: string, query?: QueryParams, headers?: Record<string, string>) {
		return this.doFetch<T>(path, { method: 'DELETE', query, headers });
	}
}

export const RequestService = new RequestServiceClass();
