import { useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import FormActions from '../../components/FormActions';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import warehouses from '../../models/warehouses';

const WarehouseForm = ({ inputData = {} }) => {
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm, pickFields } = useForm(inputData);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		const submitted = pickFields(['name', 'code', 'address']);
		// console.log('🚀 ~ onSubmit ~ submitted:', submitted);
		// return;

		if (formData.id) handleUpdate(formData.id, submitted);
		else handleCreate(submitted);
	};

	const handleUpdate = (id, data) => {
		// return console.log(data);
		setIsLoading(true);
		warehouses
			.update(id, data)
			.then(({ _warehouse }) => {
				navigate(`/warehouses`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		warehouses
			.create(data)
			.then(({ _warehouse }) => {
				navigate(`/warehouses`);
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
			await warehouses.remove(formData.id);
			navigate('/warehouses');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 relative">
			{isLoading && <LoadingAbsolute />}

			<label className="floating-label">
				<span>Nama</span>
				<input
					type="text"
					className="input w-full"
					value={formData?.name ?? ''}
					onChange={(e) => updateField('name', e.target.value)}
					required
				/>
			</label>

			<label className="floating-label">
				<span>Kode</span>
				<input
					type="text"
					className="input w-full"
					value={formData?.code ?? ''}
					onChange={(e) => updateField('code', e.target.value)}
					required
				/>
			</label>

			<label className="floating-label">
				<span>Alamat</span>
				<input
					type="text"
					className="input w-full"
					value={formData?.address ?? ''}
					onChange={(e) => updateField('address', e.target.value)}
					required
				/>
			</label>

			<FormActions
				onDelete={handleDelete}
				onReset={resetForm}
				hideDelete={!formData?.id}
				isLoading={isLoading}
			/>
		</form>
	);
};

export default WarehouseForm;
