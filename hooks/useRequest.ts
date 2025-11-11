import { useCallback, useEffect, useRef, useState } from 'react';
import { RequestService } from '../services/RequestService';
import { ApiError } from '../interface/api';
import { QueryParams } from '../constant/api';

export function useRequestQuery<T>(path: string, options?: { query?: QueryParams; enabled?: boolean; deps?: any[] }) {
	const { query, enabled = true, deps = [] } = options || {};
	const [data, setData] = useState<T | undefined>(undefined);
	const [error, setError] = useState<ApiError | null>(null);
	const [loading, setLoading] = useState(false);
	const mounted = useRef(true);

	const fetcher = useCallback(async () => {
		if (!enabled) return;
		setLoading(true);
		setError(null);
		try {
			const res = await RequestService.get<T>(path, query);
			if (mounted.current) setData(res);
		} catch (e: any) {
			if (mounted.current) setError(e);
		} finally {
			if (mounted.current) setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path, JSON.stringify(query), enabled, ...deps]);

	useEffect(() => {
		mounted.current = true;
		fetcher();
		return () => {
			mounted.current = false;
		};
	}, [fetcher]);

	return { data, error, loading, refetch: fetcher };
}

type MutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function useRequestMutation<TResponse, TBody = unknown>(path: string, method: MutationMethod = 'POST') {
	const [data, setData] = useState<TResponse | undefined>(undefined);
	const [error, setError] = useState<ApiError | null>(null);
	const [loading, setLoading] = useState(false);

	const mutate = useCallback(
		async (body?: TBody) => {
			setLoading(true);
			setError(null);
			setData(undefined);
			try {
				let res: TResponse;
				switch (method) {
					case 'PUT':
						res = await RequestService.put<TResponse>(path, body);
						break;
					case 'PATCH':
						res = await RequestService.patch<TResponse>(path, body);
						break;
					case 'DELETE':
						// for DELETE with body, adapt service if needed; here use query-only delete by default
						res = await RequestService.delete<TResponse>(path);
						break;
					default:
						res = await RequestService.post<TResponse>(path, body);
				}
				setData(res);
				return res;
			} catch (e: any) {
				setError(e);
				throw e;
			} finally {
				setLoading(false);
			}
		},
		[path, method]
	);

	return { mutate, data, error, loading };
}
