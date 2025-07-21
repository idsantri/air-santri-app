import { useEffect, useState } from 'react';
import customers from '../../models/customers';
import { Link, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import { Icon } from '@iconify/react/dist/iconify.js';

function CustomerDetail() {
	const [customer, setCustomer] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	useEffect(() => {
		setIsLoading(true);
		customers
			.getById(id)
			.then(({ customer }) => {
				// console.log(customer);
				setCustomer(customer);
			})
			.catch((e) => console.log('error fetch customer by id', e))
			.finally(() => setIsLoading(false));
	}, [id]);

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
								<td>{`${customer?.phone ?? ''}`}</td>
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
			<div className="card card-border rounded-sm mt-2 p-2">
				<div className="mb-2 flex items-center justify-between bg-base-200/75 rounded-sm p-2">
					<h3 className="text-lg">Data Referral</h3>
					{/* <Link
						className="btn btn-sm btn-secondary rounded-sm"
						to={`/customers/${customer?.id}/referrals/create`}
					>
						<Icon
							icon="material-symbols-light:add-rounded"
							width="1.5em"
						/>
						Tambah
					</Link> */}
				</div>
				{customer?.referrals?.length > 0 ? (
					<ul className="list bg-base-100 rounded-sm shadow-md">
						{customer?.referrals?.map((referral) => (
							<li className="list-row" key={referral.id}>
								<div className="list-col-shrink">
									<Link
										className="btn btn-circle btn-info"
										to={`/customers/${referral.id}`}
									>
										<Icon icon="material-symbols:info-outline-rounded" />
									</Link>
								</div>
								<div className="list-col-grow">
									<div>{`${referral.name} (${referral.code})`}</div>
									<div className="list-col-wrap text-xs opacity-80">
										{`${referral.address ?? '?'} ${referral.district ?? '?'}`}
									</div>
								</div>
								{/* <button className="btn btn-square btn-error">
									<Icon icon="material-symbols:delete-outline-rounded" />
								</button> */}
							</li>
						))}
					</ul>
				) : (
					<div className="card rounded-sm p-4 text-center bg-base-300/50">
						<p>Tidak ada referral</p>
					</div>
				)}
			</div>
			{/* <pre>{JSON.stringify(customer, null, 2)}</pre> */}
		</>
	);
}

export default CustomerDetail;
