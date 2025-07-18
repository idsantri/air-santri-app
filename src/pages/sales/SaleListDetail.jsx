import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';
import useSaleStore from '../../store/saleStore';
import { useState } from 'react';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import saleDetails from '../../models/saleDetails';
import useConfirmDialog from '../../hooks/use-confirm-dialog';

function SaleListDetail() {
	const { sale, details, onDeleteDetail } = useSaleStore((state) => state);
	const [isLoading, setIsLoading] = useState(false);
	const dialog = useConfirmDialog();

	const handleDelete = async (id) => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		try {
			setIsLoading(true);
			await saleDetails.remove(id);
			onDeleteDetail?.();
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<ul className="list border border-base-200 rounded relative">
				{isLoading && <LoadingAbsolute />}
				<li className="px-2 py-2  bg-base-200 flex items-center justify-between">
					<h3 className="tracking-wide font-semibold">
						Detail Pemesanan
					</h3>
					<Link
						className="btn btn-sm btn-neutral rounded-sm"
						to={`/sales/${sale?.id}/details/create`}
					>
						<Icon
							icon="material-symbols-light:add-rounded"
							width="1.5em"
						/>
						Tambah
					</Link>
				</li>
				{details.length > 0 ? (
					details.map((detail) => (
						<li className="list-row px-2 py-2" key={detail.id}>
							<div className="list-col-grow text-left">
								<div>{detail?.product_name}</div>
								<div className="text-xs opacity-75">
									{detail?.product_description}
								</div>
								<div>
									<span className="font-semibold">
										{detail.subtotal.toRupiah()}{' '}
									</span>
									<span className="text-xs opacity-75">
										({detail.quantity} x{' '}
										{detail.unit_price.toRupiah(false)})
									</span>
								</div>
							</div>
							<button
								className="btn btn-square text-center"
								onClick={() => handleDelete(detail.id)}
							>
								<Icon icon="material-symbols:delete-outline-rounded" />
							</button>
						</li>
					))
				) : (
					<li className="italic p-4 text-center">
						Tidak ada barang
						<br />
						Silakan tambahkan barang
					</li>
				)}
				<li className="px-2 py-2 bg-base-200/50 text-left">
					Total:{' '}
					<span className="font-semibold">
						{details?.length &&
							details
								.reduce(
									(total, item) => total + item.subtotal,
									0,
								)
								.toRupiah()}{' '}
					</span>
				</li>
			</ul>
		</>
	);
}
export default SaleListDetail;
