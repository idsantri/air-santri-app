import { describe, it, expect, beforeAll, vi } from 'vitest';
import sales from '../sales';
import { doLogin } from './setup-auth';
import api from '../api';

beforeAll(async () => {
	await doLogin();

	// Mock api.setNotify
	vi.spyOn(api, 'setNotify').mockImplementation(() => {
		// No operation
	});

	api.setLog(false);
});

describe('sales model', () => {
	let createdId;

	it('should create a sale', async () => {
		const data = {
			warehouse_id: 1,
			customer_id: 1,
			status: 'Proses',
		};
		const response = await sales.create(data);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id');
		createdId = response.sale.id;
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});

	it('should get all sales', async () => {
		const response = await sales.getAll({ warehouse_id: 1 });
		expect(response).toBeDefined();
		expect(Array.isArray(response.sales)).toBe(true);
		expect(api.setNotify).toHaveBeenCalledWith({
			showSuccess: false,
			showError: true,
		});
	});

	it('should get sale by id', async () => {
		const response = await sales.getById(createdId);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id', createdId);
		expect(api.setNotify).toHaveBeenCalledWith({
			showSuccess: false,
			showError: true,
		});
	});

	it('should update sale', async () => {
		const update = { amount: 200 };
		const response = await sales.update(createdId, update);
		expect(response).toBeDefined();
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});

	it('should remove sale', async () => {
		const response = await sales.remove(createdId);
		expect(response).toBeDefined();
		expect(api.setNotify).toHaveBeenCalledWith(true);
	});
});
