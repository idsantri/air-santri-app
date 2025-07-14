import api from './api';

class Sales {
	async getAll(params, notify) {
		const response = await api.fetchAuth('sales', {
			method: 'GET',
			params,
			notify,
		});
		return response.data || true;
	}

	async getById(id, notify) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'GET',
			notify,
		});
		return response.data || true;
	}

	async post(data, notify) {
		const response = await api.fetchAuth('sales', {
			method: 'POST',
			body: JSON.stringify(data),
			notify,
		});
		return response.data || true;
	}

	async put(id, data, notify) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			notify,
		});
		return response;
	}

	async remove(id, notify) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'DELETE',
			notify,
		});
		return response.data || true;
	}
}

export default new Sales();
