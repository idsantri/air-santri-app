import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useSaleStore from '../../store/saleStore';
import SalePaymentForm from './SalePaymentForm';

function SalePaymentCreate() {
	const sale = useSaleStore((state) => state.sale);
	const navigate = useNavigate();

	useEffect(() => {
		// Cek jika sale adalah objek kosong
		const isEmpty = sale && Object.keys(sale).length === 0;

		if (!sale || isEmpty) {
			navigate(-1); // redirect back
		}
	}, [sale, navigate]);

	return (
		<div className="card p-2 border border-base-200 rounded-sm">
			<header>
				<div className="flex items-center justify-between rounded-sm p-2 bg-secondary text-secondary-content mb-2">
					<h2 className="text-md">Formulir Pembayaran Transaksi</h2>
					<p className="badge badge-info">Baru</p>
				</div>
				<div className="border border-base-200 p-2 rounded-sm">
					<table className="text-sm text-secondary-content">
						<tbody>
							<tr>
								<td className="pr-4 italic">Kode</td>
								<td>{sale?.code}</td>
							</tr>
							<tr>
								<td className="pr-4 italic">Pelanggan</td>
								<td>{sale?.customer_name}</td>
							</tr>
							<tr>
								<td className="pr-4 italic">Agen</td>
								<td>{sale?.warehouse_name}</td>
							</tr>
							<tr>
								<td className="pr-4 italic">Sisa Tagihan</td>
								<td className="font-semibold">
									{(
										(sale?.total_amount || 0) -
										(sale?.total_payment || 0)
									).toRupiah()}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</header>
			{sale?.id && <SalePaymentForm sale_id={sale.id} />}
		</div>
	);
}
export default SalePaymentCreate;
