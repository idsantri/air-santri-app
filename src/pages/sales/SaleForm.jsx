import { useEffect, useState } from 'react';
import SelectSearch from '../../components/SelectSearch';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import FormActions from '../../components/FormActions';
import customers from '../../models/customers';
import useAuthStore from '../../store/authStore';
import useForm from '../../hooks/useForm';
import sales from '../../models/sales';
import { useNavigate } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';

const SaleForm = ({ inputData = {} }) => {
	const { user } = useAuthStore().auth;
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();
	// const { formData, updateField, setFormData } = useForm(inputData);
	// setFormData((prev) => ({
	// 	...prev,
	// 	dynamic_field: 'baru',
	// }));

	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingCustomer, setLoadingCustomer] = useState(false);

	// Muat customer
	useEffect(() => {
		setLoadingCustomer(true);
		customers.setNotify({ showSuccess: false, showError: true });
		customers
			.getAll()
			.then(({ customers }) => {
				const mapCustomers = customers
					.filter((c) => c.is_active)
					.map((c) => ({
						value: c.id,
						label: `${c.name} (${c.code})`,
						description: c.address,
					}));
				setOptions(mapCustomers);
			})
			.catch((error) => {
				console.error('Failed to fetch customers:', error);
			})
			.finally(() => {
				setLoadingCustomer(false);
			});
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!formData?.warehouse_id) formData.warehouse_id = user.warehouse_id;
		if (formData.id) handleUpdate(formData);
		else handleCreate(formData);
	};

	const handleUpdate = (data) => {
		setIsLoading(true);
		sales
			.update(formData.id, data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		sales
			.create(data)
			.then(({ sale }) => {
				navigate(`/sales/${sale.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleDelete = async () => {
		const isConfirmed = await dialog({
			message: 'Hapus data ini?',
		});
		if (!isConfirmed) return;

		try {
			setIsLoading(true);
			await sales.remove(formData.id);
			navigate('/sales');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
			{isLoading && <LoadingFixed>Memproses data…</LoadingFixed>}

			<label className="floating-label">
				<span>Kode</span>
				<input
					type="text"
					className="input w-full"
					disabled
					value={formData?.code ?? ''}
				/>
			</label>

			<SelectSearch
				options={options}
				placeholder="Cari pelanggan/toko …"
				value={formData?.customer_id ?? ''}
				onChange={(value) => updateField('customer_id', value)}
				isLoading={loadingCustomer}
				label="Pelanggan/Toko"
			/>

			<label className="floating-label">
				<span>Agen (ID)</span>
				<input
					type="text"
					className="input w-full"
					value={`${user.warehouse_name} (${user.warehouse_code})`}
					disabled
				/>
			</label>

			<label className="floating-label">
				<span>Tanggal</span>
				<input
					type="date"
					className="input w-full"
					value={
						formData?.sale_date
							? formData.sale_date.split('T')[0]
							: ''
					}
					onChange={(e) =>
						updateField(
							'sale_date',
							new Date(e.target.value).toISOString(),
						)
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
					value={formData?.status || ''}
					className="input select w-full"
					onChange={(e) => updateField('status', e.target.value)}
					required
				>
					<option value="" disabled hidden>
						Pilih status
					</option>
					<option value="Proses">Proses</option>
					<option value="Selesai">Selesai</option>
					<option value="Gagal">Gagal</option>
				</select>
			</label>

			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					className="textarea w-full"
					value={formData?.note ?? ''}
					onChange={(e) => updateField('note', e.target.value)}
				/>
			</label>

			<FormActions
				onDelete={handleDelete}
				onReset={resetForm}
				hideDelete={!formData?.id}
				isLoading={isLoading}
			/>
		</form>
	);
};

export default SaleForm;
