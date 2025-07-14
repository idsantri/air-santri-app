import { describe, it, expect, beforeAll } from 'vitest';
import { format } from 'date-fns';
import sales from './sales';
import { doLogin } from './setup-auth-test';

beforeAll(async () => {
	await doLogin();
});

describe('sales model', () => {
	let createdId;

	it('should create a sale', async () => {
		const data = {
			warehouse_id: 1,
			customer_id: 1,
			sale_date: format(new Date(), 'yyyy-MM-dd'),
		};
		const response = await sales.post(data, false);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id');
		createdId = response.sale.id;
	});

	it('should get all sales', async () => {
		const response = await sales.getAll(false, false);
		expect(response).toBeDefined();
		expect(Array.isArray(response.sales)).toBe(true);
	});

	it('should get sale by id', async () => {
		const response = await sales.getById(createdId, false);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id', createdId);
	});

	it('should update sale', async () => {
		const update = { amount: 200 };
		const response = await sales.put(createdId, update, false);
		expect(response).toBeDefined();
	});

	it('should remove sale', async () => {
		const response = await sales.remove(createdId, false);
		expect(response).toBeDefined();
	});
});
