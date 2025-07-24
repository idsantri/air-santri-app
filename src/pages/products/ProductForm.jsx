import { useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import FormActions from '../../components/FormActions';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import { notifyError } from '../../components/Notify';
import products from '../../models/products';

const ProductForm = ({ inputData = {} }) => {
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		if (formData?.release_price < formData?.take_price) {
			return notifyError({
				message: [
					'<span style="font-style:italic">Ghâddângan bânne karkaran <br/>Dâghângan bânne sedâkaan!</span>',
					'Harga jual terlalu rendah',
				],
			});
		}
		if (formData.id) handleUpdate(formData);
		else handleCreate(formData);
	};

	const handleUpdate = (data) => {
		// return console.log(data);
		setIsLoading(true);
		products
			.update(formData.id, data)
			.then(({ _product }) => {
				navigate(`/products`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleCreate = (data) => {
		// console.log(data);
		// return
		setIsLoading(true);
		products
			.create(data)
			.then(({ _product }) => {
				navigate(`/products`);
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
			await products.remove(formData.id);
			navigate('/products');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
			{isLoading && <LoadingFixed>Memproses data…</LoadingFixed>}
			<label className="floating-label">
				<span>Nama Produk</span>
				<input
					type="text"
					className="input w-full"
					value={formData?.name ?? ''}
					onChange={(e) => updateField('name', e.target.value)}
					required
				/>
			</label>
			<label className="floating-label">
				<span>Harga Beli (Kulak)</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.take_price ?? ''}
					onChange={(e) => updateField('take_price', e.target.value)}
					required
				/>
			</label>
			<label className="floating-label">
				<span>Harga Jual (Standar)</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.release_price ?? ''}
					onChange={(e) =>
						updateField('release_price', e.target.value)
					}
					required
				/>
			</label>

			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					className="textarea w-full"
					value={formData?.description ?? ''}
					onChange={(e) => updateField('description', e.target.value)}
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

export default ProductForm;
