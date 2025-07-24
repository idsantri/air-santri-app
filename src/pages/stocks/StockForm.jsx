import FormActions from '../../components/FormActions';
import { useNavigate } from 'react-router';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import useAuthStore from '../../store/authStore';
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';
import SelectSearch from '../../components/SelectSearch';
import products from '../../models/products';
import LoadingFixed from '../../components/LoadingFixed';
import warehouseProduct from '../../models/warehouseProduct';

function StockForm({ inputData = {} }) {
	const user = useAuthStore((state) => state.user);
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [isLoadingProduct, setIsLoadingProduct] = useState(false);

	useEffect(() => {
		setIsLoadingProduct(true);
		products
			.getAll()
			.then(({ products }) => {
				const mapped = products
					.filter((f) => !f.discontinue)
					.map((m) => ({
						value: m.id,
						label: `${m.name}`,
						description:
							'Harga jual: ' +
							(m.release_price ? m.release_price?.toRupiah() : 0),
					}));
				setOptions(mapped);
			})
			.catch((error) => {
				console.error('Failed to fetch products:', error);
			})
			.finally(() => {
				setIsLoadingProduct(false);
			});
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!formData?.warehouse_id) formData.warehouse_id = user.warehouse_id;

		if (formData.id) handleUpdate(formData.id, formData);
		else handleCreate(formData);
	};

	const handleUpdate = (id, data) => {
		setIsLoading(true);
		warehouseProduct
			.update(id, data)
			.then(({ _ }) => {
				navigate(`/stocks`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		warehouseProduct
			.create(data)
			.then(({ _ }) => {
				navigate(`/stocks`);
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
			await warehouseProduct.remove(formData.id);
			navigate('/stocks');
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
				<span>Agen (ID)</span>
				<input
					type="text"
					className="input w-full"
					value={`${user.warehouse_name} (${user.warehouse_code})`}
					disabled
				/>
			</label>
			<SelectSearch
				options={options}
				placeholder="Cari produk…"
				value={formData?.product_id ?? ''}
				onChange={(product_id) => {
					updateField('product_id', product_id);
				}}
				isLoading={isLoadingProduct}
				label="Produk"
			/>
			<label className="floating-label">
				<span>Stok</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.stock ?? ''}
					onChange={(e) => updateField('stock', e.target.value)}
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
}

export default StockForm;
