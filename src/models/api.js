import config from '../config';
import useAuthStore from '../store/authStore';
import { buildTextError } from '../utils/array-object';
import { notifyError, notifySuccess } from '../components/Notify';
import {
	logErrorDetails,
	logErrorToken,
	logRequestDetails,
	logResponseDetails,
} from './logger';

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

	async function performFetch({ fullUrl, options, showError }) {
		const requestStart = Date.now();

		try {
			const response = await fetch(fullUrl, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
				},
			});

			// Attach requestStart to response for duration calculation
			response.requestStart = requestStart;

			return response;
		} catch (error) {
			if (!showError) {
				logErrorDetails({ error, fullUrl, options });
				console.error('Fetch error:', error.message);
			} else {
				notifyError({ message: 'Gagal terhubung ke server' });
			}
			throw error;
		}
	}

	async function handleErrorResponse({ response, showError, showSuccess }) {
		let errorMessage = 'Terjadi kesalahan pada server';
		let responseJson = null;

		// Try to parse error response for better error message
		try {
			responseJson = await response.json();
			errorMessage = buildTextError(responseJson.message) || errorMessage;
		} catch (parseError) {
			// If JSON parsing fails, use default error message
			if (!showError) {
				console.error(
					'Failed to parse error response:',
					parseError.message,
				);
			}
		}

		// Log error details only if notifications are disabled
		if (!showSuccess && !showError) {
			logResponseDetails(response, responseJson);
		}

		if (showError) {
			notifyError({ message: errorMessage });
		} else {
			console.error(
				`API error (${response.status}): `,
				responseJson?.message || 'Unknown error',
			);
		}

		throw responseJson || new Error(errorMessage);
	}

	async function parseSuccessResponse({
		response,
		showError,
		fullUrl,
		options,
	}) {
		try {
			return await response.json();
		} catch (error) {
			if (!showError) {
				logErrorDetails({ error, fullUrl, options });
				console.error('JSON parse error:', error.message);
			} else {
				notifyError({ message: 'Gagal memproses respons server' });
			}
			throw error;
		}
	}

	function handleSuccessResponse({ responseJson, showSuccess, response }) {
		const { message } = responseJson;

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
	}

	async function fetchGuest(endPoint, options = {}) {
		const { showSuccess, showError } = handleNotify(options?.notify);
		if (options?.notify) delete options.notify;

		const fullUrl = BASE_URL + endPoint;

		// Log request details only if notifications are disabled
		if (!showSuccess && !showError) {
			logRequestDetails(fullUrl, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
				},
			});
		}

		// Perform fetch request
		const response = await performFetch({
			fullUrl,
			options,
			showError,
		});

		// Handle error response
		if (!response.ok) {
			await handleErrorResponse({
				response,
				showError,
				showSuccess,
			});
		}

		// Parse successful response
		const responseJson = await parseSuccessResponse({
			response,
			showError,
			fullUrl,
			options,
		});

		// Log response details only if notifications are disabled
		if (!showSuccess && !showError) {
			logResponseDetails(response, responseJson);
		}

		// Handle success response
		handleSuccessResponse({ responseJson, showSuccess, response });

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
				logErrorToken(BASE_URL + endPoint, options);
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
