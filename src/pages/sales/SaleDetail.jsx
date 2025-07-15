import { Link, useParams } from 'react-router';
import sales from '../../models/sales';
import { useEffect, useState } from 'react';
import LoadingTailwind from '../../components/LoadingTailwind';
import formatDate from '../../utils/format-date';
import { Icon } from '@iconify/react/dist/iconify.js';

const SaleDetail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		setIsLoading(true);
		sales
			.getById(id)
			.then((res) => {
				setData(res.sale);
				console.log(res.sale);
			})
			.catch((_e) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<div className="pointer-events-auto">
			<div className="text-center">
				<h2 className="text-xl font-bold">Detail Penjualan</h2>
				{isLoading ? (
					<LoadingTailwind />
				) : (
					<div className="mt-4 card card-border rounded-md">
						{/* <LoadingTailwind /> */}
						<div className="overflow-x-auto">
							<table className="table">
								<tbody>
									<tr>
										<td>Tanggal</td>
										<td>
											{formatDate(
												data.sale_date,
												'dd MMMM yyyy',
											)}
										</td>
									</tr>
									<tr>
										<td>Pelanggan</td>
										<td className="flex items-center justify-between">
											{data.customer.name}
											<Link
												className="btn btn-xs btn-info btn-circle text-info-content border-primary"
												to={`/customers/${data.customer.id}`}
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
										<td>{data.status}</td>
									</tr>
									<tr>
										<td>Terbayar</td>
										<td>{data.total_amount}</td>
									</tr>
									<tr>
										<td>Catatan</td>
										<td>{data.note || '-'}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default SaleDetail;
