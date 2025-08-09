import { useEffect, useState } from 'react';
import SelectClearable from '../../components/SelectClearable';
import SelectSearch from '../../components/SelectSearch';
import customers from '../../models/customers';

const SaleFormInputs = ({ formData, updateField, user }) => {
	const [customerData, setCustomerData] = useState([]);
	const [district, setDistrict] = useState(null);
	const [loadingCustomer, setLoadingCustomer] = useState(false);
	const [optionsDistrict, setOptionsDistrict] = useState([]);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		setLoadingCustomer(true);
		customers.setNotify({ showSuccess: false, showError: true });
		customers
			.getAll()
			.then(({ customers }) => {
				const district = [
					...new Set(
						customers
							.filter((c) => c.district)
							.map((c) => c.district),
					),
				].sort();
				setOptionsDistrict(district);
				setCustomerData(customers);
			})
			.catch((error) => {
				console.error('Failed to fetch customers:', error);
			})
			.finally(() => {
				setLoadingCustomer(false);
			});
	}, []);

	useEffect(() => {
		const mapCustomers = customerData
			.filter(
				(c) =>
					c.is_active && (district ? c.district === district : true),
			)
			.map((c) => ({
				value: c.id,
				label: `${c.name} (${c.code})`,
				description: (c.address ?? '?') + ' — ' + c.district,
			}));
		setOptions(mapCustomers);
	}, [district, customerData]);

	const onChangeCustomer = (customer_id) => {
		updateField('customer_id', customer_id);
		const found = customerData.find((p) => p.id === customer_id);
		updateField('customer_name', found?.name || '');
		updateField('customer_code', found?.code || '');
	};

	return (
		<div className="flex flex-col gap-4">
			{/* <label className="floating-label">
				<span>Kode *</span>
				<input
					type="text"
					className="input w-full"
					disabled
					value={formData?.code ?? ''}
				/>
			</label> */}

			<label className="floating-label">
				<span>Agen (ID) *</span>
				<input
					type="text"
					className="input w-full"
					value={`${user.warehouse_name} (${user.warehouse_code})`}
					disabled
				/>
			</label>

			<SelectClearable
				label="Filter Kecamatan"
				options={optionsDistrict}
				value={district}
				onChange={setDistrict}
				placeholder="Filter kecamatan"
				disabled={loadingCustomer}
			/>

			<SelectSearch
				options={options}
				placeholder="Cari pelanggan/toko …"
				value={formData?.customer_id ?? ''}
				onChange={onChangeCustomer}
				isLoading={loadingCustomer}
				label="Pelanggan/Toko *"
			/>

			<label className="floating-label">
				<span>Tanggal *</span>
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
				{!formData.id && (
					<div className="text-xs text-base-content/75 ml-2">
						Kosongkan untuk waktu saat ini
					</div>
				)}
			</label>

			<SelectClearable
				label="Status Transaksi *"
				options={['Proses', 'Selesai', 'Gagal']}
				value={formData?.status || ''}
				onChange={(e) => updateField('status', e)}
				placeholder="Pilih status transaksi"
			/>

			<label className="floating-label">
				<span>Penerima</span>
				<input
					type="text"
					className="input w-full"
					value={formData?.recipient ?? ''}
					onChange={(e) => updateField('recipient', e.target.value)}
				/>
			</label>

			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					className="textarea w-full"
					value={formData?.note ?? ''}
					onChange={(e) => updateField('note', e.target.value)}
				/>
			</label>
		</div>
	);
};

export default SaleFormInputs;
