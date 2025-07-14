import auth from './auth';
import useAuthStore from '../store/authStore';

// Test utilities
export const authTestUtils = {
	getAuthState: () => useAuthStore.getState().auth,
	getAuthActions: () => useAuthStore.getState(),
	resetAuth: () => {
		const store = useAuthStore.getState();
		store.logout();
	},
	loginToStore: (authData) => {
		const store = useAuthStore.getState();
		store.login(authData);
	},
};

export async function doLogin() {
	localStorage.clear();
	const result = await auth.login(
		{
			login: 'user1',
			password: '112233',
		},
		false,
	);

	// Update store with login result
	authTestUtils.loginToStore({
		isAuthenticated: true,
		token: result.token,
		user: result.user,
	});

	return result;
}
