import { Link } from 'react-router';
import useAuthStore from '../../store/authStore';

function ProfileIndex() {
	const user = useAuthStore((state) => state.user);
	return (
		<>
			<header className="p-4 bg-base-200/50 rounded-sm border border-base-content">
				<h2 className="text-2xl">Profil Pengguna</h2>
				<p className="text-sm">Informasi akun Anda</p>
			</header>

			{user?.must_change_password ? (
				<div
					role="alert"
					className="alert alert-warning rounded-sm my-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>
						Anda harus <strong>mengganti</strong> password (kata
						sandi) sebelum memulai!
					</span>
				</div>
			) : null}

			<div className="p-4 rounded-sm border-[0.5px] border-base-300 my-2">
				<table>
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
							<td className="pr-4 italic">Akses</td>
							<td>
								{user?.warehouse_code
									? `${user.warehouse_name} (${user.warehouse_code})`
									: '-'}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="divider"></div>
				<div className="flex items-center justify-between">
					<Link className="btn btn-secondary" to={'/profile/edit'}>
						Edit Profil
					</Link>
					<Link
						className="btn btn-primary"
						to={'/profile/reset-password'}
					>
						Ganti Password
					</Link>
				</div>
			</div>

			{/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
		</>
	);
}

export default ProfileIndex;
