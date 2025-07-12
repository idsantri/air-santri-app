import config from '../config';
import useAuthStore from '../store/authStore';
import ApiError from './ApiError';

const api = (() => {
	const BASE_URL = config.BASE_API + config.END_API;

	async function fetchGuest(endPoint, options = {}) {
		let response;
		try {
			response = await fetch(BASE_URL + endPoint, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
				},
			});
		} catch (_err) {
			throw new ApiError('Gagal terhubung ke server');
		}

		let responseJson;
		try {
			responseJson = await response.json();
		} catch (_err) {
			throw new ApiError('Invalid JSON response');
		}

		const { error, message } = responseJson;

		if (!response.ok || error) {
			throw new ApiError(
				message || 'unexpected error occurred',
				response.status,
			);
		}

		return responseJson;
	}

	async function fetchAuth(endPoint, options = {}) {
		const token = getAccessToken();
		if (!token) {
			throw new ApiError('No access token found');
		}
		return fetchGuest(endPoint, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`,
			},
		});
	}

	function getAccessToken() {
		const { auth } = useAuthStore.getState();
		return auth.token;
	}

	return {
		fetchGuest,
		fetchAuth,
	};
})();

export default api;
