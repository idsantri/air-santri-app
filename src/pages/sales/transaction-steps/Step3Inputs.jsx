import React, { useEffect } from 'react';
import { useTransactionStore } from '../../../store/transactionStore';
import SalePaymentFormInputs from '../../sale-payments/SalePaymentFormInputs';
import useForm from '../../../hooks/useForm';

export default function Step3Inputs() {
	const { payment, setPayment, details } = useTransactionStore(
		(state) => state,
	);

	const total = details?.length
		? details.reduce(
				(total, item) => total + item.quantity * item.unit_price,
				0,
			)
		: 0;

	const { formData, updateField } = useForm({ ...payment, amount: total });

	useEffect(() => {
		setPayment(formData);
	}, [formData, setPayment]);

	return (
		<form>
			<SalePaymentFormInputs
				formData={formData}
				updateField={updateField}
			/>
		</form>
	);
}
