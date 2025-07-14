import api from './api';

const auth = (() => {
	async function login({ login, password }) {
		const response = await api.fetchGuest(`login`, {
			method: 'POST',
			body: JSON.stringify({ login, password }),
		});
		return response.data || true;
	}

	async function logout() {
		const response = await api.fetchAuth(`logout`, {
			method: 'POST',
		});
		return response.data || true;
	}

	function setNotify(config) {
		api.setNotify(config);
	}

	return {
		login,
		logout,
		setNotify,
	};
})();

export default auth;
