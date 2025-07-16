import { useState } from 'react';
import SelectSearch from '../../components/SelectSearch';
import useConfirmDialog from '../../hooks/use-confirm-dialog';
import FormActions from '../../components/FormActions';

const SaleForm = ({ onSubmit, data }) => {
	const dialog = useConfirmDialog();

	console.log(data);
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
		// console.log('Buah yang dipilih:', value);
		setSelectedFruit(value);
	};

	const onDelete = async () => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		alert('Fitur belum siap');
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
			<label className="floating-label">
				<span>Kode</span>
				<input
					type="text"
					className="input w-full "
					disabled
					value={'123'}
				/>
			</label>
			<SelectSearch
				options={optionsData}
				placeholder="Cari pelanggan/toko …"
				value={selectedFruit}
				onChange={handleFruitChange}
			/>
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
				<input type="date" className="input w-full" />
				<div className="text-xs text-info-content/75 ml-2">
					Kosongkan untuk waktu saat ini
				</div>
			</label>
			<label className="floating-label" htmlFor="status">
				<span>Status</span>
				<select
					id="status"
					defaultValue="Proses"
					className="input select w-full"
				>
					<option>Proses</option>
					<option>Selesai</option>
					<option>Gagal</option>
				</select>
			</label>
			<label className="floating-label">
				<span>Catatan</span>
				<textarea type="text" className="textarea w-full" />
			</label>
			<FormActions onDelete={onDelete} isNew />
		</form>
	);
};
export default SaleForm;
