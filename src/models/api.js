import config from '../config';
import useAuthStore from '../store/authStore';
import { buildTextError } from '../utils/array-object';
import { notifyError, notifySuccess } from '../components/Notify';

const api = (() => {
	const BASE_URL = config.BASE_API + config.END_API;
	function handleNotify(notify) {
		// Default configuration
		const config = {
			showSuccess: true,
			showError: true,
		};

		// Handle undefined, return default config
		if (notify === undefined) {
			return config;
		}

		// Handle boolean true, return default config
		if (notify === true) {
			return config;
		}

		// Handle boolean false or any other falsy value except undefined
		if (!notify) {
			return {
				showSuccess: false,
				showError: false,
			};
		}

		// Handle object configuration
		if (typeof notify === 'object' && notify !== null) {
			// Validate that it's a plain object (not array, date, etc.)
			if (notify.constructor === Object) {
				return {
					showSuccess:
						typeof notify.showSuccess === 'boolean'
							? notify.showSuccess
							: false,
					showError:
						typeof notify.showError === 'boolean'
							? notify.showError
							: false,
				};
			}
		}

		// For boolean true or any other truthy value, use defaults
		return config;
	}

	async function fetchGuest(endPoint, options = {}) {
		const { showSuccess, showError } = handleNotify(options?.notify);
		if (options?.notify) delete options.notify;

		let response;
		try {
			response = await fetch(BASE_URL + endPoint, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			if (showError) {
				notifyError({ message: 'Gagal terhubung ke server' });
			} else {
				console.error('Fetch error:', error.message);
			}
			throw error;
		}

		let responseJson;
		try {
			responseJson = await response.json();
		} catch (error) {
			if (showError) {
				notifyError({ message: 'Gagal memproses respons server' });
			} else {
				console.error('JSON parse error:', error.message);
			}
			throw error;
		}

		const { error, message } = responseJson;

		if (!response.ok || error) {
			if (showError) {
				notifyError({
					message:
						buildTextError(message) ||
						'Terjadi kesalahan pada server',
				});
			} else {
				console.error(
					`API error (${response.status}): `,
					message || 'Unknown error',
				);
			}
			throw error;
		}

		// success
		if (showSuccess) {
			notifySuccess({ message: message || 'Success' });
		} else {
			console.info(
				`API success (${response.status}): `,
				`${message || 'Success'}`,
			);
			if (responseJson.data) {
				console.info('Response data:', responseJson.data);
			}
		}

		return responseJson;
	}

	async function fetchAuth(endPoint, options = {}) {
		const { showError } = handleNotify(options?.notify);

		const token = getAccessToken();
		if (!token) {
			if (showError) {
				notifyError({
					message: 'Tidak ada token akses yang ditemukan',
				});
			} else {
				console.error('No access token found');
			}
			throw new Error('No access token found');
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
		return auth?.token || null;
	}

	return {
		fetchGuest,
		fetchAuth,
	};
})();

export default api;
