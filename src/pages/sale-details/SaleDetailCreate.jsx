import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SaleDetailForm from './SaleDetailForm';
import { Icon } from '@iconify/react/dist/iconify.js';

function SaleDetailCreate() {
	const { state } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!state || (state && !state.sale)) {
			navigate(-1);
		}
	}, [state, navigate]);
	// console.log(state.sale);

	return (
		<div className="card p-2 border border-base-200 rounded-sm">
			<header>
				<div className="flex items-center justify-between rounded-sm p-2 bg-secondary text-secondary-content mb-2">
					<h2 className="text-xl text-neutral">
						Formulir Detail Transaksi
					</h2>
					<p className="badge badge-info">Baru</p>
				</div>
				<div className="border border-base-200 p-2 rounded-sm">
					<table className="text-sm text-secondary-content">
						<tbody>
							<tr>
								<td className="pr-4 italic">Kode</td>
								<td>{state?.sale?.code}</td>
							</tr>
							<tr>
								<td className="pr-4 italic">Pelanggan</td>
								<td>{state?.sale?.customer_name}</td>
							</tr>
							<tr>
								<td className="pr-4 italic">Agen</td>
								<td>{state?.sale?.warehouse_name}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</header>
			{state?.sale?.id && <SaleDetailForm sale_id={state.sale.id} />}
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
