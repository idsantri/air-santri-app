import { describe, it, expect, beforeAll } from 'vitest';
import { format } from 'date-fns';
import sales from '../sales';
import { doLogin } from './setup-auth';

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
		sales.setNotify(false);
		const response = await sales.create(data);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id');
		createdId = response.sale.id;
	});

	it('should get all sales', async () => {
		// sales.setNotifyConfig(false);
		const response = await sales.getAll({ warehouse_id: 1 });
		expect(response).toBeDefined();
		expect(Array.isArray(response.sales)).toBe(true);
	});

	it('should get sale by id', async () => {
		sales.setNotify(false);
		const response = await sales.getById(createdId);
		expect(response).toBeDefined();
		expect(response.sale).toHaveProperty('id', createdId);
	});

	it('should update sale', async () => {
		const update = { amount: 200 };
		sales.setNotify(false);
		const response = await sales.update(createdId, update);
		expect(response).toBeDefined();
	});

	it('should remove sale', async () => {
		sales.setNotify(false);
		const response = await sales.remove(createdId);
		expect(response).toBeDefined();
	});
});
