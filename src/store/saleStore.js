import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useSaleStore = create(
	persist(
		(set) => ({
			sale: {},
			details: [],
			payments: [],

			setSale: (sale) => set({ sale }),
			setDetails: (details) => set({ details }),
			setPayments: (payments) => set({ payments }),

			resetSale: () => set({ sale: {}, details: [], payments: [] }),

			// Event handlers
			onDeleteDetail: null,
			onDeletePayment: null,

			// Setter event handlers
			setOnDeleteDetail: (fn) => set({ onDeleteDetail: fn }),
			setOnDeletePayment: (fn) => set({ onDeletePayment: fn }),
		}),
		{
			name: 'sale-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export default useSaleStore;
