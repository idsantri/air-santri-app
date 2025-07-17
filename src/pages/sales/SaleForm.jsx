import { useEffect, useState } from 'react';
import SelectSearch from '../../components/SelectSearch';
import useConfirmDialog from '../../hooks/use-confirm-dialog';
import FormActions from '../../components/FormActions';
import customers from '../../models/customers';
import useAuthStore from '../../store/authStore';

const SaleForm = ({ onSubmit, inputData = {}, isLoading = false }) => {
	const [options, setOptions] = useState([]);
	const [loadingCustomer, setLoadingCustomer] = useState(false);
	const [input, setInput] = useState(() => inputData);

	const { user } = useAuthStore().auth;

	useEffect(() => {
		setInput(inputData);
	}, [inputData]);

	useEffect(() => {
		setLoadingCustomer(true);
		customers.setNotify({ showSuccess: false, showError: true });
		customers
			.getAll()
			.then(({ customers }) => {
				if (customers && customers.length > 0) {
					const activeOptions = customers
						.filter((c) => c.is_active)
						.map((c) => ({
							value: c.id,
							label: `${c.name} (${c.code})`,
							description: c.address,
						}));
					setOptions(activeOptions);
				}
			})
			.catch((error) => {
				console.error('Failed to fetch customers:', error);
			})
			.finally(() => {
				setLoadingCustomer(false);
			});
	}, []);

	const submitForm = (e) => {
		e.preventDefault();
		if (!input?.warehouse_id) {
			input.warehouse_id = user.warehouse_id;
		}
		onSubmit(input);
	};

	const dialog = useConfirmDialog();
	const onDelete = async () => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		alert('Fitur belum siap');
	};

	return (
		<form onSubmit={submitForm} className="flex flex-col gap-4 mt-4">
			<label className="floating-label">
				<span>Kode</span>
				<input
					type="text"
					className="input w-full "
					disabled
					value={input?.code ?? ''}
				/>
			</label>
			<SelectSearch
				options={options}
				placeholder="Cari pelanggan/toko …"
				value={input?.customer_id ?? ''}
				onChange={(value) => setInput({ ...input, customer_id: value })}
				isLoading={loadingCustomer}
				label="Pelanggan/Toko"
			/>
			<label className="floating-label">
				<span>Agen (ID)</span>
				<input
					type="text"
					className="input w-full"
					value={
						user.warehouse_name + ' (' + user.warehouse_code + ')'
					}
					disabled
				/>
			</label>
			<label className="floating-label">
				<span>Tanggal</span>
				<input
					type="date"
					className="input w-full"
					value={
						input?.sale_date ? input.sale_date.split('T')[0] : ''
					}
					onChange={(e) =>
						setInput({
							...input,
							sale_date: new Date(e.target.value).toISOString(), // simpan sebagai ISO datetime
						})
					}
				/>
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
					onChange={(e) =>
						setInput({ ...input, status: e.target.value })
					}
				>
					<option>Proses</option>
					<option>Selesai</option>
					<option>Gagal</option>
				</select>
			</label>
			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					type="text"
					className="textarea w-full"
					value={input?.note ?? ''}
					onChange={(e) =>
						setInput({ ...input, note: e.target.value })
					}
				/>
			</label>
			<FormActions onDelete={onDelete} isNew isLoading={isLoading} />
		</form>
	);
};
export default SaleForm;
