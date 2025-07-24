import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SaleDetailForm from './SaleDetailForm';
import { Icon } from '@iconify/react/dist/iconify.js';
import useSaleStore from '../../store/saleStore';

function SaleDetailCreate() {
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
					<h2 className="text-md">Formulir Detail Transaksi</h2>
					<p className="badge badge-info">Baru</p>
				</div>
				<div className="border border-base-200 p-2 rounded-sm bg-base-200">
					<table className="text-sm">
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
						</tbody>
					</table>
				</div>
			</header>
			{sale?.id && <SaleDetailForm inputData={{ sale_id: sale.id }} />}
			<div className="fixed bottom-20 right-4">
				<button
					type="button"
					className="btn btn-accent text-accent-content"
					onClick={() => navigate(-1)}
				>
					<Icon icon="material-symbols:arrow-back-rounded" />
					Kembali
				</button>
			</div>
		</div>
	);
}
export default SaleDetailCreate;
