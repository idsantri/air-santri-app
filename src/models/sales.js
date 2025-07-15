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

	async create(data) {
		const response = await api.fetchAuth('sales', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async update(id, data) {
		const response = await api.fetchAuth(`sales/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
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

	setLog(value) {
		api.setLog(value);
	}
}

export default new Sales();
