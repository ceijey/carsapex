import { useCallback } from 'react';
import { API } from '../constant/api';
import { useRequestMutation, useRequestQuery } from './useRequest';
import { LoginPayload, LoginResponse, Profile } from '../interface/auth';
import { RequestService } from '../services/RequestService';

export function useAuthRequest() {
	// Login
	const loginMutation = useRequestMutation<LoginResponse, LoginPayload>(API.ENDPOINTS.AUTH.LOGIN, 'POST');

	const login = useCallback(
		async (payload: LoginPayload) => {
			const res = await loginMutation.mutate(payload);
			// Persist token as needed (e.g., localStorage) and set on service for subsequent requests
			if (res?.token) {
				RequestService.setAuthToken(res.token);
			}
			return res;
		},
		[loginMutation]
	);

	// Get profile (enabled only when token is present)
	const hasToken = true; // replace with your auth state, e.g., !!localStorage.getItem('token')
	const profileQuery = useRequestQuery<Profile>(API.ENDPOINTS.AUTH.PROFILE, { enabled: hasToken });

	// Logout helper
	const logout = useCallback(() => {
		RequestService.clearAuthToken();
		// also clear your app auth state/storage as needed
	}, []);

	return {
		login,
		loginState: { data: loginMutation.data, loading: loginMutation.loading, error: loginMutation.error },

		getProfile: profileQuery.refetch,
		profileState: { data: profileQuery.data, loading: profileQuery.loading, error: profileQuery.error },

		logout,
	};
}
