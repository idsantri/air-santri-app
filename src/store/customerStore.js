import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCustomerStore = create(
	persist(
		(set) => ({
			customer: {},
			referrals: [],
			sales: [],

			setCustomer: (customer) => set({ customer }),
			setReferrals: (referrals) => set({ referrals }),
			setSales: (sales) => set({ sales }),
			reset: () => set({ customer: {}, referrals: [], sales: [] }),
		}),
		{
			name: 'customer-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export default useCustomerStore;
