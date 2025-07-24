import api from './api';

const auth = (() => {
	async function login({ login, password }) {
		// api.setNotify(true);
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

	function setLog(value) {
		api.setLog(value);
	}

	return {
		login,
		logout,
		setNotify,
		setLog,
	};
})();

export default auth;
