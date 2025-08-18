import { notifyError, notifySuccess } from '../../components/Notify';
import { logErrorDetails, logResponseDetails } from './logger';

/**
 * Handle server errors (5xx status codes)
 * @param {Response} response - The fetch response object
 * @param {Object} notifyConfig - Notification configuration
 * @param {boolean} withLog - Whether to log the response
 */
export async function handleServerError(response, notifyConfig, withLog) {
	try {
		// Try to get error details from response body
		const errorData = await response.json().catch(() => null);

		// Create error object with details
		const error = {
			status: response.status,
			statusText: response.statusText,
			message: errorData?.message || 'Server error occurred',
			timestamp: new Date().toISOString(),
			url: response.url,
		};

		// Handle different types of server errors
		switch (response.status) {
			case 500:
				console.error(
					'Internal Server Error - The server encountered an unexpected condition',
				);
				if (notifyConfig.showError) {
					notifyError({
						message:
							'Terjadi kesalahan pada server. Hubungi developer.',
					});
				}
				break;

			case 501:
				console.error(
					'Not Implemented - The server does not support this functionality',
				);
				if (notifyConfig.showError) {
					notifyError({
						message: 'Fitur ini belum tersedia. Hubungi developer.',
					});
				}
				break;

			case 502:
				console.error(
					'Bad Gateway - Invalid response from upstream server',
				);
				if (notifyConfig.showError) {
					notifyError({
						message:
							'Server tidak merespons dengan benar. Silakan coba lagi.',
					});
				}
				break;

			case 503:
				console.error(
					'Service Unavailable - Server temporarily overloaded or under maintenance',
				);
				if (notifyConfig.showError) {
					notifyError({
						message:
							'Server sedang dalam perawatan. Silakan coba lagi nanti.',
					});
				}
				break;

			case 504:
				console.error('Gateway Timeout - Upstream server timeout');
				if (notifyConfig.showError) {
					notifyError({
						message:
							'Koneksi ke server terputus. Silakan coba lagi nanti.',
					});
				}
				break;

			default:
				console.error(
					`Server Error ${response.status}: ${response.statusText}`,
				);
				if (notifyConfig.showError) {
					notifyError({
						message: `Terjadi kesalahan pada server: ${error.message}`,
					});
				}
				break;
		}

		// Log if enabled
		if (withLog) {
			logResponseDetails(response, errorData);
		}

		// Throw error to be caught by calling code
		throw new Error(`Server Error ${response.status}: ${error.message}`);
	} catch (parseError) {
		// Handle case where response body can't be parsed
		console.error('Failed to parse server error response:', parseError);
		throw new Error(
			`Server Error ${response.status}: ${response.statusText}`,
		);
	}
}

/**
 * Handle error responses (4xx status codes)
 * @param {Response} response - The fetch response object
 * @param {Object} notifyConfig - Notification configuration
 * @param {boolean} withLog - Whether to log the response
 */
export async function handleResponseError(response, notifyConfig, withLog) {
	let errorMessage = 'Terjadi kesalahan pada server';
	let responseJson = null;

	// Try to parse error response for better error message
	try {
		responseJson = await response.json();
		errorMessage = responseJson.message || errorMessage;
	} catch (parseError) {
		console.error('Failed to parse error response:', parseError);
		notifyError({ message: 'Not valid JSON response!' });
		throw parseError;
	}

	if (notifyConfig.showError) notifyError({ message: errorMessage });
	if (withLog) logResponseDetails(response, responseJson);
	throw responseJson || new Error(errorMessage);
}

/**
 * Handle successful response - parse JSON and show notifications
 * @param {Response} response - The fetch response object
 * @param {Object} options - Fetch options for logging
 * @param {Object} notifyConfig - Notification configuration
 * @param {boolean} withLog - Whether to log errors
 * @returns {Object} Parsed response JSON
 */
export async function handleResponseSuccess(
	response,
	options,
	notifyConfig,
	withLog,
) {
	const fullUrl = response.url || 'unknown';
	let responseJson;

	// Parse JSON response
	try {
		responseJson = await response.json();
	} catch (error) {
		if (withLog) logErrorDetails({ error, fullUrl, options });
		if (notifyConfig.showError)
			notifyError({ message: 'Gagal memproses respons server' });
		throw error;
	}

	// Show success notification
	const { message } = responseJson;
	if (notifyConfig.showSuccess)
		notifySuccess({ message: message || 'Success' });

	return responseJson;
}
