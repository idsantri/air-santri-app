import { useState } from 'react';
import FormActions from '../../components/FormActions';
import useForm from '../../hooks/useForm';
import salePayments from '../../models/salePayments';
import { useNavigate } from 'react-router';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import SalePaymentFormInputs from './SalePaymentFormInputs';

const SalePaymentForm = ({ sale_id, inputData = {} }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		formData.sale_id = sale_id;
		// console.log('🚀 ~ onSubmit ~ formData:', formData);
		// return;
		setIsLoading(true);
		salePayments
			.create(formData)
			.then(({ _ }) => {
				// console.log(_product);
				// resetForm();
				navigate(`/sales/${sale_id}`);
			})
			.catch((error) => {
				console.error('Failed to create product:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<form onSubmit={onSubmit} className="mt-2 relative flex flex-col gap-4">
			{isLoading && <LoadingAbsolute />}

			<SalePaymentFormInputs
				formData={formData}
				updateField={updateField}
			/>

			<FormActions onReset={resetForm} hideDelete />
		</form>
	);
};

export default SalePaymentForm;
