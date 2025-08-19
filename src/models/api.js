import useAuthStore from '../store/authStore';
import { notifyError, notifySuccess } from '../components/Notify';
import {
	logErrorDetails,
	logErrorToken,
	logRequestDetails,
	logResponseDetails,
} from './utils/logger';
import { handleResponseSuccess, handleResponseErrors } from './utils/handler';

const state = {
	BASE_URL: import.meta.env.VITE_BASE_API + import.meta.env.VITE_END_API,
	notifyConfig: {
		showSuccess: true,
		showError: true,
	},
	withLog: false,
};

const api = (() => {
	/**
	 * Mengambil token akses dari store.
	 * @returns {string|null} Token akses atau null.
	 */
	function getAccessToken() {
		const { token } = useAuthStore.getState();
		return token || null;
	}

	/**
	 * Mengatur konfigurasi notifikasi.
	 * @param {boolean|object} notify - Nilai boolean atau objek konfigurasi.
	 */
	function setNotify(notify) {
		if (typeof notify === 'boolean') {
			state.notifyConfig = {
				showSuccess: notify,
				showError: notify,
			};
		} else if (typeof notify === 'object' && notify !== null) {
			// Menggunakan default value jika properti tidak ada atau bukan boolean
			state.notifyConfig = {
				showSuccess: !!notify.showSuccess, // Menggunakan !! untuk konversi ke boolean
				showError: !!notify.showError,
			};
		} else {
			// Default jika input tidak valid
			state.notifyConfig = { showSuccess: true, showError: true };
		}
	}

	/**
	 * Mengatur status logging.
	 * @param {boolean} value - Status logging.
	 */
	function setLog(value) {
		state.withLog = !!value;
	}

	/**
	 * Membangun query string dari objek params.
	 * @param {object} params - Objek parameter.
	 * @returns {string} Query string.
	 */
	function buildQueryString(params) {
		if (!params || typeof params !== 'object') return '';
		const searchParams = new URLSearchParams(
			Object.entries(params).filter(
				([, value]) => value !== null && value !== undefined,
			),
		);
		const queryString = searchParams.toString();
		return queryString ? `?${queryString}` : '';
	}

	/**
	 * Melakukan permintaan fetch.
	 * @param {string} fullUrl - URL lengkap.
	 * @param {object} options - Opsi fetch.
	 * @returns {Promise<Response>} Promise yang menghasilkan objek Response.
	 */
	async function performFetch(fullUrl, options) {
		const requestStart = Date.now();
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const finalOptions = {
			...options,
			headers: {
				...options.headers,
				'X-Timezone': timezone,
			},
		};

		if (state.withLog) logRequestDetails(fullUrl, finalOptions);

		try {
			const response = await fetch(fullUrl, finalOptions);
			response.requestStart = requestStart; // Attach requestStart to response
			return response;
		} catch (error) {
			if (state.withLog)
				logErrorDetails({ error, fullUrl, options: finalOptions });
			if (state.notifyConfig.showError) {
				notifyError({ message: 'Gagal terhubung ke server' });
			}
			throw error;
		}
	}

	/**
	 * Mengelola respons API, menangani kesalahan dan parsing data.
	 * @param {Response} response - Objek respons fetch.
	 * @param {object} options - Opsi fetch yang digunakan.
	 * @returns {Promise<object>} Promise yang menghasilkan data JSON.
	 */
	async function handleApi(response, options) {
		if (!response.ok) {
			await handleResponseErrors(
				response,
				state.notifyConfig,
				state.withLog,
			);
			return; // Menghentikan eksekusi setelah menangani kesalahan
		}

		const responseJson = await handleResponseSuccess(
			response,
			options,
			state.notifyConfig,
			state.withLog,
		);

		if (state.withLog) logResponseDetails(response, responseJson);
		return responseJson;
	}

	/**
	 * Mengambil data untuk endpoint tamu (tanpa otentikasi).
	 * @param {string} endPoint - Endpoint API.
	 * @param {object} options - Opsi fetch.
	 * @returns {Promise<object>} Promise yang menghasilkan data JSON.
	 */
	async function fetchGuest(endPoint, options = {}) {
		const { params, ...fetchOptions } = options;
		fetchOptions.headers = {
			...options.headers,
			'Content-Type': 'application/json',
		};
		const queryString = buildQueryString(params);
		const fullUrl = state.BASE_URL + endPoint + queryString;
		const response = await performFetch(fullUrl, fetchOptions);
		return handleApi(response, fetchOptions);
	}

	/**
	 * Mengambil data untuk endpoint yang memerlukan otentikasi.
	 * @param {string} endPoint - Endpoint API.
	 * @param {object} options - Opsi fetch.
	 * @returns {Promise<object>} Promise yang menghasilkan data JSON.
	 */
	async function fetchAuth(endPoint, options = {}) {
		const token = getAccessToken();
		if (!token) {
			if (state.withLog)
				logErrorToken(state.BASE_URL + endPoint, options);
			if (state.notifyConfig.showError) {
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
	 * Mengambil dan mengunduh file dari endpoint.
	 * @param {string} endPoint - Endpoint API.
	 * @param {string} fileName - Nama file.
	 * @param {object} options - Opsi fetch.
	 * @returns {Promise<Blob>} Promise yang menghasilkan objek Blob.
	 */
	async function fetchFile(endPoint, fileName, options = {}) {
		const { params, ...fetchOptions } = options;
		const queryString = buildQueryString(params);
		const fullUrl = state.BASE_URL + endPoint + queryString;

		const token = getAccessToken();
		if (token) {
			fetchOptions.headers = {
				...fetchOptions.headers,
				Authorization: `Bearer ${token}`,
			};
		}

		const response = await performFetch(fullUrl, fetchOptions);
		if (!response.ok) {
			await handleResponseErrors(
				response,
				state.notifyConfig,
				state.withLog,
			);
			throw new Error('Failed to fetch file');
		}

		try {
			const responseBlob = await response.blob();
			if (state.withLog) {
				logResponseDetails(response, {
					message: 'File fetched successfully',
				});
			}
			if (state.notifyConfig.showSuccess) {
				notifySuccess({ message: `File ${fileName} berhasil diunduh` });
			}
			return responseBlob;
		} catch (error) {
			if (state.withLog) {
				logErrorDetails({ error, fullUrl, options: fetchOptions });
			}
			if (state.notifyConfig.showError) {
				notifyError({ message: 'Gagal memproses file dari server' });
			}
			throw error;
		}
	}

	return {
		fetchGuest,
		fetchAuth,
		fetchFile,
		setNotify,
		getNotify: () => ({ ...state.notifyConfig }),
		setLog,
		getLog: () => state.withLog,
	};
})();

export default api;
