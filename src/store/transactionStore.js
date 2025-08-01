// store/saleStore.js
import { create } from 'zustand';

export const useTransactionStore = create((set, get) => ({
	sale: {},
	details: [],
	payment: {},

	// ========== DETAILS ACTIONS ========== //
	addDetail: (newDetail) => {
		const { details } = get();
		const isDuplicate = details.some(
			(detail) => detail.product_id === newDetail.product_id,
		);

		if (isDuplicate) {
			throw new Error(
				`Produk yang Anda pilih sudah terdapat dalam daftar!`,
			);
		}

		set((state) => ({
			details: [...state.details, newDetail],
		}));
	},

	updateDetail: (product_id, newData) =>
		set((state) => ({
			details: state.details.map((detail) =>
				detail.product_id === product_id
					? { ...detail, ...newData }
					: detail,
			),
		})),

	removeDetail: (product_id) =>
		set((state) => ({
			details: state.details.filter(
				(detail) => detail.product_id !== product_id,
			),
		})),

	// ========== OTHER ACTIONS ========== //
	setSale: (data) => set((state) => ({ sale: { ...state.sale, ...data } })),
	setPayment: (data) =>
		set((state) => ({ payment: { ...state.payment, ...data } })),
	reset: () => set({ sale: {}, details: [], payment: {} }),
}));
