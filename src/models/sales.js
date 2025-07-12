import api from './api';

class Sales {
	async #getAll() {
		try {
			const response = await api.fetchAuth('sales', { method: 'GET' });
			console.log('🚀 [getAll] response:', response.message);
			return response;
		} catch (error) {
			console.error('GetAll error:', error.message);
			throw error;
		}
	}

	async #getById(id) {
		try {
			const response = await api.fetchAuth(`sales/${id}`, { method: 'GET' });
			console.log('🚀 [getById] response:', response.message);
			return response;
		} catch (error) {
			console.error('GetById error:', error.message);
			throw error;
		}
	}

	/**
	 * Fetch a sale by ID, or all sales if no ID is given.
	 * @param {number} [id] sale ID
	 * @returns {Promise<Object>} response object
	 * @throws {Error} if API call fails
	 */
	async get(id = null) {
		return id ? await this.#getById(id) : await this.#getAll();
	}

	async post(data) {
		try {
			const response = await api.fetchAuth('sales', {
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

	async put(id, data) {
		try {
			const response = await api.fetchAuth(`sales/${id}`, {
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

	async remove(id) {
		try {
			const response = await api.fetchAuth(`sales/${id}`, {
				method: 'DELETE',
			});
			console.log('🚀 [remove] response:', response.message);
			return response;
		} catch (error) {
			console.error('Remove error:', error.message);
			throw error;
		}
	}
}

export default new Sales();
