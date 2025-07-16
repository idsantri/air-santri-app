import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import formatDate from '../../utils/format-date';

function SaleDetailTab({ details, payments }) {
	const [activeTab, setActiveTab] = useState('tab1');
	// console.log(details[0]);
	console.log(payments[0]);
	return (
		<div className="mt-2">
			{/* Tab Navigation */}
			<div role="tablist" className="tabs tabs-border mb-1 ">
				<button
					className={`tab ${activeTab === 'tab1' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab1')}
				>
					Detail Barang
				</button>
				<button
					className={`tab ${activeTab === 'tab2' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab2')}
				>
					Pembayaran
				</button>
			</div>

			<div>
				{activeTab === 'tab1' && (
					<ul className="list border border-base-200 rounded">
						<li className="px-2 py-2  bg-base-200 flex items-center justify-between">
							<h3 className="tracking-wide font-semibold">
								Detail Pemesanan
							</h3>
							<button className="btn btn-sm btn-neutral rounded-sm">
								<Icon
									icon="material-symbols-light:add-rounded"
									width="1.5em"
								/>
								Tambah
							</button>
						</li>
						{details.length > 0 ? (
							details.map((detail) => (
								<li
									className="list-row px-2 py-2"
									key={detail.id}
								>
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
												{detail.unit_price.toRupiah(
													false,
												)}
												)
											</span>
										</div>
									</div>
									<button className="btn btn-square text-center">
										<Icon icon="material-symbols:edit-outline-rounded" />
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
								{details
									.reduce(
										(total, item) => total + item.subtotal,
										0,
									)
									.toRupiah()}{' '}
							</span>
						</li>
					</ul>
				)}
				{activeTab === 'tab2' && (
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
								<li
									className="list-row px-2 py-2"
									key={payment.id}
								>
									<div className="list-col-grow text-left">
										<div>
											{formatDate(payment.payment_date)}
										</div>
										<div>
											<span className="font-semibold">
												{payment.amount.toRupiah()}{' '}
											</span>
											<span className="text-xs opacity-75">
												({payment.payment_method})
											</span>
										</div>
										<div className="text-xs opacity-75">
											{payment?.notes}
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
								{payments
									.reduce(
										(total, item) => total + item.amount,
										0,
									)
									.toRupiah()}{' '}
							</span>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
}

export default SaleDetailTab;
