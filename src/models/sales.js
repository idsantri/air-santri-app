import api from './api';

class Sales {
	async getAll(params) {
		const response = await api.fetchAuth('sales', {
			method: 'GET',
			params,
		});
		return response.data || true;
	}

	async getById(id) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'GET',
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

	async put(id, data) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response;
	}

	async remove(id) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'DELETE',
		});
		return response.data || true;
	}

	setNotify(config) {
		api.setNotify(config);
	}
}

export default new Sales();
