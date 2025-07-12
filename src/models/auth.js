import { notifyError, notifySuccess } from '../components/Notify';
// import useAuthStore from '../store/authStore';
import { buildTextError } from '../utils/array-object';
import api from './api';

const auth = (() => {
	// const store = useAuthStore();
	async function login({ login, password }) {
		try {
			const response = await api.fetchGuest(`login`, {
				method: 'POST',
				body: JSON.stringify({ login, password }),
			});
			notifySuccess({ message: response.message });
			return response.data || true;
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
			notifySuccess({ message: response.message });
			return true;
		} catch (error) {
			notifyError({ message: buildTextError(error.message) });
			throw error;
		}
	}

	return {
		login,
		logout,
	};
})();

export default auth;
