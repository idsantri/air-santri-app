import { describe, it, expect, beforeAll } from 'vitest';
import customers from './customers';
import auth from './auth';

beforeAll(async () => {
	localStorage.clear();
	return await auth.login({
		login: 'user1',
		password: '112233',
	});
});

describe('customers model', () => {
	let createdId;

	it('should create a customer', async () => {
		const data = { name: 'Test Customer', address: 'Test Address' };
		const response = await customers.post(data);
		expect(response).toBeDefined();
		expect(response.data.customer).toHaveProperty('id');
		createdId = response.data.customer.id;
	});

	it('should get all customers', async () => {
		const response = await customers.get();
		expect(response).toBeDefined();
		expect(Array.isArray(response.data.customers)).toBe(true);
	});

	it('should get customer by id', async () => {
		const response = await customers.get(createdId);
		expect(response).toBeDefined();
		expect(response.data.customer).toHaveProperty('id', createdId);
	});

	it('should update customer', async () => {
		const update = { name: 'Updated Customer' };
		const response = await customers.put(createdId, update);
		expect(response).toBeDefined();
	});

	it('should remove customer', async () => {
		const response = await customers.remove(createdId);
		expect(response).toBeDefined();
	});
});
