import React from 'react';
import useCustomerStore from '../../store/customerStore';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';
import formatDate from '../../utils/format-date';

export default function CustomerSale() {
	const { sales } = useCustomerStore((state) => state);
	// console.log(sales[0]);
	return (
		<>
			<div className="card card-border rounded-sm mt-2 p-2">
				<div className="mb-2 flex items-center justify-between bg-base-200/75 rounded-sm p-2">
					<h3 className="text-lg">Data Transaksi</h3>
				</div>
				{sales?.length > 0 ? (
					<ul className="list bg-base-100 rounded-sm shadow-md">
						{sales.map((sale) => (
							<li className="list-row" key={sale.id}>
								<div className="list-col-shrink">
									<Link
										className="btn btn-circle btn-info"
										to={`/sales/${sale.id}`}
									>
										<Icon icon="material-symbols:info-outline-rounded" />
									</Link>
								</div>
								<div className="list-col-grow">
									<div>{`${sale.code} (${sale.total_item} item)`}</div>
									<div className="">
										<span>
											Total:{' '}
											{sale?.total_gross?.toRupiah()}
										</span>
										{' — '}
										<span>
											Sisa:{' '}
											{(
												sale?.total_gross -
												sale?.total_payment
											)?.toRupiah()}
										</span>
									</div>
									<div className="list-col-wrap text-xs opacity-80 flex justify-between ">
										<span>
											{formatDate(
												sale.sale_date,
												'dd MMMM yyyy HH:mm',
											)}
										</span>
										<span className="uppercase">
											{sale.status}
										</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className="card rounded-sm p-4 text-center bg-base-300/50">
						<p>Tidak ada transaksi</p>
					</div>
				)}
			</div>
		</>
	);
}
