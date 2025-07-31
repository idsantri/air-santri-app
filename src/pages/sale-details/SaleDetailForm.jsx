import { useState } from 'react';
import FormActions from '../../components/FormActions';
import useForm from '../../hooks/useForm';
import saleDetails from '../../models/saleDetails';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import SaleDetailFormInputs from './SaleDetailFormInputs';

const SaleDetailForm = ({ inputData = {} }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { formData, updateField, resetForm } = useForm(inputData);
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('🚀 ~ onSubmit ~ formData:', formData);
		setIsLoading(true);
		setSubmitted(false);
		saleDetails
			.create(formData)
			.then(({ _product }) => {
				// console.log(_product);
				resetForm();
				setSubmitted(true);
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

			<SaleDetailFormInputs
				formData={formData}
				updateField={updateField}
			/>

			<FormActions onReset={resetForm} hideCancel hideDelete />

			{submitted && (
				<div className="p-4 rounded-sm bg-info text-info-content text-center w-full">
					Tambahkan produk lagi
				</div>
			)}
		</form>
	);
};

export default SaleDetailForm;
