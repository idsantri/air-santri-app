import { Link, useParams } from 'react-router';
import sales from '../../models/sales';
import { useCallback, useEffect, useState } from 'react';
import LoadingFixed from '../../components/LoadingFixed';
import { Icon } from '@iconify/react/dist/iconify.js';
import Tabs from '../../components/Tabs';
import useSaleStore from '../../store/saleStore';
import SaleListDetail from './SaleListDetail';
import SaleListPayment from './SaleListPayment';
import FileDownloader from '../../models/FileDownloader';
import SaleDetailTable from './SaleDetailTable';

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
			{isLoading && <LoadingFixed />}
			<div className="card card-border rounded-sm">
				<div className="overflow-x-auto">
					<SaleDetailTable
						sale={sale}
						details={details}
						payments={payments}
					/>

					<div className="flex items-center justify-between gap-x-4 p-2 bg-base-200/75">
						<button
							className="btn btn-sm btn-accent rounded-sm"
							onClick={downloadInvoice}
						>
							<Icon icon="material-symbols:print" height="22" />
							Invoice
						</button>
						<button
							className="btn btn-sm btn-info rounded-sm"
							onClick={downloadReceipt}
						>
							<Icon icon="material-symbols:print" height="22" />
							Struk
						</button>
					</div>
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
