import { notifyError, notifySuccess } from '../components/Notify';
import { buildTextError } from '../utils/array-object';
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
			notifySuccess({ message: response.message });
			return response;
		} catch (error) {
			notifyError({ message: buildTextError(error.message) });
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
			notifyError({ message: buildTextError(error.message) });
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
