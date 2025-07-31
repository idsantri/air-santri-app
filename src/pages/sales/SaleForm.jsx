import { useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import FormActions from '../../components/FormActions';
import useAuthStore from '../../store/authStore';
import useForm from '../../hooks/useForm';
import sales from '../../models/sales';
import { useNavigate } from 'react-router';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import SaleFormInputs from './SaleFormInputs'; // Import the new component

const SaleForm = ({ inputData = {} }) => {
	const user = useAuthStore((state) => state.user);
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!formData?.warehouse_id) formData.warehouse_id = user.warehouse_id;
		if (formData.id) handleUpdate(formData.id, formData);
		else handleCreate(formData);
	};

	const handleUpdate = (id, data) => {
		setIsLoading(true);
		sales
			.update(id, data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		sales
			.create(data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleDelete = async () => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		try {
			setIsLoading(true);
			await sales.remove(formData.id);
			navigate('/sales');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="mt-2 relative flex flex-col gap-4">
			{isLoading && <LoadingAbsolute />}
			<SaleFormInputs
				formData={formData}
				updateField={updateField}
				user={user}
			/>

			<FormActions
				onDelete={handleDelete}
				onReset={resetForm}
				hideDelete={!formData?.id}
				isLoading={isLoading}
			/>
		</form>
	);
};

export default SaleForm;
