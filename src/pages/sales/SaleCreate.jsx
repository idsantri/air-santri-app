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

				<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6">
					<label className="floating-label">
						<span>Pelanggan (ID)</span>
						<input type="text" className="input w-full" />
					</label>
					<label className="floating-label">
						<span>Agen (ID)</span>
						<input
							type="text"
							className="input w-full"
							disabled
							value={'123'}
						/>
					</label>
					<label className="floating-label">
						<span>Tanggal</span>
						<input type="text" className="input w-full" />
					</label>
					<label className="floating-label">
						<span>Status</span>
						<input type="text" className="input w-full" />
					</label>
					<label className="floating-label">
						<span>Catatan</span>
						<textarea type="text" className="textarea w-full" />
					</label>
					<div className="flex items-center justify-between ">
						<button className="btn btn-warning">Hapus</button>
						<div className="flex items-center gap-2">
							<button className="btn btn-secondary">Gagal</button>
							<button type="submit" className="btn btn-primary">
								Simpan
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
export default SaleCreate;
