import { Link, useParams } from 'react-router';
import sales from '../../models/sales';
import { useCallback, useEffect, useState } from 'react';
import LoadingTailwind from '../../components/LoadingFixed';
import formatDate from '../../utils/format-date';
import { Icon } from '@iconify/react/dist/iconify.js';
import SaleDetailTab from './SaleDetailTab';
import useSaleStore from '../../store/saleStore';

const SaleDetail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	const {
		setSale,
		sale,
		details,
		setDetails,
		payments,
		setPayments,
		setOnDeleteDetail,
		setOnDeletePayment,
	} = useSaleStore((state) => state);

	const fetchData = useCallback(() => {
		setIsLoading(true);
		sales
			.getById(id)
			.then((res) => {
				setSale(res.sale);
				setDetails(res.details);
				setPayments(res.payments);
			})
			.catch((err) => {
				console.error('Gagal mengambil data:', err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id, setSale, setDetails, setPayments]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		// Simpan handler ke store
		setOnDeleteDetail(() => fetchData());
		setOnDeletePayment(() => fetchData());
	}, [setOnDeleteDetail, setOnDeletePayment, fetchData]);

	return (
		<>
			<div className="flex items-center justify-between  rounded-sm p-2 bg-base-200 mb-2">
				<h2 className="text-xl text-neutral">Detail Penjualan</h2>
				<Link
					className="btn btn-sm btn-neutral rounded-sm"
					to={`/sales/${id}/edit`}
					state={{
						saleData: sale,
					}}
				>
					<Icon icon="material-symbols:edit-rounded" />
					Edit
				</Link>
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
												sale.sale_date,
												'dd MMMM yyyy',
											)}
										</td>
									</tr>
									<tr>
										<td>Invoice</td>
										<td>{sale.code}</td>
									</tr>
									<tr>
										<td>Pelanggan</td>
										<td className="flex items-center justify-between">
											{sale.customer_name}
											<Link
												className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
												to={`/customers/${sale.customer_id}`}
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
										<td>{sale.status}</td>
									</tr>
									<tr>
										<td>Tagihan</td>
										<td>
											{sale?.total_amount &&
												sale.total_amount?.toRupiah()}{' '}
											<span className="text-xs italic">
												({details?.length || 0} item)
											</span>
										</td>
									</tr>
									<tr>
										<td>Terbayar</td>
										<td>
											{sale?.total_payment &&
												sale.total_payment.toRupiah()}{' '}
											<span className="text-xs italic">
												({payments?.length || 0} kali)
											</span>
										</td>
									</tr>

									<tr>
										<td>Sisa</td>
										<td>
											{(
												sale.total_amount -
												sale.total_payment
											).toRupiah()}
										</td>
									</tr>

									<tr>
										<td>Agen</td>
										<td className="flex items-center justify-between">
											{sale.warehouse_name}
											<Link
												className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
												to={`/warehouses/${sale.warehouse_id}`}
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
										<td>{sale.note || '-'}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<SaleDetailTab
						details={details}
						payments={payments}
						sale={sale}
						onDelete={fetchData}
					/>
				</>
			)}
		</>
	);
};
export default SaleDetail;
