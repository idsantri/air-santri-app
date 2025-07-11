import api from './api';

const auth = (() => {
	async function login({ login, password }) {
		try {
			const response = await api.fetchGuest(`login`, {
				method: 'POST',
				body: JSON.stringify({ login, password }),
			});
			const { token, user } = response.data;
			api.putAccessToken(token);
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			console.log('🚀 ~ login ~ response:', response.message);
			return response;
		} catch (error) {
			console.error('Login error:', error.message);
			throw error;
		}
	}

	async function logout() {
		try {
			const response = await api.fetchAuth(`logout`, {
				method: 'POST',
			});
			api.putAccessToken('');
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			console.log('🚀 ~ logout ~ response:', response.message);
			return response;
		} catch (error) {
			console.error('Logout error:', error.message);
			throw error;
		}
	}

	function currentUser() {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	}

	return {
		login,
		logout,
		currentUser,
	};
})();

export default auth;
