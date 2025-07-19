import { useLocation, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import ProductForm from './ProductForm';
import ProductHeader from './ProductHeader';
import { useEffect, useState } from 'react';
import products from '../../models/products';

function ProductEdit() {
	const { id } = useParams(); // Jika Anda masih membutuhkan ID dari URL
	const location = useLocation();
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// console.log('🚀 ~ useEffect ~ location.state:', location.state.product);
		if (
			location.state &&
			location.state.product &&
			location?.state?.product?.id == id
		) {
			// Data ada dari navigasi
			setProduct(location.state.product);
			setIsLoading(false);
			// console.log('Data loaded from navigation state!');
		} else {
			// console.log('No data in state, fetching from server...');
			setIsLoading(true);
			products
				.getById(id)
				.then(({ product }) => {
					// console.log('🚀 ~ .then ~ product:', product);
					setProduct(product);
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [location.state, id]); // Tambahkan location.state sebagai dependency
	// console.log(product);
	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<ProductHeader />
				{isLoading && <LoadingFixed>Memuat data…</LoadingFixed>}
				<ProductForm inputData={product} />
			</div>
		</>
	);
}

export default ProductEdit;
