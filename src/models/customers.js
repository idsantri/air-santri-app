import api from './api';
//  IIFE/factory function

const customers = (() => {
	async function getAll(params) {
		const response = await api.fetchAuth(`customers`, {
			method: 'GET',
			params,
		});
		return response.data || true;
	}

	async function getById(id) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'GET',
		});
		return response.data || true;
	}

	async function post(data) {
		const response = await api.fetchAuth(`customers`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function put(id, data) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function remove(id) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'DELETE',
		});
		return response.data || true;
	}

	async function setNotify(config) {
		api.setNotify(config);
	}

	return {
		getAll,
		getById,
		post,
		put,
		remove,
		setNotify,
	};
})();

export default customers;
