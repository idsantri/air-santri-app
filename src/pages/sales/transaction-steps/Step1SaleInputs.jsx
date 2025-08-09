import React, { useEffect } from 'react';
import { useTransactionStore } from '../../../store/transactionStore';
import useAuthStore from '../../../store/authStore';
import SaleFormInputs from '../SaleFormInputs';
import useForm from '../../../hooks/useForm';

export default function Step1SaleInputs() {
	const user = useAuthStore((state) => state.user);
	const sale = useTransactionStore((state) => state.sale);
	const setSale = useTransactionStore((state) => state.setSale);
	const { formData, updateField } = useForm(sale);

	useEffect(() => {
		formData.warehouse_id = user.warehouse_id;
		formData.warehouse_name = user.warehouse_name;
		formData.warehouse_code = user.warehouse_code;
		setSale(formData);
	}, [formData, setSale, user]);
	function onSubmit(e) {
		e.preventDefault();
	}
	return (
		<form onSubmit={onSubmit}>
			<SaleFormInputs
				formData={formData}
				updateField={updateField}
				user={user}
			/>
		</form>
	);
}
