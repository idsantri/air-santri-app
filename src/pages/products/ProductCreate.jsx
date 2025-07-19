import ProductForm from './ProductForm';
import ProductHeader from './ProductHeader';

function ProductCreate() {
	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<ProductHeader isNew />
				<ProductForm />
			</div>
		</>
	);
}

export default ProductCreate;
