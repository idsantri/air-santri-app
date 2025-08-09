import { Icon } from '@iconify/react/dist/iconify.js';
import useSaleStore from '../../store/saleStore';
import formatDate from '../../utils/format-date';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { useState } from 'react';
import salePayments from '../../models/salePayments';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import { Link } from 'react-router';
import FileDownloader from '../../models/FileDownloader';

function SaleListPayment() {
	const { sale, payments, onDeletePayment } = useSaleStore((state) => state);
	const [isLoading, setIsLoading] = useState(false);
	const dialog = useConfirmDialog();

	const handleDelete = async (id) => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		try {
			setIsLoading(true);
			await salePayments.remove(id);
			onDeletePayment?.();
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownload = (id) => {
		const fileName = `kuitansi-${sale.customer_name}-${id}-${sale.code}.pdf`
			.replace(/\s/g, '-')
			.replace(/\//g, '-');
		FileDownloader.downloadPayment(id, fileName);
	};

	return (
		<ul className="list border border-base-200 rounded relative">
			{isLoading && <LoadingAbsolute />}
			<li className="px-2 py-2  bg-base-200 flex items-center justify-between">
				<h3 className="tracking-wide font-semibold">
					Detail Pembayaran
				</h3>
				<Link
					className="btn btn-sm btn-secondary rounded-sm"
					to={`/sales/${sale?.id}/payments/create`}
				>
					<Icon
						icon="material-symbols-light:add-rounded"
						width="1.5em"
					/>
					Tambah
				</Link>
			</li>
			{payments.length > 0 ? (
				payments.map((payment) => (
					<li className="list-row px-2 py-2" key={payment.id}>
						<button
							className="btn btn-square btn-success"
							onClick={() => handleDownload(payment.id)}
						>
							<Icon icon="material-symbols:print" height={22} />
						</button>
						<div className="list-col-grow text-left">
							<div>
								{formatDate(
									payment.payment_date,
									'dd MMMM yyyy HH:mm',
								)}
							</div>
							<div>
								<span className="font-semibold">
									{payment.amount?.toRupiah()}{' '}
								</span>
								<span className="text-xs opacity-75">
									({payment.payment_method})
								</span>
							</div>
							<div className="text-xs opacity-75">
								{payment?.note}
							</div>
						</div>
						<button
							className="btn btn-square btn-error"
							onClick={() => handleDelete(payment.id)}
						>
							<Icon icon="material-symbols:delete-outline-rounded" />
						</button>
					</li>
				))
			) : (
				<li className="italic p-4 text-center">
					Tidak ada pembayaran
					<br />
					Silakan tambahkan pembayaran
				</li>
			)}
			<li className="px-2 py-2 bg-base-200/50 text-left">
				Total:{' '}
				<span className="font-semibold">
					{payments?.length &&
						payments
							.reduce((total, item) => total + item.amount, 0)
							?.toRupiah()}{' '}
				</span>
			</li>
		</ul>
	);
}
export default SaleListPayment;
