import { useState } from 'react';
import SelectSearch from './SelectSearch';

const SaleCreate = () => {
	const optionsData = [
		{ value: 'apple', label: 'Apel' },
		{ value: 'banana', label: 'Pisang', description: 'Rasa manis' },
		{ value: 'cherry', label: 'Ceri' },
		{ value: 'date', label: 'Kurma', description: 'Rasa manis' },
		{ value: 'grape', label: 'Anggur' },
		{ value: 'kiwi', label: 'Kiwi' },
		{ value: 'lemon', label: 'Lemon' },
		{ value: 'mango', label: 'Mangga' },
		{ value: 'orange', label: 'Jeruk', description: 'Rasa Asam' },
		{ value: 'peach', label: 'Persik' },
	];

	const [selectedFruit, setSelectedFruit] = useState('');

	const handleFruitChange = (value) => {
		console.log('Buah yang dipilih:', value);
		setSelectedFruit(value);
	};

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
				<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
					<SelectSearch
						options={optionsData}
						placeholder="Cari pelanggan …"
						value={selectedFruit}
						onChange={handleFruitChange}
					/>
					<label className="floating-label">
						<span>Pelanggan (ID)</span>
						<input
							type="text"
							className="input w-full rounded-sm"
						/>
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
