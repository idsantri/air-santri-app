import api from './api';
//  IIFE/factory function

const customers = (() => {
	async function getAll() {
		try {
			const response = await api.fetchAuth(`customers`, {
				method: 'GET',
			});
			console.log('🚀 [getAll] response:', response.message);
			return response;
		} catch (error) {
			console.error('GetAll error:', error.message);
			throw error;
		}
	}

	/**
	 * Fetch a customer by ID
	 * @param {number} id customer ID
	 * @returns {Promise<Object>} response object
	 * @throws {Error} if API call fails
	 */
	async function getById(id) {
		try {
			const response = await api.fetchAuth(`customers/${id}`, {
				method: 'GET',
			});
			console.log('🚀 [getById] response:', response.message);
			return response;
		} catch (error) {
			console.error('GetById error:', error.message);
			throw error;
		}
	}

	/**
	 * Get a customer by ID, or all customers if no ID is given.
	 * @param {number} [id] customer ID
	 * @returns {Promise<Object>} response object
	 * @throws {Error} if API call fails
	 */
	async function get(id = null) {
		return id ? await getById(id) : await getAll();
	}

	async function post(data) {
		try {
			const response = await api.fetchAuth(`customers`, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			console.log('🚀 [post] response:', response.message);
			return response;
		} catch (error) {
			console.error('Post error:', error.message);
			throw error;
		}
	}

	async function put(id, data) {
		try {
			const response = await api.fetchAuth(`customers/${id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
			});
			console.log('🚀 [put] response:', response.message);
			return response;
		} catch (error) {
			console.error('Put error:', error.message);
			throw error;
		}
	}

	async function remove(id) {
		try {
			const response = await api.fetchAuth(`customers/${id}`, {
				method: 'DELETE',
			});
			console.log('🚀 [remove] response:', response.message);
			return response;
		} catch (error) {
			console.error('Remove error:', error.message);
			throw error;
		}
	}

	return {
		get,
		post,
		put,
		remove,
	};
})();

export default customers;
