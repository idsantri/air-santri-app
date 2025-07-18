import { Icon } from '@iconify/react/dist/iconify.js';
import useSaleStore from '../../store/saleStore';
import formatDate from '../../utils/format-date';

function SaleListPayment() {
	const { payments } = useSaleStore((state) => state);

	return (
		<ul className="list border border-base-200 rounded">
			<li className="px-2 py-2  bg-base-200 flex items-center justify-between">
				<h3 className="tracking-wide font-semibold">
					Detail Pembayaran
				</h3>
				<button className="btn btn-sm btn-neutral rounded-sm">
					<Icon
						icon="material-symbols-light:add-rounded"
						width="1.5em"
					/>
					Tambah
				</button>
			</li>
			{payments.length > 0 ? (
				payments.map((payment) => (
					<li className="list-row px-2 py-2" key={payment.id}>
						<div className="list-col-grow text-left">
							<div>{formatDate(payment.payment_date)}</div>
							<div>
								<span className="font-semibold">
									{payment.amount.toRupiah()}{' '}
								</span>
								<span className="text-xs opacity-75">
									({payment.payment_method})
								</span>
							</div>
							<div className="text-xs opacity-75">
								{payment?.note}
							</div>
						</div>
						<button className="btn btn-square text-center">
							<Icon icon="material-symbols:edit-outline-rounded" />
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
							.toRupiah()}{' '}
				</span>
			</li>
		</ul>
	);
}
export default SaleListPayment;
