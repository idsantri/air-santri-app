import api from './api';

class SaleDetails {
	async getAll(params) {
		api.setNotify(false);
		const response = await api.fetchAuth('warehouse-product', {
			method: 'GET',
			params,
		});
		return response.data || true;
	}

	async getById(id) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`warehouse-product/${id}`, {
			method: 'GET',
		});
		return response.data || true;
	}

	async create(data) {
		api.setNotify(true);
		const response = await api.fetchAuth('warehouse-product', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async update(id, data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`warehouse-product/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async remove(id) {
		api.setNotify(true);
		const response = await api.fetchAuth(`warehouse-product/${id}`, {
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

export default new SaleDetails();
