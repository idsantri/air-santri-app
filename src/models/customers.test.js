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
		const response = await customers.post(data, false);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id');
		createdId = response.customer.id;
	});

	it('should get all customers', async () => {
		const response = await customers.getAll(false, false);
		expect(response).toBeDefined();
		expect(Array.isArray(response.customers)).toBe(true);
	});

	it('should get customer by id', async () => {
		const response = await customers.getById(createdId, false);
		expect(response).toBeDefined();
		expect(response.customer).toHaveProperty('id', createdId);
	});

	it('should update customer', async () => {
		const update = { name: 'Updated Customer' };
		const response = await customers.put(createdId, update, false);
		expect(response).toBeDefined();
	});

	it('should remove customer', async () => {
		const response = await customers.remove(createdId, false);
		expect(response).toBeDefined();
	});
});
