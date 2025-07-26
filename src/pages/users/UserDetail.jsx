import { Link, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import { useEffect, useState } from 'react';
import users from '../../models/users';
import { Icon } from '@iconify/react/dist/iconify.js';
import Checkboxes from '../../components/Checkboxes';
import useAuthStore from '../../store/authStore';

export default function UserDetail() {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const { id } = useParams();
	const currentUser = useAuthStore((state) => state.user);

	useEffect(() => {
		setIsLoading(true);
		users
			.getById(id)
			.then(({ user: u }) => {
				setUser(u);
				// setBackupRoles(u.roles);
			})
			.catch((e) => console.log('error fetch customer by id', e))
			.finally(() => setIsLoading(false));
	}, [id]);

	const handleRoleChange = async (index) => {
		if (!user) return;
		const originalRoles = user.roles;

		const updatedRoles = user.roles.map((role, i) =>
			i === index ? { ...role, value: !role.value } : role,
		);

		setUser((prevUser) => ({
			...prevUser,
			roles: updatedRoles,
		}));

		try {
			const roleToUpdate = updatedRoles[index];
			await users.updateRole(user.id, roleToUpdate);
		} catch (err) {
			console.error('API update failed, rolling back:', err);
			setUser((prevUser) => ({
				...prevUser,
				roles: originalRoles, // Rollback
			}));
		}
	};

	const handleMustChange = async (e) => {
		const newValue = e.target.checked;

		setUser((prevUser) => ({
			...prevUser,
			must_change_password: newValue,
		}));

		try {
			await users.update(user.id, { must_change_password: newValue });
		} catch (error) {
			setUser((prevUser) => ({
				...prevUser,
				must_change_password: !newValue,
			}));
			console.log('🚀 ~ handleMustChange ~ error:', error);
		}
	};

	return (
		<>
			<header className="flex items-center justify-between  rounded-sm p-2 bg-base-300 mb-2">
				<h2 className="text-xl text-base-content">Detail Pengguna</h2>
				<Link
					className="btn btn-sm btn-accent rounded-sm"
					to={`/users/${id}/edit`}
					state={{ user }}
				>
					<Icon icon="material-symbols:edit-rounded" />
					Edit
				</Link>
			</header>
			{isLoading && <LoadingFixed />}
			<div className="p-4 rounded-sm border-[0.5px] border-base-300 my-2">
				<table className="table w-full">
					<tbody>
						<tr>
							<td className="pr-4 italic">Nama</td>
							<td>{user.name}</td>
						</tr>
						<tr>
							<td className="pr-4 italic">Email</td>
							<td>{user.email}</td>
						</tr>
						<tr>
							<td className="pr-4 italic">Username</td>
							<td>{user.username}</td>
						</tr>
						<tr>
							<td className="pr-4 italic">No. Telepon</td>
							<td>{user.phone ?? '-'}</td>
						</tr>
						<tr>
							<td className="pr-4 italic">Gudang</td>
							<td className="flex items-center justify-between">
								<div>
									{user?.warehouse_id
										? `${user.warehouse.name} (${user.warehouse.code})`
										: '-'}
								</div>

								<Link
									disabled
									className="btn btn-sm btn-info btn-circle text-neutral border-neutral-400 absolute right-2"
									to={`/warehouses/${user.warehouse_id}`}
								>
									<Icon
										icon="material-symbols:info"
										width="1.5em"
									/>
								</Link>
							</td>
						</tr>
						<tr>
							<td className="pr-4 italic">Ganti Password</td>
							<td className="">
								<label className="label cursor-not-allowed">
									<input
										disabled={user.id == currentUser.id}
										type="checkbox"
										className="toggle"
										checked={
											user.must_change_password || false
										}
										onChange={handleMustChange}
									/>
									<span className="label-text">
										{user.must_change_password
											? 'Ya'
											: 'Tidak'}
									</span>
								</label>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="flex justify-end my-2">
					<Link
						disabled={user.id == currentUser.id}
						to={`/users/${id}/change-password`}
						className="btn btn-secondary"
						state={{ user }}
					>
						Atur Password
						<Icon
							icon="carbon:password"
							width="1.5em"
							height="1.5em"
						/>
					</Link>
				</div>
				<div className="mt-2">
					<Checkboxes
						dataArray={user.roles}
						onDataChange={handleRoleChange}
						isLoading={isLoading}
						label="Peran Pengguna (Hak Akses)"
					/>
				</div>
			</div>

			{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
		</>
	);
}
