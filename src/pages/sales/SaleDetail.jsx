import { Link, useParams } from 'react-router';
import sales from '../../models/sales';
import { useCallback, useEffect, useState } from 'react';
import LoadingFixed from '../../components/LoadingFixed';
import formatDate from '../../utils/format-date';
import { Icon } from '@iconify/react/dist/iconify.js';
import Tabs from '../../components/Tabs';
import useSaleStore from '../../store/saleStore';
import SaleListDetail from './SaleListDetail';
import SaleListPayment from './SaleListPayment';
import FileDownloader from '../../models/FileDownloader';

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

	const downloadInvoice = async () => {
		await FileDownloader.downloadInvoice(id, sale.code);
	};
	const downloadReceipt = async () => {
		await FileDownloader.downloadReceipt(id, sale.code);
	};

	return (
		<>
			<header className="flex items-center justify-between  rounded-sm p-2 bg-base-300 mb-2">
				<h2 className="text-xl text-base-content">Detail Transaksi</h2>
				<div className="flex gap-2">
					<Link
						className="btn btn-sm btn-accent rounded-sm"
						to={`/sales/${id}/edit`}
						state={{ sale }}
					>
						<Icon
							icon="material-symbols:edit-rounded"
							height="16"
						/>
						Edit
					</Link>
				</div>
			</header>
			{/* <LoadingFixed /> */}
			{isLoading && <LoadingFixed />}
			<div className="card card-border rounded-sm">
				<div className="overflow-x-auto">
					<table className="table">
						<tbody>
							<tr>
								<td>Tanggal</td>
								<td>
									{formatDate(sale.sale_date, 'dd MMMM yyyy')}
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
									{sale?.total_gross &&
										sale.total_gross?.toRupiah()}{' '}
									<span className="text-xs italic">
										({details?.length || 0} produk)
									</span>
								</td>
							</tr>
							<tr>
								<td>Terbayar</td>
								<td>
									{sale?.total_payment &&
										sale.total_payment?.toRupiah()}{' '}
									<span className="text-xs italic">
										({payments?.length || 0} kali)
									</span>
								</td>
							</tr>

							<tr>
								<td>Sisa</td>
								<td>
									{(
										sale?.total_gross - sale?.total_payment
									)?.toRupiah()}
								</td>
							</tr>

							<tr>
								<td>Agen</td>
								<td className="flex items-center justify-between">
									{sale.warehouse_name}
									<Link
										disabled
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
								<td>Penerima</td>
								<td>{sale.recipient || '-'}</td>
							</tr>
							<tr>
								<td>Catatan</td>
								<td>{sale.note || '-'}</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td
									colSpan="2"
									className="py-1 px-2 bg-base-200 "
								>
									<div className="flex items-center justify-between gap-x-4">
										<button
											className="btn btn-sm btn-accent rounded-sm"
											onClick={downloadInvoice}
										>
											<Icon
												icon="material-symbols:print"
												height="22"
											/>
											Invoice
										</button>
										<button
											className="btn btn-sm btn-info rounded-sm"
											onClick={downloadReceipt}
										>
											<Icon
												icon="material-symbols:print"
												height="22"
											/>
											Struk
										</button>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			<Tabs
				tab1={{
					label: 'Detail Barang',
					component: <SaleListDetail />,
				}}
				tab2={{
					label: 'Pembayaran',
					component: <SaleListPayment />,
				}}
			/>
		</>
	);
};
export default SaleDetail;
