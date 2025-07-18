function logRequestDetails(fullUrl, options) {
	const method = options.method || 'GET';
	console.group(
		'-+-~-+-~-+-~-+-~-+- API Request: ' +
			new Date().toISOString() +
			' -+-~-+-~-+-~-+-~-+-',
	);
	console.log(`🚀 ${method}: ${fullUrl}`);
	console.log('📋 Headers:', options?.headers || '-');
	console.log('📦 Body:', options?.body || '-');
	console.log('🔍 Params:', options?.params || '-');
	console.groupEnd();
}

function logResponseDetails(response, responseJson) {
	const requestStart = response.requestStart || Date.now();
	const duration = Date.now() - requestStart;
	const emoji = response.ok ? '✅' : '❌';

	console.group(
		`${emoji} API Response: ${response.status} ${response.statusText}`,
	);
	console.log('🌐 URL:', response.url);
	console.log('⏱️ Duration:', `${duration}ms`);
	console.log('📅 Response Time:', new Date().toISOString());

	if (responseJson) {
		console.group('📄 Response Data:');
		console.log('error: ', responseJson.error);
		console.log('message: ', responseJson.message);
		console.log('data: ', responseJson.data);
		console.groupEnd();
	}

	// Log response headers if available
	if (response.headers) {
		const headers = {};
		response.headers.forEach((value, key) => {
			headers[key] = value;
		});
		console.log('📋 Response Headers:', headers);
	}

	console.groupEnd();
}

function logErrorDetails({ error, fullUrl, options }) {
	const requestStart = Date.now();
	const duration = Date.now() - requestStart;
	const method = options.method || 'GET';

	console.group(`💥 API Error: ${method} ${fullUrl}`);
	console.error('❌ Error:', error);
	console.error('🌐 URL:', fullUrl);
	console.error('🔧 Method:', method);
	console.error('⏱️ Duration:', `${duration}ms`);
	console.error('📅 Error Time:', new Date().toISOString());
	console.groupEnd();
}

function logErrorToken(fullUrl, options) {
	const method = options.method || 'GET';

	console.group(`🔐 Auth Error: ${method} ${fullUrl}`);
	console.error('❌ No access token found');
	console.error('🌐 URL:', fullUrl);
	console.error('🔧 Method:', method);
	console.error('📅 Error Time:', new Date().toISOString());
	console.groupEnd();

	console.error('No access token found');
}

export {
	logRequestDetails,
	logResponseDetails,
	logErrorDetails,
	logErrorToken,
};
