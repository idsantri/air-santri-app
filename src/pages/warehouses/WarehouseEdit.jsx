import { useLocation, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import WarehouseForm from './WarehouseForm';
import WarehouseHeader from './WarehouseHeader';
import { useEffect, useState } from 'react';
import warehouses from '../../models/warehouses';

function WarehouseEdit() {
	const { id } = useParams(); // Jika Anda masih membutuhkan ID dari URL
	const location = useLocation();
	const [warehouse, setWarehouse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// console.log('🚀 ~ useEffect ~ location.state:', location.state.product);
		if (
			location.state &&
			location.state.warehouse &&
			location?.state?.warehouse?.id == id
		) {
			// Data ada dari navigasi
			setWarehouse(location.state.warehouse);
			setIsLoading(false);
			// console.log('Data loaded from navigation state!');
		} else {
			// console.log('No data in state, fetching from server...');
			setIsLoading(true);
			warehouses
				.getById(id)
				.then(({ warehouse }) => {
					// console.log('🚀 ~ .then ~ product:', product);
					setWarehouse(warehouse);
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
				<WarehouseHeader />
				{isLoading && <LoadingFixed>Memuat data…</LoadingFixed>}
				<WarehouseForm inputData={warehouse} />
			</div>
		</>
	);
}

export default WarehouseEdit;
