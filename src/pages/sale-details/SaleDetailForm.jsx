import { useEffect, useState } from 'react';
import FormActions from '../../components/FormActions';
import LoadingFixed from '../../components/LoadingFixed';
import useForm from '../../hooks/useForm';
import products from '../../models/products';
import SelectSearch from '../../components/SelectSearch';
import saleDetails from '../../models/saleDetails';

const SaleDetailForm = ({ sale_id, inputData = {} }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingProduct, setIsLoadingProduct] = useState(false);
	const [options, setOptions] = useState([]);
	const [productsList, setProductsList] = useState([]);
	const { formData, updateField, resetForm } = useForm(inputData);

	useEffect(() => {
		setIsLoadingProduct(true);
		products.setNotify({ showSuccess: false, showError: true });
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
				setProductsList(products);
			})
			.catch((error) => {
				console.error('Failed to fetch products:', error);
			})
			.finally(() => {
				setIsLoadingProduct(false);
			});
	}, []);

	const onChangeProduct = (product_id) => {
		updateField('product_id', product_id);
		// console.log(product_id);
		const prod = productsList.find((p) => p.id === product_id);
		// console.log(prod);
		updateField('unit_price', prod?.release_price || '');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		formData.sale_id = sale_id;
		// console.log('🚀 ~ onSubmit ~ formData:', formData);
		setIsLoading(true);
		saleDetails
			.create(formData)
			.then(({ _product }) => {
				console.log(_product);
				resetForm();
			})
			.catch((error) => {
				console.error('Failed to create product:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
			{isLoading && <LoadingFixed>Memproses data…</LoadingFixed>}
			<SelectSearch
				options={options}
				placeholder="Cari produk…"
				value={formData?.product_id ?? ''}
				onChange={onChangeProduct}
				isLoading={isLoadingProduct}
				label="Produk"
			/>
			<label className="floating-label">
				<span>Harga</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.unit_price ?? ''}
					onChange={(e) => updateField('unit_price', e.target.value)}
				/>
			</label>
			<label className="floating-label">
				<span>Jumlah</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.quantity ?? ''}
					onChange={(e) => updateField('quantity', e.target.value)}
				/>
			</label>
			<div className="px-1 font-semibold">
				Total:{' '}
				{(
					(formData?.quantity || 0) * (formData?.unit_price || 0)
				).toRupiah()}
			</div>
			<FormActions onReset={resetForm} hideCancel hideDelete />
		</form>
	);
};

export default SaleDetailForm;
