import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router';
import sales from '../../models/sales';
import { useCallback, useEffect, useState } from 'react';
import LoadingFixed from '../../components/LoadingFixed';
import { Icon } from '@iconify/react/dist/iconify.js';
import useSaleStore from '../../store/saleStore';
import FileDownloader from '../../models/FileDownloader';
import SaleDetailTable from './SaleDetailTable';
import TabRoute from '../../components/TabRoute';

const SaleDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
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

	useEffect(() => {
		// jika tidak ada sub-path yang ditentukan
		if (location.pathname === `/sales/${id}`) {
			navigate(`details`, { replace: true });
		}
	}, [id, navigate, location]);

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

	const downloadInvoice = () => {
		setIsLoading(true);
		const fileName = `invoice-${sale.customer_name}-${sale.code}.pdf`;
		FileDownloader.downloadInvoice(id, fileName)
			.then(() => {})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false));
	};

	const downloadReceipt = () => {
		setIsLoading(true);
		const fileName = `nota-${sale.customer_name}-${sale.code}.pdf`;
		FileDownloader.downloadReceipt(id, fileName)
			.then(() => {})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false));
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
							Nota/Struk
						</button>
					</div>
				</div>
			</div>
			<TabRoute
				routes={[
					{
						label: 'Detail Barang',
						url: `/sales/${id}/details`,
						icon: <Icon icon="mynaui:list" height="24" />,
					},
					{
						label: 'Pembayaran',
						url: `/sales/${id}/payments`,
						icon: (
							<Icon
								icon="fluent:payment-28-regular"
								height="28"
							/>
						),
					},
				]}
			/>
			<Outlet />
		</>
	);
};
export default SaleDetail;
