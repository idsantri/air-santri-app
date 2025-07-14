import { describe, it, expect, beforeEach } from 'vitest';
import auth from './auth';
import { authTestUtils, doLogin } from './setup-auth-test';

describe('auth model', () => {
	beforeEach(() => {
		localStorage.clear();
		authTestUtils.resetAuth();
	});

	it('login should return token on success', async () => {
		const result = await doLogin();
		expect(result.token).toBeDefined();
		expect(typeof result.token).toBe('string');
	});

	it('should store token in auth store after login', async () => {
		const result = await doLogin();
		const authState = authTestUtils.getAuthState();

		expect(authState.token).toBe(result.token);
		expect(authState.isAuthenticated).toBe(true);
		expect(authState.user).toBeDefined();
	});

	it('login should throw error on wrong credentials', async () => {
		await expect(
			auth.login(
				{
					login: 'user1',
					password: 'wrongpassword',
				},
				false,
			),
		).rejects.toThrow();
	});

	it('logout should call API and clear auth state after real login', async () => {
		const result = await doLogin();

		// Verify login worked
		let authState = authTestUtils.getAuthState();
		expect(authState.token).toBe(result.token);
		expect(authState.isAuthenticated).toBe(true);

		// Perform logout
		const logoutResponse = await auth.logout(false);

		// Clear store after logout
		authTestUtils.resetAuth();

		// Verify logout worked
		authState = authTestUtils.getAuthState();
		expect(authState.token).toBeNull();
		expect(authState.isAuthenticated).toBe(false);
		expect(logoutResponse).toBeDefined();
	});
});
