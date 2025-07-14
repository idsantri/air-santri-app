import api from './api';
//  IIFE/factory function

const customers = (() => {
	async function getAll(params, notify) {
		const response = await api.fetchAuth(`customers`, {
			method: 'GET',
			params,
			notify,
		});
		return response.data || true;
	}

	async function getById(id, notify) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'GET',
			notify,
		});
		return response.data || true;
	}

	async function post(data, notify) {
		const response = await api.fetchAuth(`customers`, {
			method: 'POST',
			body: JSON.stringify(data),
			notify,
		});
		return response.data || true;
	}

	async function put(id, data, notify) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			notify,
		});
		return response.data || true;
	}

	async function remove(id, notify) {
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'DELETE',
			notify,
		});
		return response.data || true;
	}

	return {
		getAll,
		getById,
		post,
		put,
		remove,
	};
})();

export default customers;
