import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import sales from '../../models/sales';
import SaleForm from './SaleForm';
import LoadingTailwind from '../../components/LoadingTailwind';

function SaleEdit() {
	const { id } = useParams(); // Jika Anda masih membutuhkan ID dari URL
	const location = useLocation();
	const [sale, setSale] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingForm, setIsLoadingForm] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state) {
			// Data ada dari navigasi
			setSale(location.state.saleData);
			setIsLoading(false);
			// console.log('Data loaded from navigation state!');
		} else {
			// console.log('No data in state, fetching from server...');
			setIsLoading(true);
			sales
				.getById(id)
				.then(({ sale }) => {
					// console.log(sale);
					setSale(sale);
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [location.state, id]); // Tambahkan location.state sebagai dependency

	const onSubmit = (data) => {
		// console.log('🚀 ~ onSubmit ~ data:', data);
		// return;
		setIsLoadingForm(true);
		sales
			.update(sale.id, data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => {
				console.log('🚀 ~ onSubmit ~ sales:', e);
			})
			.finally(() => setIsLoadingForm(false));
	};

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between  rounded-sm p-2 bg-secondary text-secondary-content mb-2">
						<h2 className="text-xl text-neutral">
							Formulir Transaksi
						</h2>
						<p className="badge badge-info">Edit</p>
					</div>
				</header>
				{isLoading && <LoadingTailwind>Memuat data…</LoadingTailwind>}
				{isLoadingForm && (
					<LoadingTailwind>Menyimpan data…</LoadingTailwind>
				)}
				<SaleForm
					onSubmit={onSubmit}
					isLoading={isLoadingForm}
					inputData={sale}
				/>
			</div>
		</>
	);
}

export default SaleEdit;
