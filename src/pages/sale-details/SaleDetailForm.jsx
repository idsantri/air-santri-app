import { useState } from 'react';
import FormActions from '../../components/FormActions';
import useForm from '../../hooks/useForm';
import saleDetails from '../../models/saleDetails';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import SaleDetailFormInputs from './SaleDetailFormInputs';

const SaleDetailForm = ({ inputData = {} }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { formData, updateField, resetForm } = useForm(inputData);

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log('🚀 ~ onSubmit ~ formData:', formData);
		setIsLoading(true);
		saleDetails
			.create(formData)
			.then(({ _ }) => {
				window.history.back();
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

			<FormActions onReset={resetForm} hideDelete />
		</form>
	);
};

export default SaleDetailForm;
