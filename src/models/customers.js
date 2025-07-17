import api from './api';
//  IIFE/factory function

const customers = (() => {
	async function getAll(params) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`customers`, {
			method: 'GET',
			params,
		});
		return response.data || true;
	}

	async function getById(id) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'GET',
		});
		return response.data || true;
	}

	async function create(data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`customers`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function update(id, data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function remove(id) {
		api.setNotify(true);
		const response = await api.fetchAuth(`customers/${id}`, {
			method: 'DELETE',
		});
		return response.data || true;
	}

	function setNotify(config) {
		api.setNotify(config);
	}

	function setLog(value) {
		api.setLog(value);
	}

	return {
		getAll,
		getById,
		create,
		update,
		remove,
		setNotify,
		setLog,
	};
})();

export default customers;
