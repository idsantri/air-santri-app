import { describe, it, expect, beforeAll } from 'vitest';
import { format } from 'date-fns';
import sales from './sales';
import auth from './auth';

beforeAll(async () => {
	localStorage.clear();
	return await auth.login({
		login: 'user1',
		password: '112233',
	});
});

describe('sales model', () => {
	let createdId;

	it('should create a sale', async () => {
		const data = {
			warehouse_id: 1,
			customer_id: 1,
			sale_date: format(new Date(), 'yyyy-MM-dd'),
		};
		const response = await sales.post(data);
		expect(response).toBeDefined();
		expect(response.data.sale).toHaveProperty('id');
		createdId = response.data.sale.id;
	});

	it('should get all sales', async () => {
		const response = await sales.get();
		expect(response).toBeDefined();
		expect(Array.isArray(response.data.sales)).toBe(true);
	});

	it('should get sale by id', async () => {
		const response = await sales.get(createdId);
		expect(response).toBeDefined();
		expect(response.data.sale).toHaveProperty('id', createdId);
	});

	it('should update sale', async () => {
		const update = { amount: 200 };
		const response = await sales.put(createdId, update);
		expect(response).toBeDefined();
	});

	it('should remove sale', async () => {
		const response = await sales.remove(createdId);
		expect(response).toBeDefined();
	});
});
