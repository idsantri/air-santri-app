import React, { useState } from 'react';
import { useTransactionStore } from '../../../store/transactionStore';
import Step2List from './Step2List';
import { notifyError } from '../../../components/Notify';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import LoadingFixed from '../../../components/LoadingFixed';
import sales from '../../../models/sales';
import { useNavigate } from 'react-router';

export default function Step4Confirmation({ goToStep }) {
	const { sale, payment, details } = useTransactionStore((state) => state);
	const dialog = useConfirmDialog();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const checkSale = () => {
		if (!sale?.customer_id || !sale?.warehouse_id || !sale?.status) {
			notifyError({ message: 'Input data pembelian tidak lengkap!' });
			goToStep(0);
			return false;
		}
		return true;
	};

	const checkDetails = () => {
		if (!details?.length > 0) {
			notifyError({ message: 'Isi data produk!' });
			goToStep(1);
			return false;
		}
		return true;
	};

	const checkPayment = () => {
		if (!payment.amount) return true;
		if (payment.amount > 0 && !payment?.payment_method) {
			notifyError({ message: 'Metode pembayaran diperlukan!' });
			goToStep(2);
			return false;
		}
		return true;
	};

	const noPayment = () => {
		return !payment?.amount || payment.amount < 1;
	};

	const finishTransaction = async () => {
		if (!checkSale()) return;
		if (!checkDetails()) return;
		if (!checkPayment()) return;

		let isConfirmed = false;
		let data = null;

		if (noPayment()) {
			data = { sale, details };
			isConfirmed = await dialog({
				title: 'Konfirmasi',
				message: 'Pelanggan belum melakukan pembayaran! Tetap lanjut?',
			});
		} else {
			data = { sale, details, payment };
			isConfirmed = await dialog({
				title: 'Konfirmasi',
				message: 'Simpan transaksi?',
			});
		}

		if (!isConfirmed) return;

		setIsLoading(true);
		sales
			.createTransaction(data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<div className="border border-base-200/75 rounded-sm">
				{isLoading && (
					<LoadingFixed>Proses menyimpan data …</LoadingFixed>
				)}
				<div className="p-2 bg-base-200">Transaksi</div>
				<div>
					<table className="table">
						<tbody>
							<tr>
								<td>Nama</td>
								<td>
									{sale.customer_name} ({sale.customer_code})
								</td>
							</tr>
							<tr>
								<td>Tanggal</td>
								<td>
									{sale?.sale_date
										? sale.sale_date
										: 'Sekarang'}
								</td>
							</tr>
							<tr>
								<td>Status</td>
								<td>{sale?.status}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="my-2">
				<Step2List btnDelete={false} />
			</div>

			<div className="border border-base-200/75 rounded-sm">
				<div className="p-2 bg-base-200">Pembayaran</div>
				<div>
					<table className="table">
						<tbody>
							<tr>
								<td>Nominal</td>
								<td className="font-medium">
									{payment?.amount?.toRupiah()}
								</td>
							</tr>
							<tr>
								<td>Tanggal</td>
								<td>
									{payment?.payment_date
										? payment.payment_date
										: 'Sekarang'}
								</td>
							</tr>
							<tr>
								<td>Metode</td>
								<td>{payment?.payment_method}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="p-2 bg-base-300 flex justify-between items-center">
				<div className="italic text-sm ml-2">Selesaikan transaksi</div>
				<button
					className="btn btn-secondary"
					onClick={finishTransaction}
				>
					Konfirmasi
				</button>
			</div>
			<div>
				{/* <pre>{JSON.stringify(sale, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(details, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(payment, null, 2)}</pre> */}
			</div>
		</>
	);
}
