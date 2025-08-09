import React from 'react';
import { useTransactionStore } from '../../../store/transactionStore';
import SaleDetailFormInputs from '../../sale-details/SaleDetailFormInputs';
import useForm from '../../../hooks/useForm';
import { notifyError } from '../../../components/Notify';

export default function Step2DetailInputs() {
	const { formData, updateField, resetForm } = useForm({});
	const { addDetail } = useTransactionStore((state) => state);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			!formData.product_id ||
			!formData.quantity ||
			!formData.unit_price
		) {
			notifyError({ message: 'Isian tidak lengkap' });
			return;
		}

		try {
			await addDetail(formData);
			resetForm();
		} catch (error) {
			console.log('🚀 ~ onSubmit ~ error:', error);
			notifyError({ message: error.message });
		}
		// console.log('store', saleStore);
		// handleNext();
	};

	return (
		<>
			<div className="">
				<SaleDetailFormInputs
					formData={formData}
					updateField={updateField}
				/>
				<div className="flex items-center justify-end">
					<button
						type="submit"
						className="btn btn-success"
						onClick={onSubmit}
					>
						Tambahkan
					</button>
				</div>
			</div>
		</>
	);
}
