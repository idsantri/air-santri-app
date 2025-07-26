import api from './api';
//  IIFE/factory function

const users = (() => {
	async function getAll(params) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`users`, {
			method: 'GET',
			params,
		});
		return response.data || true;
	}

	async function getById(id) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`users/${id}`, {
			method: 'GET',
		});
		return response.data || true;
	}

	async function create(data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`users`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function update(id, data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`users/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function updateRole(id, data) {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`users/${id}/role`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	async function remove(id) {
		api.setNotify(true);
		const response = await api.fetchAuth(`users/${id}`, {
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
		updateRole,
		remove,
		setNotify,
		setLog,
	};
})();

export default users;
