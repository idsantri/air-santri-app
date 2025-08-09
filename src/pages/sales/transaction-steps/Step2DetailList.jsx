import React from 'react';
import { useTransactionStore } from '../../../store/transactionStore';

export default function Step2DetailList({ btnDelete = true }) {
	const { details, removeDetail } = useTransactionStore((state) => state);
	return (
		<>
			<ul className="list border border-base-200 rounded mb-2">
				{details.length > 0 ? (
					details.map((detail) => (
						<li
							className="list-row px-2 py-2"
							key={detail.product_id}
						>
							<div className="list-col-grow text-left">
								<div>{detail.product_name}</div>
								<div>
									<span className="font-medium">
										{(
											detail.quantity * detail.unit_price
										)?.toRupiah()}{' '}
									</span>
									<span className="text-xs opacity-75">
										({detail.quantity} x{' '}
										{detail.unit_price?.toRupiah(false)})
									</span>
								</div>
							</div>
							{btnDelete && (
								<button
									className="btn btn-circle btn-error btn-sm"
									onClick={() =>
										removeDetail(detail.product_id)
									}
								>
									⨉
								</button>
							)}
						</li>
					))
				) : (
					<li className="italic p-2 text-center">Tidak ada barang</li>
				)}
				<li className="px-2 py-2 bg-base-200/50 text-left">
					Total:{' '}
					<span className="font-medium">
						{details?.length &&
							details
								.reduce(
									(total, item) =>
										total + item.quantity * item.unit_price,
									0,
								)
								.toRupiah()}{' '}
					</span>
				</li>
			</ul>
		</>
	);
}
