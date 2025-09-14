import { useEffect, useState } from 'react';
import customers from '../../models/customers';
import { Link, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import { Icon } from '@iconify/react/dist/iconify.js';
import useCustomerStore from '../../store/customerStore';
import Tabs from '../../components/Tabs';
import CustomerSale from './CustomerSale';
import CustomerReferral from './CustomerReferral';

function CustomerDetail() {
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const { customer, setCustomer, setReferrals, setSales } = useCustomerStore(
		(state) => state,
	);

	useEffect(() => {
		setIsLoading(true);
		customers
			.getById(id)
			.then(({ customer, sales, referrals }) => {
				// console.log(customer);
				setCustomer(customer);
				setReferrals(referrals);
				setSales(sales);
			})
			.catch((e) => console.log('error fetch customer by id', e))
			.finally(() => setIsLoading(false));
	}, [id, setCustomer, setReferrals, setSales]);

	return (
		<>
			<header className="flex items-center justify-between  rounded-sm p-2 bg-base-300 mb-2">
				<h2 className="text-xl text-base-content">Detail Pelanggan</h2>
				<Link
					className="btn btn-sm btn-accent rounded-sm"
					to={`/customers/${id}/edit`}
					state={{ customer }}
				>
					<Icon icon="material-symbols:edit-rounded" />
					Edit
				</Link>
			</header>
			{isLoading && <LoadingFixed />}

			{/* detail customer */}
			<div className="card card-border rounded-sm">
				<div className="overflow-x-auto">
					<table className="table">
						<tbody>
							<tr>
								<td>Code</td>
								<td>{customer?.code}</td>
							</tr>
							<tr>
								<td>Nama</td>
								<td>{customer?.name}</td>
							</tr>
							<tr>
								<td>Alamat</td>
								<td>{`${customer?.address ?? ''} ${customer?.district ?? ''}`}</td>
							</tr>
							<tr>
								<td>No. Telepon</td>
								<td className="flex items-center justify-between">
									<span>{`${customer?.phone ?? ''}`}</span>
									{customer?.phone && (
										<a
											className="btn btn-sm btn-circle btn-success text-neutral border-neutral-400 absolute right-2"
											href={`https://wa.me/${customer?.phone?.replace(/^0/, '62') ?? ''}?text=Assalamualaikum%20${customer?.name}`}
											target="_blank"
											rel="noreferrer"
										>
											<Icon
												icon="logos:whatsapp-icon"
												width="1.5em"
											/>
										</a>
									)}
								</td>
							</tr>
							<tr>
								<td>Referensi</td>
								<td>{`${customer?.is_referrer ? 'Ya' : 'Tidak'}`}</td>
							</tr>

							<tr>
								<td>Referrer</td>
								<td>
									{customer?.referrer ? (
										<span className="flex items-center justify-between">
											<span>
												{customer?.referrer?.name} (
												{customer?.referrer?.code})
											</span>
											<Link
												className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
												to={`/customers/${customer?.referrer?.id}`}
											>
												<Icon
													icon="material-symbols:info"
													width="1.5em"
												/>
											</Link>
										</span>
									) : (
										'-'
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* <pre>{JSON.stringify(customer, null, 2)}</pre> */}

			<Tabs
				tab1={{
					label: 'Transaksi',
					component: <CustomerSale />,
				}}
				tab2={{
					label: 'Referral',
					component: <CustomerReferral />,
				}}
			/>
		</>
	);
}

export default CustomerDetail;
