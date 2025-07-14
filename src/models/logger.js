function logRequestDetails(fullUrl, options) {
	const method = options.method || 'GET';
	console.group(`🚀 API Request: ${method} ${fullUrl}`);
	console.log('📍 URL:', fullUrl);
	console.log('🔧 Method:', method);

	if (options.headers) {
		console.log('📋 Headers:', options.headers);
	}

	if (options.body) {
		console.log('📦 Body:', options.body);
	}

	console.log('⏰ Timestamp:', new Date().toISOString());
	console.groupEnd();
}

function logResponseDetails(response, responseJson) {
	const requestStart = response.requestStart || Date.now();
	const duration = Date.now() - requestStart;
	const emoji = response.ok ? '✅' : '❌';

	console.group(
		`${emoji} API Response: ${response.status} ${response.statusText}`,
	);
	console.log('🔢 Status Code:', response.status);
	console.log('📊 Status Text:', response.statusText);
	console.log('🌐 URL:', response.url);
	console.log('⏱️ Duration:', `${duration}ms`);
	console.log('📅 Response Time:', new Date().toISOString());

	if (responseJson) {
		console.log('📄 Response Data:', responseJson);
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
