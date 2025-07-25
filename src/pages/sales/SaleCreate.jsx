import SaleForm from './SaleForm';
const SaleCreate = () => {
	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between rounded-sm p-2 bg-accent text-accent-content mb-2">
						<h2 className="text-xl">Formulir Transaksi</h2>
						<p className="badge badge-info">Baru</p>
					</div>
				</header>
				<SaleForm />
			</div>
		</>
	);
};
export default SaleCreate;
