import useAuthStore from '../../store/authStore';
import auth from '../auth';

// Test utilities
export const authTestUtils = {
	getAuthState: () => useAuthStore.getState(),
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
	const result = await auth.login({
		login: 'user1',
		password: '112233',
	});

	// Update store with login result
	authTestUtils.loginToStore(result);

	return result;
}
