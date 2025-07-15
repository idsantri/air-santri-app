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

	// Global notify configuration
	let notifyConfig = {
		showSuccess: true,
		showError: true,
	};

	let withLog = false;

	function setNotify(notify) {
		// Handle undefined, use default config
		if (notify === undefined) {
			notifyConfig = {
				showSuccess: true,
				showError: true,
			};
			return;
		}

		// Handle boolean true, use default config
		if (notify === true) {
			notifyConfig = {
				showSuccess: true,
				showError: true,
			};
			return;
		}

		// Handle boolean false or any other falsy value except undefined
		if (!notify) {
			notifyConfig = {
				showSuccess: false,
				showError: false,
			};
			return;
		}

		// Handle object configuration
		if (typeof notify === 'object' && notify !== null) {
			// Validate that it's a plain object (not array, date, etc.)
			if (notify.constructor === Object) {
				notifyConfig = {
					showSuccess:
						typeof notify.showSuccess === 'boolean'
							? notify.showSuccess
							: false,
					showError:
						typeof notify.showError === 'boolean'
							? notify.showError
							: false,
				};
				return;
			}
		}

		// For boolean true or any other truthy value, use defaults
		notifyConfig = {
			showSuccess: true,
			showError: true,
		};
	}

	function setLog(value) {
		withLog = value ? true : false;
	}

	// Helper function to build query string from params object
	function buildQueryString(params) {
		if (!params || typeof params !== 'object') return '';

		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				searchParams.append(key, String(value));
			}
		});

		const queryString = searchParams.toString();
		return queryString ? `?${queryString}` : '';
	}

	async function performFetch(fullUrl, options) {
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
			if (withLog) logErrorDetails({ error, fullUrl, options });
			if (notifyConfig.showError)
				notifyError({ message: 'Gagal terhubung ke server' });
			throw error;
		}
	}

	async function handleErrorResponse(response) {
		let errorMessage = 'Terjadi kesalahan pada server';
		let responseJson = null;

		// Try to parse error response for better error message
		try {
			responseJson = await response.json();
			errorMessage = buildTextError(responseJson.message) || errorMessage;
		} catch (parseError) {
			if (withLog)
				console.error(
					'Failed to parse error response:',
					parseError.message,
				);
			throw parseError;
		}

		if (notifyConfig.showError) notifyError({ message: errorMessage });
		if (withLog) logResponseDetails(response, responseJson);
		throw responseJson || new Error(errorMessage);
	}

	async function parseSuccessResponse(response, options) {
		const fullUrl = response.url || 'unknown';
		try {
			return await response.json();
		} catch (error) {
			if (withLog) logErrorDetails({ error, fullUrl, options });
			if (notifyConfig.showError)
				notifyError({ message: 'Gagal memproses respons server' });
			throw error;
		}
	}

	function handleSuccessResponse(responseJson) {
		const { message } = responseJson;
		if (notifyConfig.showSuccess)
			notifySuccess({ message: message || 'Success' });
	}

	async function fetchGuest(endPoint, options = {}) {
		// Extract params from options and build query string
		const { params, ...fetchOptions } = options;
		const queryString = buildQueryString(params);
		const fullUrl = BASE_URL + endPoint + queryString;

		if (withLog) logRequestDetails(fullUrl, fetchOptions);

		// Perform fetch request
		const response = await performFetch(fullUrl, fetchOptions);

		// Handle error response
		if (!response.ok) {
			await handleErrorResponse(response);
		}

		// Parse successful response
		const responseJson = await parseSuccessResponse(response, fetchOptions);

		if (withLog) logResponseDetails(response, responseJson);

		handleSuccessResponse(responseJson);

		return responseJson;
	}

	async function fetchAuth(endPoint, options = {}) {
		const token = getAccessToken();
		if (!token) {
			if (withLog) logErrorToken(BASE_URL + endPoint, options);
			if (notifyConfig.showError) {
				notifyError({
					message: 'Tidak ada token akses yang ditemukan',
				});
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
		setNotify,
		getNotify: () => ({ ...notifyConfig }), // Return copy to prevent direct mutation
		setLog,
		getLog: () => withLog, // Return current log state
	};
})();

export default api;
