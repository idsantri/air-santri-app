import { describe, it, expect, beforeAll } from 'vitest';
import customers from './customers';
import { doLogin } from './setup-auth-test';

beforeAll(async () => {
	await doLogin();
});

describe('customers model', () => {
	let createdId;

	it('should create a customer', async () => {
		const data = {
			name: 'Test Customer',
			address: 'Test Address',
			code: new Date().getTime(),
		};
		customers.setNotify(false);
		const response = await customers.post(data);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id');
		createdId = response.customer.id;
	});

	it('should get all customers', async () => {
		customers.setNotify(false);
		const response = await customers.getAll();
		expect(response).toBeDefined();
		expect(Array.isArray(response.customers)).toBe(true);
	});

	it('should get customer by id', async () => {
		customers.setNotify(false);
		const response = await customers.getById(createdId);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id', createdId);
	});

	it('should update customer', async () => {
		const update = { name: 'Updated Customer' };
		customers.setNotify(false);
		const response = await customers.put(createdId, update);
		expect(response).toBeDefined();
	});

	it('should remove customer', async () => {
		customers.setNotify(false);
		const response = await customers.remove(createdId);
		expect(response).toBeDefined();
	});
});
