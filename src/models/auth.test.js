import { describe, it, expect } from 'vitest';
import auth from './auth';

async function doLogin() {
	localStorage.removeItem('token');
	return await auth.login({
		login: 'user1',
		password: '112233',
	});
}

describe('auth model', () => {
	it('login should return token on success', async () => {
		const { data } = await doLogin();
		const { token } = data;
		expect(token).toBeDefined();
		expect(typeof token).toBe('string');
	});

	it('should store token in localStorage after login', async () => {
		const { data } = await doLogin();
		const storedToken = localStorage.getItem('token');
		expect(storedToken).toBe(data.token);
	});

	it('login should throw error on wrong credentials', async () => {
		await expect(
			auth.login({
				login: 'user1',
				password: 'wrongpassword',
			}),
		).rejects.toThrow();
	});

	it('logout should call API and remove token from localStorage after real login', async () => {
		const { data } = await doLogin();
		const storedToken = localStorage.getItem('token');
		expect(storedToken).toBe(data.token);

		const response = await auth.logout();
		const afterLogoutToken = localStorage.getItem('token');
		expect(afterLogoutToken).toBeNull();
		expect(response).toBeDefined();
	});
});
