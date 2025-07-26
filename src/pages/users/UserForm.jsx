import React, { useEffect, useState } from 'react';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router';
import FormActions from '../../components/FormActions';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import users from '../../models/users';
import warehouses from '../../models/warehouses';
import SelectSearch from '../../components/SelectSearch';

function UserForm({ inputData = {} }) {
	const dialog = useConfirmDialog();
	const { formData, updateField, resetForm, pickFields } = useForm(inputData);

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(false);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		setIsLoadingWarehouse(true);
		warehouses
			.getAll()
			.then(({ warehouses }) => {
				const mapped = warehouses.map((c) => ({
					value: c.id,
					label: `${c.name} (${c.code})`,
					description: c.address ?? '?',
				}));
				setOptions(mapped);
				// console.log(mapCustomers);
			})
			.catch((error) => {
				console.error('Failed to fetch customers:', error);
			})
			.finally(() => {
				setIsLoadingWarehouse(false);
			});
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();

		const submitData = pickFields(['email', 'name', 'warehouse_id']);
		// console.log(submitData);
		// return;

		if (formData.id) handleUpdate(formData.id, submitData);
		else handleCreate(submitData);
	};

	const handleCreate = (data) => {
		setIsLoading(true);
		users
			.create(data)
			.then(({ user }) => {
				// console.log(user);
				navigate(`/users/${user.id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	const handleUpdate = (id, data) => {
		setIsLoading(true);
		users
			.update(id, data)
			.then(({ user }) => {
				navigate(`/users/${user.id}`);
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
			await users.remove(formData.id);
			navigate('/users');
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
				<span>Email</span>
				<input
					required
					className="input w-full"
					type="email"
					value={formData?.email ?? ''}
					onChange={(e) => updateField('email', e.target.value)}
				/>
			</label>
			<label className="floating-label">
				<span>Username</span>
				<input
					className="input w-full"
					type="text"
					value={formData?.username ?? ''}
					onChange={(e) => updateField('username', e.target.value)}
					disabled
				/>
			</label>

			<label className="floating-label">
				<span>Nama</span>
				<input
					required
					className="input w-full"
					type="text"
					name="name"
					value={formData?.name ?? ''}
					onChange={(e) => updateField('name', e.target.value)}
				/>
			</label>
			<SelectSearch
				value={formData?.warehouse_id ?? ''}
				onChange={(value) => updateField('warehouse_id', value)}
				options={options}
				placeholder="Cari gudang (agen) …"
				isLoading={isLoadingWarehouse}
				label="Agen (Gudang)"
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

export default UserForm;
