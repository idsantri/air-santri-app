import useAuthStore from '../store/authStore';
import { notifyError, notifySuccess } from '../components/Notify';
import {
	logErrorDetails,
	logErrorToken,
	logRequestDetails,
	logResponseDetails,
} from './utils/logger';
import { handleResponseSuccess, handleResponseErrors } from './utils/handler';

const api = (() => {
	const BASE_URL =
		import.meta.env.VITE_BASE_API + import.meta.env.VITE_END_API;
	// console.log('🚀 ~ BASE_URL:', BASE_URL);

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
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		try {
			const response = await fetch(fullUrl, {
				...options,
				headers: {
					...options.headers,
					'X-Timezone': timezone, // Tambahkan header timezone
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

	async function fetchGuest(endPoint, options = {}) {
		// Extract params from options and build query string
		const { params, ...fetchOptions } = options;
		fetchOptions.headers = {
			...options.headers,
			'Content-Type': 'application/json',
		};
		const queryString = buildQueryString(params);
		const fullUrl = BASE_URL + endPoint + queryString;

		if (withLog) logRequestDetails(fullUrl, fetchOptions);

		// Perform fetch request
		const response = await performFetch(fullUrl, fetchOptions);

		// Handle error response
		if (!response.ok) {
			await handleResponseErrors(response, notifyConfig, withLog);
		}

		// Handle and parse successful response
		const responseJson = await handleResponseSuccess(
			response,
			fetchOptions,
			notifyConfig,
			withLog,
		);

		if (withLog) logResponseDetails(response, responseJson);

		return responseJson;
	}

	async function fetchAuth(endPoint, options = {}) {
		// console.log('🚀 ~ fetchAuth ~ BASE_URL:', BASE_URL);
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

	/**
	 * 🆕 Method baru untuk mengambil dan mengunduh file
	 * Menggunakan alur yang sama dengan fetchGuest/fetchAuth untuk penanganan error, log, dll.
	 * @param {string} endPoint - Endpoint API untuk file
	 * @param {string} fileName - Nama file untuk disimpan
	 * @param {Object} options - Opsi fetch seperti headers
	 */
	async function fetchFile(endPoint, fileName, options = {}) {
		// Extract params from options and build query string
		const { params, ...fetchOptions } = options;
		const queryString = buildQueryString(params);
		const fullUrl = BASE_URL + endPoint + queryString;

		// Tambahkan token jika ada
		const token = getAccessToken();
		fetchOptions.headers = {
			...fetchOptions.headers,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		if (withLog) logRequestDetails(fullUrl, fetchOptions);

		// Perform fetch request
		const response = await performFetch(fullUrl, fetchOptions);

		// Handle error response
		if (!response.ok) {
			await handleResponseErrors(response, notifyConfig, withLog);
		}

		// Ambil blob dari response
		let responseBlob;
		try {
			responseBlob = await response.blob();
		} catch (error) {
			if (withLog)
				logErrorDetails({ error, fullUrl, options: fetchOptions });
			if (notifyConfig.showError)
				notifyError({ message: 'Gagal memproses file dari server' });
			throw error;
		}

		if (withLog) {
			logResponseDetails(response, {
				message: 'File fetched successfully',
			});
		}
		notifySuccess({ message: `File ${fileName} berhasil diunduh` });
		return responseBlob;
	}

	function getAccessToken() {
		const { token } = useAuthStore.getState();
		return token || null;
	}

	return {
		fetchGuest,
		fetchAuth,
		fetchFile,
		setNotify,
		getNotify: () => ({ ...notifyConfig }), // Return copy to prevent direct mutation
		setLog,
		getLog: () => withLog, // Return current log state
	};
})();

export default api;
