import { Link, useParams } from 'react-router';
import sales from '../../models/sales';
import { useEffect, useState } from 'react';
import LoadingTailwind from '../../components/LoadingTailwind';
import formatDate from '../../utils/format-date';
import { Icon } from '@iconify/react/dist/iconify.js';
import SaleDetailTab from './SaleDetailTab';

const SaleDetail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	const [details, setDetails] = useState({});
	const [payments, setPayments] = useState({});

	useEffect(() => {
		setIsLoading(true);
		sales
			.getById(id)
			.then((res) => {
				setData(res.sale);
				setDetails(res.details);
				setPayments(res.payments);
				// console.log(res);
			})
			.catch((_e) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<div className="pointer-events-auto">
			<div className="">
				<div className="flex items-center justify-between  rounded-sm p-2 bg-base-200 mb-2">
					<h2 className="text-xl text-neutral">Detail Penjualan</h2>
					<button className="btn btn-sm btn-neutral rounded-sm">
						<Icon icon="material-symbols:edit-rounded" />
						Edit
					</button>
				</div>
				{isLoading ? (
					<LoadingTailwind />
				) : (
					<>
						<div className="card card-border rounded-sm">
							<div className="overflow-x-auto">
								<table className="table">
									<tbody>
										<tr>
											<td>Tanggal</td>
											<td>
												{formatDate(
													data.sale_date,
													'dd MMMM yyyy',
												)}
											</td>
										</tr>
										<tr>
											<td>Invoice</td>
											<td>{data.code}</td>
										</tr>
										<tr>
											<td>Pelanggan</td>
											<td className="flex items-center justify-between">
												{data.customer_name}
												<Link
													className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
													to={`/customers/${data.customer_id}`}
												>
													<Icon
														icon="material-symbols:info"
														width="1.5em"
													/>
												</Link>
											</td>
										</tr>
										<tr>
											<td>Status</td>
											<td>{data.status}</td>
										</tr>
										<tr>
											<td>Tagihan</td>
											<td>
												{data.total_amount.toRupiah()}{' '}
												<span className="text-xs italic">
													({details?.length || 0}{' '}
													item)
												</span>
											</td>
										</tr>
										<tr>
											<td>Terbayar</td>
											<td>
												{data.total_payment.toRupiah()}{' '}
												<span className="text-xs italic">
													({payments?.length || 0}{' '}
													kali)
												</span>
											</td>
										</tr>

										<tr>
											<td>Sisa</td>
											<td>
												{(
													data.total_amount -
													data.total_payment
												).toRupiah()}
											</td>
										</tr>

										<tr>
											<td>Agen</td>
											<td className="flex items-center justify-between">
												{data.warehouse_name}
												<Link
													className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
													to={`/warehouses/${data.warehouse_id}`}
												>
													<Icon
														icon="material-symbols:info"
														width="1.5em"
													/>
												</Link>
											</td>
										</tr>

										<tr>
											<td>Catatan</td>
											<td>{data.note || '-'}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<SaleDetailTab details={details} payments={payments} />
					</>
				)}
			</div>
		</div>
	);
};
export default SaleDetail;
