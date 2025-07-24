import api from './api';
//  IIFE/factory function

const user = (() => {
	async function me() {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`user`, {
			method: 'GET',
		});
		return response.data || true;
	}

	async function resetPassword(data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`user/update-password`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	return { me, resetPassword };
})();

export default user;
