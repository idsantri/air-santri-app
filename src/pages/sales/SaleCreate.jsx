import SaleForm from './SaleForm';

const SaleCreate = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between  rounded-sm p-2 bg-base-200 mb-2">
						<h2 className="text-xl text-neutral">
							Formulir Transaksi
						</h2>
						<p className="badge badge-info">Baru</p>
					</div>
				</header>
				<SaleForm onSubmit={onSubmit} data={null} />
			</div>
		</>
	);
};
export default SaleCreate;
