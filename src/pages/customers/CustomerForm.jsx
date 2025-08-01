import React, { useEffect, useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router';
import FormActions from '../../components/FormActions';
import customers from '../../models/customers';
import SelectSearch from '../../components/SelectSearch';
import kecamatan from './kecamatan';
import LoadingAbsolute from '../../components/LoadingAbsolute';

function CustomerForm({ inputData = {} }) {
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm, pickFields } = useForm(inputData);

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
	const [options, setOptions] = useState([]);
	const [disableReferrer, setDisableReferrer] = useState(false);

	useEffect(() => {
		setIsLoadingCustomer(true);
		customers
			.getAll({ is_referrer: true })
			.then(({ customers }) => {
				const mapCustomers = customers
					.filter((c) => c.is_active)
					.map((c) => ({
						value: c.code,
						label: `${c.name} (${c.code})`,
						description: (c.address ?? '?') + ' — ' + c.district,
					}));
				setOptions(mapCustomers);
				// console.log(mapCustomers);
			})
			.catch((error) => {
				console.error('Failed to fetch customers:', error);
			})
			.finally(() => {
				setIsLoadingCustomer(false);
			});
	}, []);

	useEffect(() => {
		if (formData.is_referrer) {
			setDisableReferrer(true);
			formData.referrer_code = '';
		} else {
			setDisableReferrer(false);
		}
	}, [formData]);

	const onSubmit = (e) => {
		e.preventDefault();

		const submitData = pickFields([
			'code',
			'name',
			'phone',
			'email',
			'district',
			'address',
			'referrer_code',
			'is_referrer',
			'is_active',
		]);
		// console.log(submitData);
		// return;

		if (formData.id) handleUpdate(formData.id, submitData);
		else handleCreate(submitData);
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		customers
			.create(data)
			.then(({ customer }) => {
				// console.log(customer);
				navigate(`/customers/${customer.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleUpdate = (id, data) => {
		setIsLoading(true);
		customers
			.update(id, data)
			.then(({ customer }) => {
				// console.log(customer);
				navigate(`/customers/${customer.id}`);
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
			await customers.remove(formData.id);
			navigate('/customers');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 relative">
			{isLoading && <LoadingAbsolute />}

			<label className="floating-label">
				<span>Kode</span>
				<input
					className="input w-full"
					type="text"
					name="code"
					value={formData?.code ?? ''}
					onChange={(e) => updateField('code', e.target.value)}
					disabled={formData.id}
				/>
				{!formData.id && (
					<div className="text-xs ml-3 py-0.5 opacity-75">
						Kosongkan untuk pengisian otomatis; Hanya dibuat sekali
						(tidak dapat diubah)
					</div>
				)}
			</label>

			<label className="floating-label">
				<span>Nama</span>
				<input
					className="input w-full"
					type="text"
					name="name"
					value={formData?.name ?? ''}
					onChange={(e) => updateField('name', e.target.value)}
				/>
			</label>

			<label className="floating-label">
				<span>Nomor Telepon</span>
				<input
					className="input w-full"
					type="number"
					name="phone"
					value={formData?.phone ?? ''}
					onChange={(e) => updateField('phone', e.target.value)}
					placeholder="0812…"
				/>
			</label>

			<label className="floating-label">
				<span>Alamat (Pendek)</span>
				<input
					className="input w-full"
					type="text"
					name="address"
					value={formData?.address ?? ''}
					onChange={(e) => updateField('address', e.target.value)}
				/>
			</label>

			<label className="floating-label" htmlFor="district">
				<span>Kecamatan</span>
				<select
					name="district"
					id="district"
					value={formData?.district || ''}
					className="input select w-full"
					onChange={(e) => updateField('district', e.target.value)}
					required
				>
					<option value="" disabled hidden>
						Pilih Kecamatan
					</option>
					{kecamatan.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</label>

			<label className="label rounded-sm border-[0.5px] border-primary text-base-content p-2">
				<input
					type="checkbox"
					className="toggle"
					name="is_referrer"
					checked={formData?.is_referrer ?? false}
					onChange={(e) => {
						updateField(
							'is_referrer',
							e.target.checked ? true : false,
						);
					}}
				/>
				<span className="text-sm">Sebagai Referrer</span>
			</label>
			<SelectSearch
				value={formData?.referrer_code ?? ''}
				onChange={(value) => updateField('referrer_code', value)}
				options={options}
				placeholder="Cari referrer"
				isLoading={isLoadingCustomer}
				label="Pilih Referrer"
				disabled={disableReferrer}
			/>
			<FormActions
				onDelete={handleDelete}
				onReset={resetForm}
				hideDelete={!formData?.id}
				isLoading={isLoading}
			/>
		</form>
	);
}

export default CustomerForm;
