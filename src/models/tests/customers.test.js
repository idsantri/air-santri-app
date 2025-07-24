import { describe, it, expect, beforeAll, vi } from 'vitest';
import customers from '../customers';
import { doLogin } from './setup-auth';
import api from '../api'; // Import api to mock its methods

beforeAll(async () => {
	await doLogin();

	// Mock api.setNotify to do nothing, effectively disabling notifications
	// regardless of how customers.js functions try to set them.
	vi.spyOn(api, 'setNotify').mockImplementation(() => {
		// No operation
	});

	// Enable logging for API calls during tests
	api.setLog(true);
});

describe('customers model', () => {
	let createdId;

	it('should create a customer', async () => {
		const data = {
			name: 'Test Customer',
			address: 'Test Address',
			district: 'Socah',
		};
		const response = await customers.create(data);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id');
		createdId = response.customer.id;
		// Verify that setNotify was called by the customer model, but it was mocked to do nothing
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});

	it('should get all customers', async () => {
		const response = await customers.getAll();
		expect(response).toBeDefined();
		expect(Array.isArray(response.customers)).toBe(true);
		expect(api.setNotify).toHaveBeenCalledWith({
			showSuccess: false,
			showError: true,
		});
	});

	it('should get customer by id', async () => {
		const response = await customers.getById(createdId);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id', createdId);
		expect(api.setNotify).toHaveBeenCalledWith({
			showSuccess: false,
			showError: true,
		});
	});

	it('should update customer', async () => {
		const update = { name: 'Updated Customer' };
		const response = await customers.update(createdId, update);
		expect(response).toBeDefined();
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});

	it('should remove customer', async () => {
		const response = await customers.remove(createdId);
		expect(response).toBeDefined();
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});
});
