import api from './api';
//  IIFE/factory function

/**
 * current user model
 * @module user
 * @returns {Object} user model with methods to interact with the user API
 */
const user = (() => {
	/**
	 * get current user data
	 * @function me
	 * @returns {Object|true} user data or true on success
	 */
	async function me() {
		api.setNotify({ showSuccess: false, showError: true });
		const response = await api.fetchAuth(`user`, {
			method: 'GET',
		});
		return response.data || true;
	}

	/**
	 * update current user data
	 * @function update
	 * @param {Object} data
	 * @returns {Object|true}
	 */
	async function update(data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`user`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	/**
	 * reset user password
	 * @function resetPassword
	 * @param {Object} data
	 * @returns {Object|true}
	 */
	async function resetPassword(data) {
		api.setNotify(true);
		const response = await api.fetchAuth(`user/update-password`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.data || true;
	}

	return { me, update, resetPassword };
})();

export default user;
