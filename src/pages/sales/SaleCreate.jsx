import { useState } from 'react';
import SaleForm from './SaleForm';
import sales from '../../models/sales';
import LoadingTailwind from '../../components/LoadingTailwind';
import { useNavigate } from 'react-router';
// import useAuthStore from '../../store/authStore';

const SaleCreate = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	// const [dataForm, _setDataForm] = useState({});

	const onSubmit = (data) => {
		// console.log(data);
		// return;
		setIsLoading(true);
		sales
			.create(data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => {
				console.log('🚀 ~ onSubmit ~ sales:', e);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between  rounded-sm p-2 bg-secondary text-secondary-content mb-2">
						<h2 className="text-xl text-neutral">
							Formulir Transaksi
						</h2>
						<p className="badge badge-info">Baru</p>
					</div>
				</header>
				{isLoading && (
					<LoadingTailwind>Menyimpan data …</LoadingTailwind>
				)}
				<SaleForm onSubmit={onSubmit} isLoading={isLoading} />
			</div>
		</>
	);
};
export default SaleCreate;
