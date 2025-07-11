import config from '../config';

const api = (() => {
	const BASE_URL = config.BASE_API + config.END_API;

	async function fetchGuest(endPoint, options = {}) {
		const response = await fetch(BASE_URL + endPoint, {
			...options,
			headers: {
				...options.headers,
				'Content-Type': 'application/json',
			},
		});

		const responseJson = await response.json();
		const { error, message } = responseJson;

		if (!response.ok || error) {
			throw new Error(message || 'unexpected error occurred');
		}

		return responseJson;
	}

	async function fetchAuth(endPoint, options = {}) {
		const token = getAccessToken();
		if (!token) {
			// alert('Anda belum login!');
			throw new Error('No access token found');
		}
		return fetchGuest(endPoint, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${getAccessToken()}`,
			},
		});
	}

	function putAccessToken(token) {
		localStorage.setItem('token', token);
	}

	function getAccessToken() {
		return localStorage.getItem('token');
	}

	return {
		fetchGuest,
		fetchAuth,
		putAccessToken,
		getAccessToken,
	};
})();

export default api;
