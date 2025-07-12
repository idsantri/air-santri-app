class ApiError extends Error {
	constructor(message, code = null) {
		super(message);
		this.name = 'ApiError';
		this.code = code;
	}
}

export default ApiError;
