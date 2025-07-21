import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import customers from '../../models/customers';
import CustomerForm from './CustomerForm';

function CustomerEdit() {
	const { id } = useParams();
	const location = useLocation();
	const [customer, setCustomer] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (
			location.state &&
			location.state.customer &&
			location?.state?.customer?.id == id
		) {
			// Data ada dari navigasi
			setCustomer(location.state.customer);
			setIsLoading(false);
			// console.log('Data loaded from navigation state!');
		} else {
			// console.log('No data in state, fetching from server...');
			setIsLoading(true);
			customers
				.getById(id)
				.then(({ customer }) => {
					// console.log(sale);
					setCustomer(customer);
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [location.state, id]);

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between rounded-sm p-2 bg-accent text-accent-content mb-2">
						<h2 className="text-xl">Formulir Pelanggan</h2>
						<p className="badge badge-info">Edit</p>
					</div>
				</header>
				{isLoading && <LoadingFixed>Memuat data…</LoadingFixed>}
				<CustomerForm inputData={customer} />
			</div>
		</>
	);
}

export default CustomerEdit;
