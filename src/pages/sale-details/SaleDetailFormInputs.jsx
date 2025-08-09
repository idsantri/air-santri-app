import { useEffect, useState } from 'react';
import products from '../../models/products';
import SelectSearch from '../../components/SelectSearch';

const SaleDetailFormInputs = ({ formData, updateField }) => {
	const [isLoadingProduct, setIsLoadingProduct] = useState(false);
	const [options, setOptions] = useState([]);
	const [productsList, setProductsList] = useState([]);

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
		updateField('product_name', prod?.name || '');
	};

	return (
		<div className="flex flex-col gap-4">
			<SelectSearch
				options={options}
				placeholder="Cari produk…"
				value={formData?.product_id ?? ''}
				onChange={onChangeProduct}
				isLoading={isLoadingProduct}
				label="Produk *"
			/>
			<label className="floating-label">
				<span>Harga *</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.unit_price ?? ''}
					onChange={(e) => updateField('unit_price', e.target.value)}
				/>
			</label>
			<label className="floating-label">
				<span>Jumlah *</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.quantity ?? ''}
					onChange={(e) => updateField('quantity', e.target.value)}
				/>
			</label>
			<div className="px-1 font-normal">
				Total:{' '}
				{(
					(formData?.quantity || 0) * (formData?.unit_price || 0)
				)?.toRupiah()}
			</div>
		</div>
	);
};

export default SaleDetailFormInputs;
