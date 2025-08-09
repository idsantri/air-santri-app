import React from 'react';
import formatDate from '../../utils/format-date';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';

function SaleDetailTable({ sale, details, payments }) {
	return (
		<table className="table">
			<tbody>
				<tr>
					<td>Tanggal</td>
					<td>{formatDate(sale.sale_date, 'dd MMMM yyyy')}</td>
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
							<Icon icon="material-symbols:info" width="1.5em" />
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
						{sale?.total_gross && sale.total_gross?.toRupiah()}{' '}
						<span className="text-xs italic">
							({details?.length || 0} produk)
						</span>
					</td>
				</tr>
				<tr>
					<td>Terbayar</td>
					<td>
						{sale?.total_payment && sale.total_payment?.toRupiah()}{' '}
						<span className="text-xs italic">
							({payments?.length || 0} kali)
						</span>
					</td>
				</tr>

				<tr>
					<td>Sisa</td>
					<td>
						{(sale?.total_gross - sale?.total_payment)?.toRupiah()}
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
							<Icon icon="material-symbols:info" width="1.5em" />
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
		</table>
	);
}

export default SaleDetailTable;
