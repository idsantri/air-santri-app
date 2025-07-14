import api from './api';

const auth = (() => {
	async function login({ login, password }, notify) {
		const response = await api.fetchGuest(`login`, {
			method: 'POST',
			body: JSON.stringify({ login, password }),
			notify,
		});
		return response.data || true;
	}

	async function logout(notify) {
		const response = await api.fetchAuth(`logout`, {
			method: 'POST',
			notify,
		});
		return response.data || true;
	}

	return {
		login,
		logout,
	};
})();

export default auth;
